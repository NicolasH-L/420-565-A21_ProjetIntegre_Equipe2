import React from 'react'
import { useHistory } from "react-router-dom"
import SessionsButton from '../SessionsButton'
import logo from '../../images/logo-projet2.png'

const SupervisorNavbar = () => {
    const history = useHistory()
    const historyState = history.location.state

    const goToSupervisorAssignedStudentList = () => {
        history.push("/SupervisorAssignedStudentList", historyState)
    }

    const logout = () => {
        sessionStorage.setItem("userType", "")
        history.push("/")
    }

    const goToSupervisorEvaluations = () => {
        history.push("/SupervisorEvaluations", historyState)
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
                        <li>
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm mr-3 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    Étudiants
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item btn btn-sm btn-light" type="button" onClick={() => goToSupervisorEvaluations()}>Évaluations étudiants</button>
                                    <button className="dropdown-item btn btn-sm btn-light" type="button" onClick={() => goToSupervisorAssignedStudentList()}>Mes étudiants</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <SessionsButton />
                        </li>
                    </ul>
                    <button className="btn btn-danger btn-sm my-2 mx-2" onClick={() => logout()}>Déconnexion</button>
                </div>
            </nav>
        </div>
    )
}

export default SupervisorNavbar
