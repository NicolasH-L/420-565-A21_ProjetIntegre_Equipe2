import _ from 'lodash'
import React from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { RegexPattern } from './RegexPattern'

const SupervisorRegistration = ({ onAdd }) => {
    const [supervisor, setSupervisor] = useState({ lastName: "", firstName: "", matricule: "", password: "", actualSession: "" })
    const [error, setError] = useState({ lastName: "", firstName: "", matricule: "", password: "" })
    const history = useHistory()

    const sessionPrefix = ["winter", "summer"]
    const lastMonthOfTheYear = 11
    const winterStart = 8
    const winterDeadLine = 1
    const summerStart = 2
    const summerDeadLine = 5

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password) || !_.isEmpty(error.matricule) ||
            _.isEmpty(supervisor.firstName) || _.isEmpty(supervisor.lastName) || _.isEmpty(supervisor.password) || _.isEmpty(supervisor.matricule)) {
            alert("Veuillez remplir tous les champs correctement!")
            return
        } else {
            setSupervisorSession()
            onAdd(supervisor)
                .then((data) => data.matricule !== undefined ? history.push("/Login") : alert("Erreur! matricule existant"))
                .catch(() => alert("Erreur! matricule existant"))
        }

        function setSupervisorSession() {
            let sessionDate = new Date()
            let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
            let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
            let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
                : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
            supervisor.actualSession = session
        }
    }

    const validateInput = (e) => {
        let pattern
        let inputError
        let patternName = RegexPattern.getPatternName()
        let patternMatricule = RegexPattern.getPatternMatricule()
        let patternPassword = RegexPattern.getPatternPassword()

        if (e.target.name === "lastName" || e.target.name === "firstName")
            pattern = new RegExp(patternName)
        else if (e.target.name === "matricule")
            pattern = new RegExp(patternMatricule)
        else if (e.target.name === "password")
            pattern = new RegExp(patternPassword)

        if (pattern === undefined)
            return

        if (!pattern.test(e.target.value) || e.target.value === "") {
            e.target.style.borderColor = "red"
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red"
            inputError = <strong className="text-danger"> Erreur <i className="fas fa-exclamation-circle text-danger fa-sm" ></i></strong>
        } else {
            e.target.style.borderColor = "#ced4da"
            e.target.style.boxShadow = "none"
            inputError = ""
            setSupervisor({ ...supervisor, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastNameSupervisor" className="text-secondary"><i className="fas fa-user"></i> Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control text-center" id="lastNameSupervisor" name="lastName" placeholder="Entrez votre nom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstNameSupervisor" className="text-secondary"><i className="fas fa-user"></i> Prénom:</label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="text" className="form-control text-center" id="firstNameSupervisor" name="firstName" placeholder="Entrez votre prénom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="matriculeSupervisor" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    {error.matricule !== "" ? error.matricule : ""}
                    <input type="text" className="form-control text-center" id="matriculeSupervisor" name="matricule" placeholder="Entrez votre matricule" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSupervisor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordSupervisor" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block grad text-white ">Soumettre</button>
                </div>
            </form>
        </div>
    )
}

export default SupervisorRegistration
