import React, { useState, useEffect } from 'react'
import '../Form.css'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from './MonitorNavbar'
import '../ResponsiveTable.css'
import '../ResponsiveButtons.css'
import Footer from '../Footer'

const MonitorOfferList = () => {
    const [offers, setOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor

    function goToMonitorStudentList(idOffer) {
        history.push(`/MonitorStudentList/${idOffer}`, historyState)
    }

    useEffect(() => {
        const getOffersByMonitor = async () => {
            const offersFromServer = await fetchOffersByMonitor()
            setOffers(offersFromServer.filter((offer) => offer.session === monitor.actualSession))
        }
        getOffersByMonitor()
    }, [monitor.actualSession])

    const fetchOffersByMonitor = async () => {
        const res = await fetch(`http://localhost:8888/offer/get-all-valid-offers/${monitor.id}`)
        return await res.json()
    }

    const filterOffers = (offer) => {
        return offer.session === monitor.actualSession
    }

    return (
        <div>
            <div className="grad">
                <MonitorNavbar />
                <h2 className="text-center text-light">Mes Offres</h2>
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
                                            <button className="btn btn-primary mx-2" onClick={(e) => goToMonitorStudentList(offer.idOffer)}>
                                                <span className="hideButtonText">Voir étudiants</span>
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

export default MonitorOfferList
