import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import SessionsButton from './SessionsButton'

const AdminNavbar = () => {
    const history = useHistory()
    const historyState = history.location.state

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
                    <SessionsButton/>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
