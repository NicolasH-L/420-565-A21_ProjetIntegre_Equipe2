import React, { useEffect } from 'react'
import { useHistory, Link } from "react-router-dom"
import { useState } from 'react'
import SessionsButton from "./SessionsButton"
import StudentNotifications from './Student/StudentNotifications'

const StudentNavbar = ({ useStudent }) => {
    const [student, setStudent] = useState({
        matricule: ""
    })
    const history = useHistory()
    const historyState = history.location.state

    useEffect(() => {
        if (historyState === undefined)
            return
        setStudent(useStudent)
    }, [])

    const goToStudentUploadCV = () => {
        history.push("/StudentUploadCV", historyState)
    }

    const goToStudentInternshipOffers = () => {
        if (historyState === undefined)
            return
        verifyCvValidity(student.matricule)
            .then((data) => data ? history.push("/StudentInternshipListOffers", historyState) : alert("Erreur! Votre CV n'est pas valide"))
    }

    const goToMyDocuments = () => {
        history.push("/StudentDocuments", historyState)
    }

    const goToMyProfile = () => {
        history.push("/Student", historyState)
    }

    const goToContract = () => {
        history.push("/StudentSignContract", historyState)
    }

    const verifyCvValidity = async (matricule) => {
        const res = await fetch('http://localhost:8888/students/valid-cv/' + matricule)
        return await res.json()
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
                            <button className="nav-link btn btn-light" type="button" onClick={() =>goToMyProfile()}>Mon profil</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={() => goToStudentUploadCV()}>Déposer CV</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={() => goToStudentInternshipOffers()}>Offres de stages</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={() => goToMyDocuments()}>Mes Documents</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={() => goToContract()}>Signer mon contrat</button>
                        </li>
                        <SessionsButton />
                        <div className="mx-3 mt-1"> 
                            <StudentNotifications studentState={historyState} />
                        </div>
                    </ul>
                    <button className="btn btn-danger my-2 mx-2" onClick={() => logout()}>Déconnexion</button>
                </div>
            </nav>
        </div>
    )
}

export default StudentNavbar
