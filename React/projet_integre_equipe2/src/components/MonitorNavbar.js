import { useHistory, Link } from "react-router-dom"
import React from 'react'
import SessionsButton from "./SessionsButton"
import MonitorNotifications from "./Monitor/MonitorNotifications"

const MonitorNavbar = () => {
    let history = useHistory()
    let historyState = history.location.state

    const goToMonitorOffer = () => {
        history.push("/MonitorOffer", historyState)
    }

    const goToMonitorOfferList = () => {
        history.push("/MonitorOfferList", historyState)
    }

    const goToMonitorDashboard = () => {
        history.push("/Monitor", historyState)
    }

    const goToMonitorContracts = () => {
        history.push("/MonitorContracts", historyState)
    }

    const goToEvaluateStudent = () => {
        history.push("/MonitorEvaluateStudent", historyState)
    }

    const logout = () => {
        sessionStorage.setItem("userType", "")
        history.push("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <a className="navbar-brand text-secondary"><h5>Stage Équipe 2</h5></a>
                <button className=" navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-light"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-sm btn-light" type="button" onClick={goToMonitorDashboard}><i className="fas fa-home fa-lg"></i></button>
                        </li>

                        <div class="btn-group">
                            <button type="button" class="btn btn-light btn-sm mx-1 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                Offres
                            </button>
                            <div class="dropdown-menu">
                                <button className="nav-link btn btn-sm" type="button" onClick={goToMonitorOfferList}>Mes offres</button>
                                <button className="nav-link btn btn-sm" type="button" onClick={goToMonitorOffer}>Déposer une offre</button>
                            </div>
                        </div>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-sm btn-light" type="button" onClick={goToMonitorContracts}>Mes contrats</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-sm btn-light" type="button" onClick={goToEvaluateStudent}>Évaluation de stagiaire</button>
                        </li>
                        <li className="mt-1">
                            <SessionsButton />
                        </li>
                        <li className="mx-3 mt-1">
                            <MonitorNotifications monitorState={historyState} />
                        </li>
                    </ul>
                    <button className="btn btn-danger btn-sm my-2 mx-2" onClick={() => logout()}>Déconnexion</button>
                </div>
            </nav>
        </div>
    )
}

export default MonitorNavbar
