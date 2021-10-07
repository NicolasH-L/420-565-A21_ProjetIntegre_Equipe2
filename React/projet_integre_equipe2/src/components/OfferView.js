import React from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const OfferView = () => {
    const history = useHistory()
    const offer = history.location.state

    return (
        <div className="grad">
            <AdminNavbar />
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-secondary text-center">Offre</h2>
                    <form className="container-fluid">
                        <div className="form-group">
                            <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                            <input type="text" className="form-control text-center" id="companyName" name="companyName" value={offer.companyName} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Poste: </label>
                            <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" value={offer.jobTitle} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Répresentant de l'entreprise (email): </label>
                            <input type="email" className="form-control text-center" id="monitorEmail" name="monitorEmail" value={offer.monitorEmail} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                            <input type="text" className="form-control text-center" id="address" name="address" value={offer.address} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                            <input type="text" className="form-control text-center" id="jobSchedules" name="jobSchedules" value={offer.jobSchedules} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                            <input type="text" className="form-control text-center" id="workingHours" name="workingHours" value={offer.workingHours + "h"} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                            <input type="text" className="form-control text-center" id="salary" name="salary" value={offer.salary + "$"} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            <textarea type="text" className="form-control" id="skills" name="skills" rows="3" value={offer.skills} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                            <textarea type="text" className="form-control" id="description" name="description" rows="3" value={offer.description} readOnly/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OfferView
