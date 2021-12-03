import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'
import Footer from '../Footer'

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
        const res = await fetch(`http://10.10.68.10:8888/internship/get-all-internships-by-supervisor/${idSuperviseur}`)
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
                <h2 className="text-center text-light">Liste de mes étudiants</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Poste</th>
                                <th scope="col">Numéro de teléphone de l'étudiant</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {interships
                                .filter(filterInternships)
                                .map((internship) => (
                                    <tr key={internship.idInternship}>
                                        <td data-title="Nom">{internship.student.firstName + " " + internship.student.lastName}</td>
                                        <td data-title="Entreprise">{internship.offer.companyName}</td>
                                        <td data-title="Poste">{internship.offer.jobTitle}</td>
                                        <td data-title="Num. étudiant">{internship.student.telephoneNumber}</td>
                                        <td className="responsiveWidth">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(internship.offer) }}>
                                                <span className="hideButtonText">Consulter l'offre</span>
                                                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                            </button>
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

export default SupervisorAssignedStudentList
