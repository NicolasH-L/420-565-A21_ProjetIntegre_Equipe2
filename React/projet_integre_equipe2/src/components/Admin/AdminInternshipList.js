import React from 'react'
import AdminNavbar from '../AdminNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'

const AdminInternshipList = () => {
    const [internships, setInternships] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin

    useEffect(() => {
        const getInternships = async () => {
            const internshipsFromServer = await fetchInternships()
            setInternships(internshipsFromServer)
        }
        getInternships()
    }, [])

    const fetchInternships = async () => {
        const res = await fetch('http://localhost:8888/internship/get-all-internships')
        return await res.json()
    }

    const viewOffer = async (offer) => {
        history.push("/OfferView", offer)
    }

    const filterInterships = (internship) => {
        return admin.actualSession === internship.session
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center">Ententes de stage</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Nom de l'étudiant</th>
                                <th scope="col">Poste</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Statut</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {internships
                                .filter(filterInterships)
                                .map((internship) => (
                                    <tr key={internship.idInternship} >
                                        <td data-title="Nom étudiant">{internship.student.firstName + " " + internship.student.lastName}</td>
                                        <td data-title="Poste">{internship.offer.jobTitle}</td>
                                        <td data-title="Entreprise">{internship.offer.companyName}</td>
                                        <td data-title="Statut">
                                            <h5>
                                                <span className={`badge ${internship.status == "Valide" ? 'badge-success' : 'badge-warning'}`}>
                                                    {internship.status === "StudentSignature" ? "En attente : Signature étudiant"
                                                        : internship.status === "MonitorSignature" ? "En attente : Signature moniteur"
                                                            : internship.status === "AdminSignature" ? "En attente : Siganture gestionnaire"
                                                                : internship.status === "Completed" ? "Valide" : "Erreur"
                                                    }
                                                </span>
                                            </h5>

                                        </td>
                                        <td className="responsiveWidth">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(internship.offer) }}>
                                                <span className="hideButtonText">Consulter</span>
                                                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                            </button>
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

export default AdminInternshipList
