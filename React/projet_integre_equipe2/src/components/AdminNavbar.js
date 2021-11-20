import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import SessionsButton from './SessionsButton'

const AdminNavbar = () => {
    const history = useHistory()
    const historyState = history.location.state
    const location = useLocation()

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

    const goToAdminContracts = () => {
        history.push("/AdminContracts", historyState)
    }

    const logout = () => {
        sessionStorage.setItem("userType", "")
        history.push("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <a className="navbar-brand text-secondary"><h3>Stage Équipe 2</h3></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-light"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
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
                            <li className="nav-item mx-2">
                                <a className="nav-link btn btn-light" onClick={() => goToAdminContracts()}>Mes contrats</a>
                            </li>
                            <SessionsButton />
                        </ul>
                    <button className="btn btn-danger my-2 mx-2" onClick={() => logout()}>Déconnexion</button>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
