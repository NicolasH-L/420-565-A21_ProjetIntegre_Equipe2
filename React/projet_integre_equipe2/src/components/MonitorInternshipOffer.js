import React from 'react'
import { useState } from 'react'
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import './Form.css'
import { RegexPattern } from './RegexPattern';
import MonitorNavbar from './MonitorNavbar';

const MonitorInternshipOffer = ({ onAdd }) => {
    const history = useHistory()
    const historyState = useHistory().location.state;
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]
    let futureDate = new Date(timeElapsed)
    futureDate.setDate(futureDate.getDate() + 220)
    let futureDateFormat = futureDate.toISOString().split('T')[0]

    let emailMonitor
    let company
    if (historyState != undefined) {
        emailMonitor = historyState.email
        company = historyState.companyName
    }

    const [offer, setOffer] = useState({
        companyName: company, address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: emailMonitor,
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })
    const [error, setError] = useState({
        address: "", salary: "", jobTitle: "", description: "",
        skills: "", jobSchedules: "", workingHours: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!_.isEmpty(error.address) || !_.isEmpty(error.salary) || !_.isEmpty(error.jobTitle) ||
            !_.isEmpty(error.description) || !_.isEmpty(error.skills) || !_.isEmpty(error.jobSchedules) ||
            !_.isEmpty(error.workingHours) || !_.isEmpty(error.displayDate) || !_.isEmpty(error.deadlineDate) ||
            !_.isEmpty(error.startInternshipDate) || !_.isEmpty(error.endInternshipDate) ||
            _.isEmpty(offer.companyName) || _.isEmpty(offer.address) || _.isEmpty(offer.salary) ||
            _.isEmpty(offer.jobTitle) || _.isEmpty(offer.description) || _.isEmpty(offer.skills) ||
            _.isEmpty(offer.jobSchedules) || _.isEmpty(offer.workingHours) || _.isEmpty(offer.monitorEmail) 
            ||
            _.isEmpty(offer.displayDate) || _.isEmpty(offer.deadlineDate) || _.isEmpty(offer.startInternshipDate) ||
            _.isEmpty(offer.endInternshipDate)
            ) {
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            verifyMonitorExists(offer.monitorEmail)
                .then((data) => data ? submitOffer() : alert("Aucun moniteur existant avec cet email!"))
        }

        function submitOffer() {
            addOffer(offer)
                .then((data) => data.jobTitle != null ? submitOfferSuccess() : alert("Impossible de créer l'offre, veuillez réessayer!"))
                .catch((err) => console.log(err))
        }
    }

    function submitOfferSuccess() {
        alert("Ajout de l'offre de stage avec succès")
        document.getElementById("monitorInternshipForm").reset()
        history.push("/Monitor", historyState)
    }

    const verifyMonitorExists = async (email) => {
        const res = await fetch(`http://localhost:8888/monitors/monitorEmailExists/${email}`)
        return await res.json()
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

    const validateInput = (e) => {
        let pattern
        let inputError
        let patternGeneral = RegexPattern.getPatternGeneral()
        let patternNumber = RegexPattern.getPatternNumber()

        if (e.target.name === "address" || e.target.name === "jobTitle" || e.target.name === "description" ||
            e.target.name === "skills")
            pattern = new RegExp(patternGeneral)
        else if (e.target.name === "salary" || e.target.name === "workingHours")
            pattern = new RegExp(patternNumber)
        else if (e.target.name === "jobSchedules")
            console.log("pattern : " + pattern)

        if (pattern === undefined && e.target.name === "jobSchedules" && e.target.value === "DEFAULT" ||  pattern !== undefined && !pattern.test(e.target.value) || e.target.value === "") {
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
            <MonitorNavbar />
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-secondary text-center">Déposer offre de stage</h2>
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
                            <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" placeholder="Entrez le nom du position" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                            {error.description !== "" ? error.description : ""}
                            <textarea type="text" className="form-control text-center" id="description" name="description" rows="3" placeholder="Entrez la description"  onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            {error.skills !== "" ? error.skills : ""}
                            <textarea type="text" className="form-control text-center" id="skills" name="skills" rows="3" placeholder="Entrez les compétences" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Répresentant de l'entreprise (email): </label>
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
                                <option value="Jour">Jour</option>
                                <option value="Soir">Soir</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="displayDate" className="text-secondary"><i className="fas fa-calendar"></i> Date d'affichage:</label>
                            {error.displayDate !== "" ? error.displayDate : ""}
                            <input type="date" min={today} max={futureDateFormat} id="displayDate" name="displayDate" className="form-control text-center" onChange={validateInput} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadlineDate" className="text-secondary"><i className="fas fa-calendar"></i> Date limite:</label>
                            {error.deadlineDate !== "" ? error.deadlineDate : ""}
                            <input type="date" min={today} max={futureDateFormat} id="deadlineDate" name="deadlineDate" className="form-control text-center" onChange={validateInput} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Début stage</label>
                            {error.startInternshipDate !== "" ? error.startInternshipDate : ""}
                            <input type="date" min={today} max={futureDateFormat} id="startInternshipDate" name="startInternshipDate" className="form-control text-center" onChange={validateInput} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Fin stage</label>
                            {error.endInternshipDate !== "" ? error.endInternshipDate : ""}
                            <input type="date" min={today} max={futureDateFormat} id="endInternshipDate" name="endInternshipDate" className="form-control text-center" onChange={validateInput} required></input>
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

export default MonitorInternshipOffer
