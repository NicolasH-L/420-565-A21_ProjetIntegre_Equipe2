import _ from 'lodash'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RegexPattern } from './RegexPattern'
import Swal from 'sweetalert2'

const StudentRegistration = ({ onAdd }) => {
    const [student, setStudent] = useState({ lastName: "", firstName: "", password: "", matricule: "", telephoneNumber: "", actualSession: "" })
    const [error, setError] = useState({ lastName: "", firstName: "", password: "", matricule: "", telephoneNumber: "" })
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

    const fireSwalBadMaticule = () => {
        Swal.fire({
            title: 'Erreur!',
            text: 'Matricule existant',
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

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password) || !_.isEmpty(error.matricule) || !_.isEmpty(error.telephoneNumber) ||
            _.isEmpty(student.lastName) || _.isEmpty(student.firstName) || _.isEmpty(student.password) || _.isEmpty(student.matricule) || _.isEmpty(student.telephoneNumber)) {
            alert("Veuillez remplir tous les champs correctement!")
            return
        } else {
            setStudentSession()
            onAdd(student)
                .then((data) => data.matricule !== undefined ? fireSwalRegister()  : fireSwalBadMaticule())
                .catch(() => fireSwalBadMaticule())
        }

        function setStudentSession() {
            let sessionDate = new Date()
            let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
            let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
            let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
                : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
            student.actualSession = session
        }
    }

    const validateInput = (e) => {
        let pattern
        let inputError
        let patternName = RegexPattern.getPatternName()
        let patternMatricule = RegexPattern.getPatternMatricule()
        let patternPassword = RegexPattern.getPatternPassword()
        let patternTelephone = RegexPattern.getPatternTelephone()

        if (e.target.name === "lastName" || e.target.name === "firstName")
            pattern = new RegExp(patternName)
        else if (e.target.name === "password")
            pattern = new RegExp(patternPassword)
        else if (e.target.name === "telephoneNumber")
            pattern = new RegExp(patternTelephone)
        else if (e.target.name === "matricule")
            pattern = new RegExp(patternMatricule)

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
            setStudent({ ...student, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastNameStudent" className="text-secondary"><i className="fas fa-user"></i>  Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control text-center" id="lastNameStudent" name="lastName" placeholder="Entrez votre nom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstNameStudent" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="text" className="form-control text-center" id="firstNameStudent" name="firstName" placeholder="Entrez votre prénom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="matriculeStudent" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    {error.matricule !== "" ? error.matricule : ""}
                    <input type="text" className="form-control text-center" id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telephoneNumber" className="text-secondary"><i class="fas fa-phone"></i> Numéro de téléphone: </label>
                    {error.telephoneNumber !== "" ? error.telephoneNumber : ""}
                    <input type="text" className="form-control text-center" id="telephoneNumber" name="telephoneNumber" placeholder="Entrez votre numéro de téléphone (ex: 123-456-7890)" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordStudent" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                </div>
            </form>
        </div>
    )
}

export default StudentRegistration
