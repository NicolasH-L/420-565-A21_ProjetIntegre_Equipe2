import React from 'react'
import MonitorNavbar from './MonitorNavbar'
import { useHistory, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Form.css'

const Monitor = () => {
    const [offers, setOffers] = useState({ offerList: [], studentNumbers: new Map() })
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor
    const location = useLocation()

    useEffect(() => {
        const getOffersByMonitor = async () => {
            const offersFromServer = await fetchOffersByMonitor()
            const tmpOffersFromServer = offersFromServer.filter((offer) => offer.session === monitor.actualSession)
            setOffers({ ...offers, offerList: tmpOffersFromServer })
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

    function goToMonitorOfferList() {
        history.push("/MonitorOfferList", { monitor })
    }

    function goToMonitorStudentList(idOffer) {
        history.push(`/MonitorStudentList/${idOffer}`, { monitor })
    }

    return (
        < div className="grad">
            <MonitorNavbar />
            <h2 className="text-center mb-3">Bonjour {monitor.firstName + " " + monitor.lastName}</h2>
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-center mb-3">Statistiques <i className="fas fa-chart-line text-success"></i></h2>
                    <div className="container-fluid">
                        <ul className="list-group">
                            {offers.offerList.map((offer) => (
                                <div key={offer.idOffer} className="list-group-item list-group-item-action">
                                    <p className="font-weight-bold text-secondary">{offer.companyName} - {offer.jobTitle}</p>
                                    <a href="#" className="text-decoration-none" onClick={(e) => { e.preventDefault(); goToMonitorStudentList(offer.idOffer) }}>Nombre d'étudiants intéressés: <span className="badge badge-secondary badge-pill">{offers.studentNumbers.get(offer.idOffer)}</span> </a>
                                </div>
                            ))}
                            <a href="#" className="list-group-item list-group-item-action text-primary" onClick={(e) => { e.preventDefault(); goToMonitorOfferList() }}>Nombre d'offres déposées: <span className="badge badge-primary badge-pill">{offers.offerList.length}</span></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Monitor
