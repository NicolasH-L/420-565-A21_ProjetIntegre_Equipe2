import React from 'react'
import { useState } from 'react'
import _ from 'lodash';
import AdminNavbar from './AdminNavbar'
import { useHistory } from "react-router-dom";
import './Form.css'

const AdminIntershipOffer = ({onAdd}) => {
    const [offer, setOffer] = useState({companyName: "", address: "", salary: "", 
                                        jobTitle: "", description: "", skills: "", 
                                        jobSchedules: "", workingHours: "", monitorEmail: "", })
    const [error, setError] = useState({companyName: "", address: "", salary: "", 
                                        jobTitle: "", description: "", skills: "", 
                                        jobSchedules: "", workingHours: "", monitorEmail: "", })
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.companyName) || !_.isEmpty(error.address) || !_.isEmpty(error.salary) || 
            !_.isEmpty(error.jobTitle) || !_.isEmpty(error.description) || !_.isEmpty(error.skills) || 
            !_.isEmpty(error.jobSchedules) || !_.isEmpty(error.workingHours) || !_.isEmpty(error.monitorEmail) ||
            _.isEmpty(offer.companyName) || _.isEmpty(offer.address) || _.isEmpty(offer.salary) || 
            _.isEmpty(offer.jobTitle) || _.isEmpty(offer.description) || _.isEmpty(offer.skills) || 
            _.isEmpty(offer.jobSchedules )|| _.isEmpty(offer.workingHours) || _.isEmpty(offer.monitorEmail)){

            alert("Veuillez remplir tous les champs!")

            return
        } else {
            onAdd(offer)
                .then((data) => data.jobTitle != null ? history.push("/adminOffersList") : alert("Impossible de créer l'offre, veuillez réessayer!"))
        }
    }

    return (
        <div className="grad">
            <AdminNavbar/>
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <form className="container-fluid" onSubmit={onSubmit}>
                        <div className="form-group">
                            {error.companyName !== "" ? error.companyName : ""}
                            <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                            <input type="text" className="form-control text-center" id="companyName" name="companyName" placeholder="Entrez le nom de l'entreprise" onChange={(e) => setOffer({...offer, companyName: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.jobTitle !== "" ? error.jobTitle : ""}
                            <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Poste: </label>
                            <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" placeholder="Entrez le nom du poste" onChange={(e) => setOffer({...offer, jobTitle: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.monitorEmail !== "" ? error.monitorEmail : ""}
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Répresentant de l'entreprise (email): </label>
                            <input type="text" className="form-control text-center" id="monitorEmail" name="monitorEmail" placeholder="Entrez l'email du représentant" onChange={(e) => setOffer({...offer, monitorEmail: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.address !== "" ? error.address : ""}
                            <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                            <input type="text" className="form-control text-center" id="address" name="address" placeholder="Entrez l'adresse des bureaux" onChange={(e) => setOffer({...offer, address: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.jobSchedules !== "" ? error.jobSchedules : ""}
                            <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                            <input type="text" className="form-control text-center" id="jobSchedules" name="jobSchedules" placeholder="Entre l'horaire de travail. Ex: Temps plein, jour, soir" onChange={(e) => setOffer({...offer, jobSchedules: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.workingHours !== "" ? error.workingHours : ""}
                            <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                            <input type="text" className="form-control text-center" id="workingHours" name="workingHours" placeholder="Entrez le nombre d'heures de travail" onChange={(e) => setOffer({...offer, workingHours: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.salary !== "" ? error.salary : ""}
                            <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                            <input type="text" className="form-control text-center" id="salary" name="salary" placeholder="Entrez le salaire proposé" onChange={(e) => setOffer({...offer, salary: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.skills !== "" ? error.skills : ""}
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            <textarea type="text" className="form-control text-center" id="skills" name="skills" rows="3" onChange={(e) => setOffer({...offer, skills: e.target.value}) } required />
                        </div>
                        <div className="form-group">
                            {error.description !== "" ? error.description : ""}
                            <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                            <textarea type="text" className="form-control text-center" id="description" name="description" rows="3" onChange={(e) => setOffer({...offer, description: e.target.value}) } required />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-block grad text-white ">Soumettre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminIntershipOffer
