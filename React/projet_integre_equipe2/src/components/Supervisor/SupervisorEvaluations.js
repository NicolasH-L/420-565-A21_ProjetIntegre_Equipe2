import React from 'react'
import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EvaluationPdfModalView from '../Evaluation/EvaluationPdfModalView'

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
    }

    return (
        <div>
            <div className="grad">
                <SupervisorNavbar />
                <h2 className="text-center">Liste de mes étudiants</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Prénom</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Nom du poste</th>
                                <th scope="col">Numéro de teléphone de l'étudiant</th>
                                <th scope="col">Evaluations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluations
                                .filter(filterEvaluations)
                                .map((evaluations) => (
                                    <tr key={evaluations.idEvaluation}>
                                        <th>{evaluations.contract.internship.student.lastName}</th>
                                        <th>{evaluations.contract.internship.student.firstName}</th>
                                        <th>{evaluations.contract.internship.offer.companyName}</th>
                                        <th>{evaluations.contract.internship.offer.jobTitle}</th>
                                        <th>{evaluations.contract.internship.student.telephoneNumber}</th>
                                        <td className="w-25">
                                            <EvaluationPdfModalView evaluation={evaluations}/>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SupervisorEvaluations
