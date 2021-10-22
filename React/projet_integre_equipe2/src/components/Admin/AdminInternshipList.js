import React from 'react'
import AdminNavbar from '../AdminNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AdminInternshipList = () => {
    const [internships, setInternships] = useState([])
    const history = useHistory()

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

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center">Ententes de stage</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg">
                        <thead>
                            <tr>
                                <th scope="col">Nom de l'étudiant</th>
                                <th scope="col">Poste</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {internships.map((internship) => (
                                <tr key={internship.idApplication}>
                                    <th>{internship.student.firstName + " " + internship.student.lastName}</th>
                                    <td>{internship.offer.jobTitle}</td>
                                    <td>{internship.offer.companyName}</td>
                                    <td>
                                        {internship.status == "StudentSignature" ? "En attente : Signature étudiant"
                                            : internship.status == "MonitorSignature" ? "En attente : Signature moniteur"
                                            : internship.status == "AdminSignature" ? "En attente : Siganture gestionnaire" 
                                            : internship.status == "Valide" ? "Valide" : "Erreur"}
                                    </td>
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

export default AdminInternshipList
