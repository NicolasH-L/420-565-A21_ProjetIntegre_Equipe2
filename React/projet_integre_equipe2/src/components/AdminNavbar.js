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
        getAdmins()
    }, [])

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

    const goTodminAssignSupervisorToStudent = () => {
        history.push("/AdminAssignSupervisorToStudent", historyState)
    }

    const changeSession = (selectedSession) => {
        admin.actualSession = selectedSession
        historyState.admin = admin
        history.push(location.pathname, historyState)
    }

    const getAdmins = async () => {
        const adminsFromServer = await fetchAdmins()
        let fetchedAdmin = adminsFromServer.find(admin1 => admin1.id === admin.id)
        setSessions(fetchedAdmin.sessions)
    }

    const fetchAdmins = async () => {
        const res = await fetch('http://localhost:8888/admin/get-all-admins')
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
                            <Link className="nav-link btn btn-light" to="/Admin"><i className="fas fa-home fa-lg"></i></Link>
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
                            <a className="nav-link btn btn-light" onClick={() => goTodminAssignSupervisorToStudent()}>Assigner un superviseur</a>
                        </li>
                    </ul>
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                            Sessions
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            {sessions.map((session, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    className={`dropdown-item ${session === admin.actualSession ? 'active' : ''}`}
                                    onClick={() => changeSession(session)}>
                                    {sessionValueToFrench(session)}
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
