import React from 'react'
import { useState } from 'react'
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import './Form.css'
import { RegexPattern } from './RegexPattern';
import MonitorNavbar from './MonitorNavbar';

const MonitorInternshipOffer = ({ onAdd }) => {
    const [offer, setOffer] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: ""
    })
    const [error, setError] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: ""
    })
    const history = useHistory();

    const onSubmit = (e) => {
        console.log(offer)
        e.preventDefault()
        if (!_.isEmpty(error.companyName) || !_.isEmpty(error.address) || !_.isEmpty(error.salary) ||
            !_.isEmpty(error.jobTitle) || !_.isEmpty(error.description) || !_.isEmpty(error.skills) ||
            !_.isEmpty(error.jobSchedules) || !_.isEmpty(error.workingHours) || !_.isEmpty(error.monitorEmail) ||
            _.isEmpty(offer.companyName) || _.isEmpty(offer.address) || _.isEmpty(offer.salary) ||
            _.isEmpty(offer.jobTitle) || _.isEmpty(offer.description) || _.isEmpty(offer.skills) ||
            _.isEmpty(offer.jobSchedules) || _.isEmpty(offer.workingHours) || _.isEmpty(offer.monitorEmail)) {
                alert("Veuillez remplir tous les champs!")
                return
            } else{
                verifyMonitorExists(offer.monitorEmail)
                .then((data) => data ? submitOffer(): alert("Aucun moniteur existant avec cet email!"))
            }

        function submitOffer() {
            addOffer(offer)
                .then((data) => data.jobTitle != null ? history.push("/monitorofferlist") : alert("Impossible de créer l'offre, veuillez réessayer!"))
                // On redirige ou le moniteur apres avoir soumit son offre de stage?
        }
    }

    const addOffer = async (offer) => {
        const result = await fetch('http://localhost:8888/offer/saveoffer',
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
        let patternEmail = RegexPattern.getPatternEmail()
        let patternCompany = RegexPattern.getPatternCompany()
        let patternNumber = RegexPattern.getPatternNumber()

        
        if (e.target.name === "address" || e.target.name === "jobTitle" || e.target.name === "description" ||
            e.target.name === "skills")
            pattern = new RegExp(patternGeneral)
        else if (e.target.name === "companyName")
            pattern = new RegExp(patternCompany)
        else if (e.target.name === "monitorEmail")
            pattern = new RegExp(patternEmail)
        else if (e.target.name === "salary" || e.target.name === "workingHours")
            pattern = new RegExp(patternNumber)
        else if (e.target.name === "jobSchedules")
            console.log("pattern : " + pattern)

        if (pattern === undefined && e.target.name === "jobSchedule" && e.target.value === ""){
            e.target.style.borderColor = "red"
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red"
            inputError = <strong className="text-danger"> Erreur <i className="fas fa-exclamation-circle text-danger fa-sm" ></i></strong>
        }else if (!pattern == undefined && !pattern.test(e.target.value) || e.target.value === "") {
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

    // const setScheduleOptions = (e) => {
    //     console.log(e.target.value)
    //     if(e.target.value !== "")
    //         setOffer({ ...offer, [e.target.name]: e.target.value})
    // }

    return (
        <div className="grad">
            <MonitorNavbar />
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-secondary text-center">Déposer offre de stage</h2>
                    <form className="container-fluid" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                            {error.companyName !== "" ? error.companyName : ""}
                            <input type="text" className="form-control text-center" id="companyName" name="companyName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} required />
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
                            <textarea type="text" className="form-control text-center" id="description" name="description" rows="3" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            {error.skills !== "" ? error.skills : ""}
                            <textarea type="text" className="form-control text-center" id="skills" name="skills" rows="3" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Répresentant de l'entreprise (email): </label>
                            {error.monitorEmail !== "" ? error.monitorEmail : ""}
                            <input type="email" className="form-control text-center" id="monitorEmail" name="monitorEmail" placeholder="Entrez l'email du représentant" onChange={validateInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                            {error.workingHours !== undefined ? error.workingHours : undefined}
                            <input type="text" className="form-control text-center" id="workingHours" name="workingHours" placeholder="Entrez le nombre d'heures de travail" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobType" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                            {error.jobSchedules !== "" ? error.jobSchedules : ""}
                            <select defaultValue={'DEFAULT'} className="form-control text-center" id="jobSchedules" name="jobSchedules" onChange={validateInput} required >
                                <option value="DEFAULT" disabled>Veuillez choisir le type d'horaire</option>
                                <option value="Temps plein">Temps plein</option>
                                <option value="Temps partiel">Temps partiel</option>
                                <option value="Jour">Jour</option>
                                <option value="Soir">Soir</option>
                            </select>
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
