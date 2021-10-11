import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

const StudentNavbar = () => {
    let history = useHistory()
    let historyState = history.location.state
    let studentMatricule

    useEffect(() => {
        if (historyState === undefined || historyState.matricule === undefined)
            return
        studentMatricule = historyState.matricule
    }, [])

    function goToStudentUploadCV() {
        history.push("/StudentUploadCV", historyState)
    }

    function goToStudentInternshipOffers() {
        verifyCvValidity(studentMatricule)
            .then((data) => data ? history.push("/StudentInternshipListOffers", historyState) : alert("Erreur! Votre CV n'est pas valide"))
    }

    const verifyCvValidity = async (matricule) => {
        const res = await fetch('http://localhost:8888/students/valid-cv/' + matricule)
        return await res.json()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <a className="navbar-brand text-secondary"><h3>Stage Équipe 2</h3></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-outline-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={goToStudentUploadCV}>Déposer CV</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-light" type="button" onClick={goToStudentInternshipOffers}>Offres de stages</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default StudentNavbar
