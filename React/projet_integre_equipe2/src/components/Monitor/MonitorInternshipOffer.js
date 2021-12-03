import _ from 'lodash'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { RegexPattern } from '../RegexPattern'
import MonitorNavbar from './MonitorNavbar'
import '../Form.css'
import Swal from 'sweetalert2'
import Footer from '../Footer'
import Error from '../Constants/Error'
import {SessionPattern} from '../SessionPattern'

const MonitorInternshipOffer = () => {
    const typeNotification = "Offre"
    const message = "Une offre vient d'être déposée par un moniteur"
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]

    const fireSwalOfferSuccess = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: 'Offre de stage ajoutée avec succès',
            showConfirmButton: false,
            timer: 2000,
            width: '400px'
        })
    }

    const fireSwalError = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'error',
            title: "Impossible de créer l'offre, veuillez réessayer!",
            showConfirmButton: false,
            timer: 2000,
            width: '500px'
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

    let emailMonitor
    let company
    let telephoneNumberMonitor

    if (historyState !== undefined) {
        emailMonitor = monitor.email
        company = monitor.companyName
        telephoneNumberMonitor = monitor.telephoneNumber
    }

    const [offer, setOffer] = useState({
        companyName: company, address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: emailMonitor, telephoneNumber: telephoneNumberMonitor,
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: "", session: ""
    })

    const [error, setError] = useState({
        address: "", salary: "", jobTitle: "", description: "",
        skills: "", jobSchedules: "", workingHours: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })

    const [notification, setNotification] = useState({
        typeNotification: typeNotification, message: message, session: ""
    })

    const findFutureDate = () => {
        let futureDate = new Date(timeElapsed)
        futureDate.setDate(futureDate.getDate() + 220)
        let futureDateFormat = futureDate.toISOString().split('T')[0]
        return futureDateFormat
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.address) || !_.isEmpty(error.salary) || !_.isEmpty(error.jobTitle) ||
            !_.isEmpty(error.description) || !_.isEmpty(error.skills) || !_.isEmpty(error.jobSchedules) ||
            !_.isEmpty(error.workingHours) || !_.isEmpty(error.displayDate) || !_.isEmpty(error.deadlineDate) ||
            !_.isEmpty(error.startInternshipDate) || !_.isEmpty(error.endInternshipDate) ||
            _.isEmpty(offer.companyName) || _.isEmpty(offer.address) || _.isEmpty(offer.salary) ||
            _.isEmpty(offer.jobTitle) || _.isEmpty(offer.description) || _.isEmpty(offer.skills) ||
            _.isEmpty(offer.jobSchedules) || _.isEmpty(offer.workingHours) || _.isEmpty(offer.monitorEmail) ||
            _.isEmpty(offer.displayDate) || _.isEmpty(offer.deadlineDate) || _.isEmpty(offer.startInternshipDate) ||
            _.isEmpty(offer.endInternshipDate)
        ) {
            fireSwalBadFields()
            return
        } else {
            offer.session = SessionPattern.getSession()
            verifyMonitorExists(offer.monitorEmail)
                .then((data) => data ? submitOffer() : alert("Aucun moniteur existant avec cet email!"))
        }

        function submitOffer() {
            addOffer(offer)
                .then((data) => data.jobTitle !== null ? submitOfferSuccess() : fireSwalError())
        }
    }

    function submitOfferSuccess() {
        fireSwalOfferSuccess()
        document.getElementById("monitorInternshipForm").reset()
        notification.session = monitor.actualSession
        createNotificationAdmin(notification)
        history.push("/MonitorOfferList", { monitor })
    }

    const verifyMonitorExists = async (email) => {
        const res = await fetch(`http://10.10.68.10:8888/monitors/monitorEmailExists/${email}`)
        return await res.json()
    }

    const addOffer = async (offer) => {
        const result = await fetch('http://10.10.68.10:8888/offer/saveOffer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await result.json()
    }

    const createNotificationAdmin = async (notification) => {
        const result = await fetch('http://10.10.68.10:8888/notification/save-notification-for-admin',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(notification)
            })
        return await result.json()
    }

    const validateInput = (e) => {
        let pattern
        let inputError
        let patternGeneral = RegexPattern.getPatternGeneral()
        let patternNumber = RegexPattern.getPatternNumber()

        if (e.target.name === "address" || e.target.name === "jobTitle")
            pattern = new RegExp(patternGeneral)
        else if (e.target.name === "salary" || e.target.name === "workingHours")
            pattern = new RegExp(patternNumber)

        if (pattern === undefined && e.target.name === "jobSchedules" && e.target.value === "DEFAULT" ||
            pattern !== undefined && !pattern.test(e.target.value) || e.target.value === "") {
            Error.setErrorInputStyles(e, true)
            inputError = <strong className="text-danger"> Erreur <i className="fas fa-exclamation-circle text-danger fa-sm" ></i></strong>
        } else {
            Error.setErrorInputStyles(e, false)
            inputError = ""
            setOffer({ ...offer, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div>
            <div className="grad">
                <MonitorNavbar />
                <div className="d-flex justify-content-center">
                    <div className="jumbotron jumbotron-fluid bg-light rounded shadow reactivescreen">
                        <h2 className="text-secondary text-center mb-3">Déposer offre de stage</h2>
                        <form className="container-fluid" id="monitorInternshipForm" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                                <input type="text" className="form-control text-center" id="companyName" name="companyName" value={company} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                                {error.address !== "" ? error.address : ""}
                                <input type="text" className="form-control text-center" id="address" name="address" placeholder="Entrez l'adresse des bureaux" onChange={validateInput} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                                {error.salary !== undefined ? error.salary : undefined}
                                <input type="text" className="form-control text-center" id="salary" name="salary" placeholder="Entrez le salaire proposé" onChange={validateInput} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Position: </label>
                                {error.jobTitle !== "" ? error.jobTitle : ""}
                                <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" placeholder="Entrez le nom de la position" onChange={validateInput} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                                {error.description !== "" ? error.description : ""}
                                <textarea type="text" className="form-control" id="description" name="description" rows="3" placeholder="Entrez la description" onChange={validateInput} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                                {error.skills !== "" ? error.skills : ""}
                                <textarea type="text" className="form-control" id="skills" name="skills" rows="3" placeholder="Entrez les compétences" onChange={validateInput} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Représentant de l'entreprise (email): </label>
                                <input type="email" className="form-control text-center" id="monitorEmail" name="monitorEmail" value={emailMonitor} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                                {error.workingHours !== undefined ? error.workingHours : undefined}
                                <input type="text" className="form-control text-center" id="workingHours" name="workingHours" placeholder="Entrez le nombre d'heures de travail" onChange={validateInput} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                                {error.jobSchedules !== "" ? error.jobSchedules : ""}
                                <select defaultValue={'DEFAULT'} className="form-control text-center" id="jobSchedules" name="jobSchedules" onChange={validateInput} required>
                                    <option value="DEFAULT">Veuillez choisir le type d'horaire</option>
                                    <option value="Temps plein">Temps plein</option>
                                    <option value="Temps partiel">Temps partiel</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="displayDate" className="text-secondary"><i className="fas fa-calendar"></i> Date d'affichage:</label>
                                {error.displayDate !== "" ? error.displayDate : ""}
                                <input type="date" min={today} max={findFutureDate()} id="displayDate" name="displayDate" className="form-control text-center" onChange={validateInput} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deadlineDate" className="text-secondary"><i className="fas fa-calendar"></i> Date limite:</label>
                                {error.deadlineDate !== "" ? error.deadlineDate : ""}
                                <input type="date" min={today} max={findFutureDate()} id="deadlineDate" name="deadlineDate" className="form-control text-center" onChange={validateInput} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="startInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Début stage</label>
                                {error.startInternshipDate !== "" ? error.startInternshipDate : ""}
                                <input type="date" min={today} max={findFutureDate()} id="startInternshipDate" name="startInternshipDate" className="form-control text-center" onChange={validateInput} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="endInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Fin stage</label>
                                {error.endInternshipDate !== "" ? error.endInternshipDate : ""}
                                <input type="date" min={today} max={findFutureDate()} id="endInternshipDate" name="endInternshipDate" className="form-control text-center" onChange={validateInput} required></input>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default MonitorInternshipOffer
