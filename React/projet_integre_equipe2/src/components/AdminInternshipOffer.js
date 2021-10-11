import React from 'react'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import AdminNavbar from './AdminNavbar'
import { useHistory } from "react-router-dom"
import './Form.css'
import { RegexPattern } from './RegexPattern'

const AdminInternshipOffer = () => {
    const [offer, setOffer] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })
    const [error, setError] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })

    const [monitors, setMonitors] = useState([])
    const history = useHistory()
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]

    const findFutureDate = () => {
        let futureDate = new Date(timeElapsed)
        futureDate.setDate(futureDate.getDate() + 220)
        let futureDateFormat = futureDate.toISOString().split('T')[0]
        return futureDateFormat
    }

    useEffect(() => {
        const getMonitors = async () => {
            const monitorsFromServer = await fetchMonitors()
            setMonitors(monitorsFromServer)
        }
        getMonitors()
    }, [])

    const fetchMonitors = async () => {
        const res = await fetch('http://localhost:8888/monitors/get-all-monitors')
        return await res.json()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.companyName) || !_.isEmpty(error.address) || !_.isEmpty(error.salary) ||
            !_.isEmpty(error.jobTitle) || !_.isEmpty(error.description) || !_.isEmpty(error.skills) ||
            !_.isEmpty(error.jobSchedules) || !_.isEmpty(error.workingHours) || !_.isEmpty(error.monitorEmail) ||
            !_.isEmpty(error.displayDate) || !_.isEmpty(error.deadlineDate) || !_.isEmpty(error.startInternshipDate) || !_.isEmpty(error.endInternshipDate) ||
            _.isEmpty(offer.companyName) || _.isEmpty(offer.address) || _.isEmpty(offer.salary) ||
            _.isEmpty(offer.jobTitle) || _.isEmpty(offer.description) || _.isEmpty(offer.skills) ||
            _.isEmpty(offer.jobSchedules) || _.isEmpty(offer.workingHours) || _.isEmpty(offer.monitorEmail ||
                _.isEmpty(offer.displayDate) || _.isEmpty(offer.deadlineDate) || _.isEmpty(offer.startInternshipDate) || _.isEmpty(offer.endInternshipDate))) {

            alert("Veuillez remplir tous les champs correctement!")
            return
        } else {
            verifyMonitorExists(offer.monitorEmail)
                .then((data) => data ? submitOffer() : alert("Aucun compte moniteur existant avec ce email!"))
        }

        function submitOffer() {
            addOffer(offer)
                .then((data) => data.jobTitle != null ? submitOfferSuccess() : alert("Impossible de créer l'offre, veuillez réessayer!"))
        }

        function submitOfferSuccess() {
            alert("Offre déposée avec succès")
            document.getElementById("AdminInternshipOfferForm").reset()
        }
    }

    const addOffer = async (offer) => {
        const result = await fetch('http://localhost:8888/offer/saveOffer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await result.json()
    }

    const verifyMonitorExists = async (email) => {
        const res = await fetch(`http://localhost:8888/monitors/monitorEmailExists/${email}`)
        return await res.json()
    }

    const validateInput = (e) => {
        let pattern
        let inputError
        let patternGeneral = RegexPattern.getPatternGeneral()
        let patternEmail = RegexPattern.getPatternEmail()
        let patternCompany = RegexPattern.getPatternCompany()
        let patternNumber = RegexPattern.getPatternNumber()

        if (e.target.name === "address" || e.target.name === "jobTitle" || e.target.name === "description" ||
            e.target.name === "skills" || e.target.name === "jobSchedules" || e.target.name === "displayDate" || e.target.name === "deadlineDate" ||
            e.target.name === "startInternshipDate" || e.target.name === "endInternshipDate")
            pattern = new RegExp(patternGeneral)
        else if (e.target.name === "companyName")
            pattern = new RegExp(patternCompany)
        else if (e.target.name === "monitorEmail")
            pattern = new RegExp(patternEmail)
        else if (e.target.name === "salary" || e.target.name === "workingHours")
            pattern = new RegExp(patternNumber)

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
            setOffer({ ...offer, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div className="grad">
            <AdminNavbar />
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-secondary text-center">Déposer offre de stage</h2>
                    <form className="container-fluid" id="AdminInternshipOfferForm" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                            {error.companyName !== "" ? error.companyName : ""}
                            <input type="text" className="form-control text-center" id="companyName" name="companyName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Poste: </label>
                            {error.jobTitle !== "" ? error.jobTitle : ""}
                            <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" placeholder="Entrez le nom du poste" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Répresentant de l'entreprise (email): </label>
                            {error.monitorEmail !== "" ? error.monitorEmail : ""}
                            <select defaultValue="default" className="form-control text-center" id="monitorEmail" name="monitorEmail" onChange={validateInput} required>
                                <option value="default">Veuillez choisir le représentant</option>
                                {monitors.map((monitor) => (
                                    <option value={monitor.email} key={monitor.id}>{monitor.email}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                            {error.address !== "" ? error.address : ""}
                            <input type="text" className="form-control text-center" id="address" name="address" placeholder="Entrez l'adresse des bureaux" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                            {error.jobSchedules !== "" ? error.jobSchedules : ""}
                            <input type="text" className="form-control text-center" id="jobSchedules" name="jobSchedules" placeholder="Entrez l'horaire de travail. Ex: Temps plein, jour, soir" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                            {error.workingHours !== undefined ? error.workingHours : undefined}
                            <input type="text" className="form-control text-center" id="workingHours" name="workingHours" placeholder="Entrez le nombre d'heures de travail" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                            {error.salary !== undefined ? error.salary : undefined}
                            <input type="text" className="form-control text-center" id="salary" name="salary" placeholder="Entrez le salaire proposé" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            {error.skills !== "" ? error.skills : ""}
                            <textarea type="text" className="form-control" id="skills" name="skills" placeholder="Entrez les compétences" rows="3" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                            {error.description !== "" ? error.description : ""}
                            <textarea type="text" className="form-control" id="description" name="description" rows="3" placeholder="Entrez la description" onChange={validateInput} required />
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
    )
}

export default AdminInternshipOffer
