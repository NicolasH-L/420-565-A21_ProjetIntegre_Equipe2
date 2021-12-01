import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import EvaluationPdfModalView from '../Evaluation/EvaluationPdfModalView'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'
import Footer from '../Footer'

const SupervisorEvaluations = () => {
    const [evaluations, setEvaluations] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const supervisor = historyState.supervisor

    useEffect(() => {
        const getAllEvaluations = async () => {
            const evaluationsFromServer = await fetchAllEvaluations()
            setEvaluations(evaluationsFromServer)
        }
        getAllEvaluations()
    }, [supervisor.actualSession])

    const fetchAllEvaluations = async () => {
        const res = await fetch(`http://localhost:8888/evaluation/get-all-evaluations`)
        return await res.json()
    }

    const filterEvaluations = (evaluation) => {
        return evaluation.session === supervisor.actualSession 
        && supervisor.id === evaluation.contract.internship.supervisor.id
    }

    return (
        <div>
            <div className="grad">
                <SupervisorNavbar />
                <h2 className="text-center text-light">Évaluation de mes étudiants</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Poste</th>
                                <th scope="col">Numéro de teléphone de l'étudiant</th>
                                <th scope="col">Evaluations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluations
                                .filter(filterEvaluations)
                                .map((evaluations) => (
                                    <tr key={evaluations.idEvaluation}>
                                        <td data-title="Nom">
                                            {
                                                evaluations.contract.internship.student.firstName + " " +
                                                evaluations.contract.internship.student.lastName
                                            }
                                        </td>
                                        <td data-title="Entreprise">{evaluations.contract.internship.offer.companyName}</td>
                                        <td data-title="Poste">{evaluations.contract.internship.offer.jobTitle}</td>
                                        <td data-title="Num. étudiant">{evaluations.contract.internship.student.telephoneNumber}</td>
                                        <td className="responsiveWidth">
                                            <EvaluationPdfModalView evaluation={evaluations} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SupervisorEvaluations
