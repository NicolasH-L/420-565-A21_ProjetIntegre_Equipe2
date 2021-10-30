import React from 'react'
import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OfferModalView from '../OfferModalView'

const SupervisorAssignedStudentList = () => {
    const [interships, setInterships] = useState([])
    const history = useHistory()
    const historyState = history.location.state

    useEffect(() => {
        if (historyState === undefined)
            return
        const idSuperviseur = historyState.id
        const getInternships = async () => {
            const internshipsFromServer = await fetchInternships(idSuperviseur)
            setInterships(internshipsFromServer)
        }
        getInternships()
    }, [])

    const fetchInternships = async (idSuperviseur) => {
        const res = await fetch(`http://localhost:8888/internship/get-all-internships-by-supervisor/${idSuperviseur}`)
        return await res.json()
    }

    return (
        <div>
            <div className="grad">
            <SupervisorNavbar/>
            <h2 className="text-center">Liste mes étudiants</h2>
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
                        {interships.map((intership) => (
                            <tr key={intership.idInternship}>
                                <th>{intership.student.lastName}</th>
                                <th>{intership.student.firstName}</th>
                                <th>{intership.offer.companyName}</th>
                                <th>{intership.offer.jobTitle}</th>
                                <td className="w-25">
                                <OfferModalView newOffer={intership.offer} displayMessageBoolean={null} />
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
