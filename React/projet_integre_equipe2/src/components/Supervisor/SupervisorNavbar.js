import React from 'react'
import { useHistory, Link } from "react-router-dom"
import SessionsButton from '../SessionsButton'

const SupervisorNavbar = () => {
    const history = useHistory()
    const historyState = history.location.state

    const goToSupervisorAssignedStudentList = () => {
        history.push("/SupervisorAssignedStudentList", historyState)
    }

    const goToSupervisorEvaluations = () => {
        history.push("/SupervisorEvaluations", historyState)
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
                            <button className="nav-link btn btn-light" type="button" onClick={() => goToSupervisorAssignedStudentList()}>Mes étudiants</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={() => goToSupervisorEvaluations()}>Évaluations étudiants</button>
                        </li>
                        <SessionsButton/>
                    </ul>
                    <button className="btn btn-danger my-2 mx-2" onClick={() => logout()}>Déconnexion</button>
                </div>
            </nav>
        </div>
    )
}

export default SupervisorNavbar
