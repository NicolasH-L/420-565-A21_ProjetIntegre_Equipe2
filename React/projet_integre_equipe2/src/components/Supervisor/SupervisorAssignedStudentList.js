import React from 'react'
import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SupervisorAssignedStudentList = () => {
    const [interships, setInterships] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const supervisor = historyState.supervisor

    const buttonReport = (internshipOffer) => {
        console.log(internshipOffer)
        return <button className="btn btn-dark mx-2" onClick={e => { e.preventDefault(); console.log(internshipOffer) }}>Voir Évaluation <i className="fas fa-clipboard-list"></i></button>
    }

    useEffect(() => {

        const getInternships = async () => {
            const internshipsFromServer = await fetchInternships(supervisor.id)
            setInterships(internshipsFromServer)
        }
        getInternships()
    }, [])

    const fetchInternships = async (idSuperviseur) => {
        const res = await fetch(`http://localhost:8888/internship/get-all-internships-by-supervisor/${idSuperviseur}`)
        return await res.json()
    }

    const viewOffer = async (offer) => {
        history.push("/OfferView", offer)
    }

    const filterInternships = (internship) => {
        return internship.session === supervisor.actualSession
    }

    const viewDocumentCv = async (document) => {
        history.push("/ViewDocument", document)
    }

    const fetchEvaluation = async (idSupervisor, idStudent) => {
        const res = await fetch(`http://localhost:8888/evaluation/evaluation/get-by-supervisor-and-student/${idSupervisor}/${idStudent}`)
        return await res.json()
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
                                <th scope="col">Offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interships
                                .filter(filterInternships)
                                .map((internship) => (
                                    <tr key={internship.idInternship}>
                                        <th>{internship.student.lastName}</th>
                                        <th>{internship.student.firstName}</th>
                                        <th>{internship.offer.companyName}</th>
                                        <th>{internship.offer.jobTitle}</th>
                                        <th>{internship.student.telephoneNumber}</th>
                                        <td className="w-25">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(internship.offer) }}>Consulter</button>
                                            {internship.offer != undefined ? buttonReport(internship.offer) : ''}
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

export default SupervisorAssignedStudentList
