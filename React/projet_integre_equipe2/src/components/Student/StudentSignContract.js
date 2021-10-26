import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state

    return (
        <div className="grad ">
            <StudentNavbar useStudent={historyState} />
            <div className="d-flex justify-content-center my-5 py-2">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <form className="container-fluid">
                        <h1 className="text-center">Contrat</h1>
                        <div className="form-group">
                            <label htmlFor="lastNameStudent" className="text-secondary"><i className="fas fa-user"></i>  Nom: </label>
                            <input type="text" className="form-control text-center" id="lastNameStudent" name="lastName" placeholder="Entrez votre nom" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstNameStudent" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                            <input type="text" className="form-control text-center" id="firstNameStudent" name="firstName" placeholder="Entrez votre prénom" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matriculeStudent" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                            <input type="text" className="form-control text-center" id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordStudent" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                            <input type="password" className="form-control text-center" id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" required />
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentSignContract
