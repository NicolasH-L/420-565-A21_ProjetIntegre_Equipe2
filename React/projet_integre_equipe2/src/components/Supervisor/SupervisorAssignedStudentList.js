import React from 'react'
import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OfferModalView from '../OfferModalView'

const SupervisorAssignedStudentList = () => {
    const [interships, setInterships] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const supervisor = historyState.supervisor

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
                                    <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(internship.offer) }}>Consulter</button>
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
