import { useHistory } from "react-router-dom"
import React from 'react'
import SessionsButton from "./Monitor/SessionsButton"

const MonitorNavbar = () => {
    let history = useHistory()
    let historyState = history.location.state
    function goToMonitorOffer() {
        history.push("/MonitorOffer", historyState)
    }
    function goToMonitorOfferList() {
        history.push("/MonitorOfferList", historyState)
    }
    function goToMonitorDashboard() {
        history.push("/Monitor", historyState)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <a className="navbar-brand text-secondary"><h3>Stage Équipe 2</h3></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-outline-light"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={goToMonitorDashboard}><i className="fas fa-home fa-lg"></i></button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={goToMonitorOffer}>Déposer offre</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={goToMonitorOfferList}>Mes offres</button>
                        </li>
                    </ul>
                    <SessionsButton/>
                </div>
            </nav>
        </div>
    )
}

export default MonitorNavbar
