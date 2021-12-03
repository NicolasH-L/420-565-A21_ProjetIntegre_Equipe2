import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from './MonitorNavbar'
import EvaluationModalView from '../Evaluation/EvaluationModalView'
import EvaluationPdfModalView from '../Evaluation/EvaluationPdfModalView'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'
import Footer from '../Footer'
import Error from '../Constants/Error'

const MonitorEvaluateStudent = () => {
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor
    const status = "Completed"
    const [contracts, setContracts] = useState([])
    const [evaluations, setEvaluations] = useState([])
    const emptyMessage = "Vous n'avez pas de stagiaire à évaluer"

    useEffect(() => {
        const getAllInternships = async () => {
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer.filter(hasSupervisor).filter(bySession))
        }
        const getAllEvaluations = async () => {
            const evaluationsFromServer = await fetchEvaluations()
            setEvaluations(evaluationsFromServer.filter(bySession))
        }
        getAllInternships()
        getAllEvaluations()
    }, [monitor.actualSession])

    const fetchContracts = async () => {
        const res = await fetch(`http://localhost:8888/contract/get-all-by-monitor/${monitor.id}/status/${status}`)
        return await res.json()
    }

    const fetchEvaluations = async () => {
        const res = await fetch(`http://localhost:8888/evaluation/get-all-by-monitor/${monitor.id}`)
        return await res.json()
    }

    const hasSupervisor = (contract) => {
        return contract.internship.supervisor !== null && contract.internship.supervisor !== undefined
    }

    const bySession = (contract) => {
        return monitor.actualSession === contract.session
    }

    const isDisplayEvaluations = () => {
        return (contracts !== undefined || contracts !== null) && contracts.length > 0
    }

    const isInternAlreadyEvaluated = (contract) => {
        let evaluationIndex = undefined
        if (evaluations.length > 0)
            for (let i = 0; i < evaluations.length; i++) {
                if (evaluations[i].contract.idContract === contract.idContract) {
                    evaluationIndex = i
                    break
                }
            }
        return evaluationIndex
    }

    const displayEvaluationButtons = (contract) => {
        let index = isInternAlreadyEvaluated(contract)
        return (index !== undefined ?
            <EvaluationPdfModalView evaluation={evaluations[index]} />
            : <EvaluationModalView contractProp={contract} />)
    }

    return (
        <div>
            <div className="grad">
                <MonitorNavbar />
                <h2 className="text-center text-light">Mes Évaluations</h2>
                <div className="container-fluid">
                    <div className="p-5 table-responsive">
                        {isDisplayEvaluations() ?
                            <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">Position</th>
                                        <th scope="col">Début du stage</th>
                                        <th scope="col">Nom de l'étudiant</th>
                                        <th scope="col">Statut</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts
                                        .filter(bySession)
                                        .map((contract) => (
                                            <tr key={contract.idContract} className="text-center">
                                                <td data-title="Position">{contract.internship.offer.jobTitle}</td>
                                                <td data-title="Début stage">{contract.internship.offer.startInternshipDate}</td>
                                                <td data-title="Nom étudiant">{contract.internship.student.firstName + " " + contract.internship.student.lastName}</td>
                                                <td data-title="Statut">
                                                    <h5>
                                                        <span className={`badge ${isInternAlreadyEvaluated(contract) !== undefined ? "badge-success" : "badge-warning"}`}>
                                                            {isInternAlreadyEvaluated(contract) !== undefined ? "Complétée" : "En attente"}
                                                        </span>
                                                    </h5>
                                                </td>
                                                <td className="responsiveWidth">
                                                    {displayEvaluationButtons(contract)}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            : Error.displayEmptyErrorMessage(emptyMessage)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MonitorEvaluateStudent
