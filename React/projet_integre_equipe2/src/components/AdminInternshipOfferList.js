import React from 'react'
import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { useHistory } from 'react-router-dom'
import './ResponsiveTable.css'
import './ResponsiveButtons.css'
import Footer from './Footer'

const AdminInternshipOfferList = () => {
    const typeNotification = "Offre"
    const history = useHistory()
    const admin = history.location.state.admin

    const [offers, setOffers] = useState([])
    const [notification, setNotification] = useState({
        typeNotification: typeNotification, message: "", session: admin.actualSession
    })
    let message = ""

    useEffect(() => {
        const getOffers = async () => {
            const offersFromServer = await fetchOffers()
            setOffers(offersFromServer)
        }
        getOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offer/get-all-offers')
        return await res.json()
    }

    const acceptOffer = async (offer) => {
        const res = await fetch(`http://localhost:8888/offer/accept-offer/${offer.idOffer}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        const data = await res.json()

        setOffers(
            offers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? { ...offer1, valid: data.valid, state: data.state } : offer1
            )
        )
        message = "Nouvelle offre de stage disponible"
        notification.message = message
        createNotificationStudent(notification)
        message = "Une offre deposée est acceptée"
        notification.message = message
        createNotificationForMoniteur(notification, offer)
    }

    const createNotificationStudent = async (notification) => {
        const result = await fetch(`http://localhost:8888/notification/save-notification/`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(notification)
            })
        return await result.json()
    }

    const createNotificationForMoniteur = async (notification, offer) => {
        const result = await fetch(`http://localhost:8888/notification/save-notification-for-monitor/${offer.monitor.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(notification)
            })
        return await result.json()
    }

    const declineOffer = async (offer) => {
        const res = await fetch(`http://localhost:8888/offer/decline-offer/${offer.idOffer}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        const data = await res.json()

        setOffers(
            offers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? { ...offer1, valid: data.valid, state: data.state } : offer1
            )
        )
        message = "Une offre de stage a été refusé"
        notification.message = message
        createNotificationForMoniteur(notification, offer)
    }

    const viewOffer = async (offer) => {
        history.push("/OfferView", offer)
    }

    const filterOffers = (offer) => {
        return offer.session === admin.actualSession
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center">Offres de stage</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Entreprise</th>
                                <th scope="col">Poste</th>
                                <th scope="col">Salaire</th>
                                <th scope="col">Date d'affichage</th>
                                <th scope="col">Validité</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers
                                .filter(filterOffers)
                                .map((offer) => (
                                    <tr key={offer.idOffer}>
                                        <td data-title="Entreprise">{offer.companyName}</td>
                                        <td data-title="Poste">{offer.jobTitle}</td>
                                        <td data-title="Salaire">{offer.salary}$</td>
                                        <td data-title="Date d'affichage">{offer.displayDate}</td>
                                        <td data-title="Validité">
                                            <h5>
                                                <span className={`badge ${offer.valid ? 'badge-success' : offer.state === null ? 'badge-warning' : 'badge-danger'}`}>
                                                    {offer.state === null ? "En attente" : offer.state}
                                                </span>
                                            </h5>
                                        </td>
                                        <td className="responsiveWidth">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(offer) }}>
                                                <span className="hideButtonText">Consulter</span>
                                                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                            </button>
                                            <button className="btn btn-success mx-2" onClick={e => { e.preventDefault(); acceptOffer(offer) }}>
                                                <span className="hideButtonText">Publier</span>
                                                <span className="hideButtonIcon"><i className="fas fa-check"></i></span>
                                            </button>
                                            <button className="btn btn-danger mx-2" onClick={e => { e.preventDefault(); declineOffer(offer) }}>
                                                <span className="hideButtonText">Retirer</span>
                                                <span className="hideButtonIcon"><i className="fas fa-times"></i></span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}

export default AdminInternshipOfferList
