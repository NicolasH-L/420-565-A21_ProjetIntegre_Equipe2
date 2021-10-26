import React from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react'

const AdminNavbar = () => {
    const history = useHistory()
    const historyState = history.location.state

    const goToAdminOffer = () =>{
        history.push("/AdminOffer", historyState)
    }

    const goToAdminOffersList = () =>{
        history.push("/AdminOffersList", historyState)
    }

    const goToAdminStudentList = () =>{
        history.push("/AdminStudentList", historyState)
    }

    const goToAdminStudentAcceptedOffers = () =>{
        history.push("/AdminStudentAcceptedOffers", historyState)
    }

    const goToAdminInternshipList = () =>{
        history.push("/AdminInternshipList", historyState)
    }

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
                            <a className="nav-link btn btn-light" onClick={() =>goToAdminOffer()}>Déposer offre</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() =>goToAdminOffersList()}>Offres</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() =>goToAdminStudentList()}>Liste des étudiants</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() =>goToAdminStudentAcceptedOffers()}>Offres acceptées</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link btn btn-light" onClick={() =>goToAdminInternshipList()}>Ententes de stage</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
