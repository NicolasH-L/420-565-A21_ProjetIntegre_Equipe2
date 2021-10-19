import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './../AdminNavbar'

const AdminStudentAcceptedOffers = () => {
    const [acceptedOffers, setAcceptedOffers] = useState([])
    const history = useHistory()

    useEffect(() => {
        const getAcceptedOffers = async () => {
            const acceptedOffersFromServer = await fetchOffers()
            setAcceptedOffers(acceptedOffersFromServer)
        }
        getAcceptedOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offers-list/get-all-accepted-offers')
        return await res.json()
    }

    const viewOffer = async (offer) => {
        history.push("/OfferView", offer)
    }

    const acceptOffer = async (offer) => {
        const res = await fetch('http://localhost:8888/offers-list',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        const data = await res.json()
        !data.isAccepted ? alert("Une erreur est survenue, veuillez réessayer plus tard!") : alert("Processus de signature commencé")

        /*setAcceptedOffers(
            acceptedOffers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? {...offer1, valid: data.valid, state: data.state} : offer1
            )
        )*/
    }

    return (
        <div>
            <div className="grad">
            <AdminNavbar />
            <h2 className="text-center">Offres de stage acceptés</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom de l'étudiant</th>
                            <th scope="col">Matricule</th>
                            <th scope="col">Poste</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedOffers.map((acceptedOffer) => (
                            <tr key={acceptedOffer.idApplication}>
                                <th>{acceptedOffer.student.firstName + " " + acceptedOffer.student.lastName}</th>
                                <td>{acceptedOffer.student.matricule}</td>
                                <td>{acceptedOffer.offer.jobTitle}$</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(acceptedOffer) }}>Consulter</button>
                                    <button className="btn btn-success mx-2" onClick={e => { e.preventDefault(); acceptOffer(acceptedOffer.offer) }}>Débuter signatures</button>
                                    {/*<button className="btn btn-danger mx-2" onClick={e => { e.preventDefault(); declineOffer(acceptedOffer) }}>Refuser</button>*/}
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

export default AdminStudentAcceptedOffers
