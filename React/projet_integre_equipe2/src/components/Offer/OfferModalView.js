import React, { useState, useEffect } from 'react'

const OfferModalView = ({ newOffer }) => {
    const [offer, setOffer] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })
    
    useEffect(() => {
        setOffer(newOffer)
    }, [])

    return (
        <div>
            <button className="btn btn-primary mx-2" data-toggle="modal" data-target={"#offer" + offer.idOffer}>
                <span className="hideButtonText">Consulter</span>
                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
            </button>
            <div className="modal fade justify-content-center" id={"offer" + offer.idOffer} tabIndex="-1" role="dialog" aria-labelledby="offreDeStage" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h2 className="modal-title text-secondary w-100 ml-4" id="offreDeStage">Offre de stage</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form role="form" className="container-fluid">
                                <div className="form-group">
                                    <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                                    <input type="text" className="form-control text-center" id="companyName" name="companyName" value={offer.companyName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Poste: </label>
                                    <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" value={offer.jobTitle} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Courriel du représentant de l'entreprise: </label>
                                    <input type="email" className="form-control text-center" id="monitorEmail" name="monitorEmail" value={offer.monitorEmail} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                                    <input type="text" className="form-control text-center" id="address" name="address" value={offer.address} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                                    <input type="text" className="form-control text-center" id="jobSchedules" name="jobSchedules" value={offer.jobSchedules} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                                    <input type="text" className="form-control text-center" id="workingHours" name="workingHours" value={offer.workingHours + "h"} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                                    <input type="text" className="form-control text-center" id="salary" name="salary" value={offer.salary + "$"} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                                    <textarea type="text" className="form-control" id="skills" name="skills" rows="3" value={offer.skills} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                                    <textarea type="text" className="form-control" id="description" name="description" rows="3" value={offer.description} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="displayDate" className="text-secondary"><i className="fas fa-calendar"></i> Date d'affichage:</label>
                                    <input type="text" id="displayDate" name="displayDate" className="form-control text-center" value={offer.displayDate} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deadlineDate" className="text-secondary"><i className="fas fa-calendar"></i> Date limite:</label>
                                    <input type="text" id="deadlineDate" name="deadlineDate" className="form-control text-center" value={offer.deadlineDate} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Début stage</label>
                                    <input type="text" id="startInternshipDate" name="startInternshipDate" className="form-control text-center" value={offer.startInternshipDate} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Fin stage</label>
                                    <input type="text" id="endInternshipDate" name="endInternshipDate" className="form-control text-center" value={offer.endInternshipDate} readOnly></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferModalView
