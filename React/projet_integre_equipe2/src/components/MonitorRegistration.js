import _ from 'lodash'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RegexPattern } from './RegexPattern'
import Swal from 'sweetalert2'

const MonitorRegistration = ({ onAdd }) => {
    const [monitor, setMonitor] = useState({ lastName: "", firstName: "", password: "", companyName: "", telephoneNumber: "", email: "", actualSession: "" })
    const [error, setError] = useState({ lastName: "", firstName: "", password: "", companyName: "", telephoneNumber: "", email: "" })
    const history = useHistory()

    const sessionPrefix = ["winter", "summer"]
    const lastMonthOfTheYear = 11
    const winterStart = 8
    const winterDeadLine = 1
    const summerStart = 2
    const summerDeadLine = 5

    const goToLogin = () => {
        history.push("/Login")
    }

    const fireSwalBadEmail = () => {
        Swal.fire({
            title: 'Erreur!',
            text: 'courriel existant',
            icon: 'error',
            position: 'top'
        })
    }

    const fireSwalRegister = () => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Inscription réussie',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            goToLogin()
        })
    }

    const fireSwalBadFields = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'warning',
            title: "Veuillez remplir tous les champs correctement",
            showConfirmButton: false,
            timer: 2000,
            width: '500px'
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password) ||
            !_.isEmpty(error.companyName) || !_.isEmpty(error.telephoneNumber) || !_.isEmpty(error.email) ||
            _.isEmpty(monitor.firstName) || _.isEmpty(monitor.lastName) || _.isEmpty(monitor.password) ||
            _.isEmpty(monitor.companyName) || _.isEmpty(monitor.telephoneNumber) || _.isEmpty(monitor.email)) {
            fireSwalBadFields()
            return
        } else {
            monitor.email = monitor.email.toLowerCase()
            setMonitorSession()
            onAdd(monitor)
                .then((data) => data.email !== undefined ? fireSwalRegister() : fireSwalBadEmail())
                .catch(() => fireSwalBadEmail())
        }

        function setMonitorSession() {
            let sessionDate = new Date()
            let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
            let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
            let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
                : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
            monitor.actualSession = session
        }
    }

    const validateInput = (e) => {
        let pattern
        let inputError
        let patternEmail = RegexPattern.getPatternEmail()
        let patternName = RegexPattern.getPatternName()
        let patternCompany = RegexPattern.getPatternCompany()
        let patternTelephone = RegexPattern.getPatternTelephone()
        let patternPassword = RegexPattern.getPatternPassword()

        if (e.target.name === "email")
            pattern = new RegExp(patternEmail)
        else if (e.target.name === "lastName" || e.target.name === "firstName")
            pattern = new RegExp(patternName)
        else if (e.target.name === "companyName")
            pattern = new RegExp(patternCompany)
        else if (e.target.name === "telephoneNumber")
            pattern = new RegExp(patternTelephone)
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
            setMonitor({ ...monitor, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastNameMonitor" className="text-secondary"><i className="fas fa-user"></i> Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control text-center" id="lastNameMonitor" name="lastName" placeholder="Entrez votre nom" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstNameMonitor" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="text" className="form-control text-center" id="firstNameMonitor" name="firstName" placeholder="Entrez votre prénom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordMonitor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordMonitor" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                    {error.companyName !== "" ? error.companyName : ""}
                    <input type="text" className="form-control text-center" id="companyName" name="companyName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telephoneNumber" className="text-secondary"><i class="fas fa-phone"></i> Numéro de téléphone: </label>
                    {error.telephoneNumber !== "" ? error.telephoneNumber : ""}
                    <input type="text" className="form-control text-center" id="telephoneNumber" name="telephoneNumber" placeholder="Entrez votre numéro de téléphone (ex: 123-456-7890)" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="emailMonitor" className="text-secondary"><i className="fas fa-at"></i> Courriel: </label>
                    {error.email !== "" ? error.email : ""}
                    <input type="email" className="form-control text-center" id="emailMonitor" name="email" placeholder="Entrez votre adresse courriel" onChange={validateInput} required />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                </div>
            </form>
        </div>
    )
}

export default MonitorRegistration
