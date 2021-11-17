import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from '../MonitorNavbar'
import EvaluationModalView from '../Evaluation/EvaluationModalView'

const MonitorEvaluateStudent = () => {
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor
    const status = "Completed"
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        const getAllInternships = async () => {
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer.filter(hasSupervisor))
        }
        getAllInternships()
    }, [])

    const fetchContracts = async () => {
        const res = await fetch(`http://localhost:8888/contract/get-all-by-monitor/${monitor.id}/status/${status}`)
        const data = await res.json()
        return data
    }

    // TODO update the isEvaluatedByMonitor with POST method
    

    const hasSupervisor = (contract) => {
        return contract.internship.supervisor !== null && contract.internship.supervisor !== undefined
    }

    const bySession = (contract) => {
        return monitor.actualSession === contract.session
    }

    const isDisplayEvaluations = () => {
        return (contracts !== undefined || contracts !== null) && contracts.length > 0
    }

    const displayEmptyErrorMessage = () => {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h2 className="text-dark">Vous n'avez pas de stagiaire à évaluer</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="grad">
            <MonitorNavbar />
            <h2 className="text-center">Mes Évaluations</h2>
            <div className="container-fluid">
                <div className="p-5 table-responsive">
                    {isDisplayEvaluations() ?
                        <table className="table table-hover bg-light shadow-lg">
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
                                            <td>{contract.internship.offer.jobTitle}</td>
                                            <td>{contract.internship.offer.startInternshipDate}</td>
                                            <td>{contract.internship.student.firstName + " " + contract.internship.student.lastName}</td>
                                            <td>{contract.isEvaluatedByMonitor === true ? "Evaluation complété" : "En attente d'évaluation"}</td>
                                            <td>
                                                <EvaluationModalView contractProp={contract} isModeEdit={true} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        : displayEmptyErrorMessage()}
                </div>
            </div>
        </div>
    )
}

export default MonitorEvaluateStudent
