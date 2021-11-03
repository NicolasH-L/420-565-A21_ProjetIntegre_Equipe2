import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AdminNavbar = () => {
    const [sessions, setSessions] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin
    const location = useLocation()

    useEffect(() => {
        getSessions()
    }, [])

    const goToAdminDashboard = () => {
        history.push("/Admin", historyState)
    }

    const goToAdminOffer = () => {
        history.push("/AdminOffer", historyState)
    }

    const goToAdminOffersList = () => {
        history.push("/AdminOffersList", historyState)
    }

    const goToAdminStudentList = () => {
        history.push("/AdminStudentList", historyState)
    }

    const goToAdminStudentAcceptedOffers = () => {
        history.push("/AdminStudentAcceptedOffers", historyState)
    }

    const goToAdminInternshipList = () => {
        history.push("/AdminInternshipList", historyState)
    }

    const goToAdminAssignSupervisorToStudent = () => {
        history.push("/AdminAssignSupervisorToStudent", historyState)
    }

    const changeSession = (selectedSession) => {
        admin.actualSession = selectedSession
        historyState.admin = admin
        history.push(location.pathname, historyState)
    }

    const getSessions = async () => {
        const sessionsFromServer = await fetchSessions()
        setSessions(sessionsFromServer)
    }

    const fetchSessions = async () => {
        const res = await fetch('http://localhost:8888/sessions/get-all-sessions')
        return await res.json()
    }

    const sessionValueToFrench = (session) => {
        let sessionSeason = session.slice(0, -4)
        let sessionYear = session.slice(-4)
        let sessionSeasonToFrench = sessionSeason === "winter" ? "Hiver"
            : sessionSeason === "summer" ? "Été" : ""
        return sessionSeasonToFrench + " " + sessionYear
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <Link className="navbar-brand text-secondary" to="/Login"><h3>Stage Équipe 2</h3></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-outline-light"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminDashboard()}><i className="fas fa-home fa-lg"></i></a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminOffer()}>Déposer offre</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminOffersList()}>Offres</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminStudentList()}>Liste des étudiants</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminStudentAcceptedOffers()}>Offres acceptées</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminInternshipList()}>Ententes de stage</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() => goToAdminAssignSupervisorToStudent()}>Assigner un superviseur</a>
                        </li>
                    </ul>
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                            Sessions
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            {sessions.map((session) => (
                                <button
                                    type="button"
                                    key={session.idSession}
                                    className={`dropdown-item ${session.session === admin.actualSession ? 'active' : ''}`}
                                    onClick={() => changeSession(session.session)}>
                                    {sessionValueToFrench(session.session)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
