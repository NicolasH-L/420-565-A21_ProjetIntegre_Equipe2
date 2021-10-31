import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <Link className="navbar-brand text-secondary" to="/Login"><h3>Stage Équipe 2</h3></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-outline-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/Admin"><i className="fas fa-home fa-lg"></i></Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/AdminOffer">Déposer offre</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/AdminOffersList">Offres</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/AdminStudentList">Liste des étudiants</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/AdminStudentAcceptedOffers">Offres acceptées</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/AdminInternshipList">Ententes de stage</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/AdminAssignSupervisorToStudent">Assigner un superviseur</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
