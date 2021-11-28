import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import SessionsButton from '../SessionsButton'
import AdminNotifications from './AdminNotifications'
import logo from '../../images/logo-projet2.png'

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
                <a className="navbar-brand text-secondary"><img className="" width="30" src={logo} /> </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-light"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-1">
                            <button className="nav-link btn btn-sm btn-light mx-1" onClick={() => goToAdminDashboard()}><i className="fas fa-home fa-lg"></i></button>
                        </li>
                        <li>
                            <div class="btn-group">
                                <button type="button" class="btn btn-light mt-1 btn-sm mx-1 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    Offres
                                </button>
                                <div class="dropdown-menu">
                                    <button className="dropdown-item btn btn-sm btn-light" onClick={() => goToAdminOffersList()}>Offres</button>
                                    <button className="dropdown-item btn btn-sm btn-light" onClick={() => goToAdminOffer()}>Déposer offre</button>
                                    <button className="dropdown-item btn btn-sm btn-light" onClick={() => goToAdminStudentAcceptedOffers()}>Offres acceptées</button>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item mx-1">
                            <button className="nav-link btn btn-sm btn-light" onClick={() => goToAdminStudentList()}>Liste des étudiants</button>
                        </li>
                        <li className="nav-item mx-1">
                            <button className="nav-link btn btn-sm btn-light" onClick={() => goToAdminAssignSupervisorToStudent()}>Assigner un superviseur</button>
                        </li>
                        <li className="nav-item mx-1">
                            <button className="nav-link btn btn-sm btn-light" onClick={() => goToAdminContracts()}>Contrats</button>
                        </li>
                        <li className="mt-1 mx-1">
                            <SessionsButton />
                        </li>
                        <li className="mt-1 mx-1">
                            <AdminNotifications adminState={historyState} />
                        </li>
                    </ul>
                    <button className="btn btn-danger btn-sm my-2 mx-2" onClick={() => logout()}>Déconnexion</button>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
