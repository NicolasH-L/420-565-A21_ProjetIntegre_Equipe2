import React from 'react'
import MonitorNavbar from './MonitorNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Form.css'

const Monitor = () => {
    const [offers, setOffers] = useState({ offerList: [], studentNumbers: new Map() })
    const history = useHistory()
    const monitor = history.location.state

    useEffect(() => {
        const getOffersByMonitor = async () => {
            const offersFromServer = await fetchOffersByMonitor()
            setOffers({ ...offers, offerList: offersFromServer })
        }
        const getStudentNumbersForAllOffers = async () => {
            for (const offer of offers.offerList) {
                fetchStudentOffersByIdOffer(offer.idOffer).
                    then((data) => setOffers({ ...offers, studentNumbers: offers.studentNumbers.set(offer.idOffer, data.length) }))
            }
        }
        getOffersByMonitor()
        getStudentNumbersForAllOffers()
    }, [offers.offerList.length])

    const fetchOffersByMonitor = async () => {
        const res = await fetch(`http://localhost:8888/offer/get-all-valid-offers/${monitor.id}`)
        return await res.json()
    }

    const fetchStudentOffersByIdOffer = async (idOffer) => {
        const res = await fetch(`http://localhost:8888/offers-list/get-all-studentOffersByIdOffer/${idOffer}`)
        return await res.json()
    }

    return (
        < div className="grad">
            <MonitorNavbar />
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-center mb-3">Statistiques</h2>
                    <div className="container-fluid">
                        {offers.offerList.map((offer) => (
                            <div key={offer.idOffer}>
                                <p>{offer.companyName} - {offer.jobTitle}: Candidatures: {offers.studentNumbers.get(offer.idOffer)} </p>
                            </div>
                        ))}
                        <p>Nombre d'offres déposées: {offers.offerList.length}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Monitor
