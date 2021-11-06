import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

const OfferModalView = ({ newOffer, displayMessageBoolean }) => {
    const [offer, setOffer] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })
    const [studentOfferApplication, setStudentOfferApplication] = useState({
        offer: "", document: "", student: ""
    })
    const [documents, setDocuments] = useState([])
    const [applyOfferButton, setApplyOfferButton] = useState({ buttonDisable: true, message: "" })
    const history = useHistory()
    const historyState = history.location.state
    const baseUrl = "http://localhost:8888/offers-list"
    const appliedMessage = <strong className="text-success ml-5">Votre demande a été envoyée <i className="fas fa-exclamation-circle text-success fa-sm"></i></strong>
    const student = historyState.student
    let offerId

    useEffect(() => {
        setOffer(newOffer)
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments()
            setDocuments(documentsFromServer)
        }
        setStudentOfferApplication({ ...studentOfferApplication, student: student, offer: newOffer })
        offerId = newOffer.idOffer
        setApplyMessage()
        getDocuments()
    }, [])

    const fetchDocuments = async () => {
        const res = await fetch(`http://localhost:8888/document/get-all-documents-valid/${student.id}`)
        return await res.json()
    }

    const checkDocumentChosen = (e) => {
        if (e.target.name === "document" && e.target.value != "DEFAULT") {
            setApplyOfferButton({ ...applyOfferButton, buttonDisable: false })
            for (let index = 0; index < documents.length; index++) {
                const element = documents[index];
                if (element.documentName === e.target.value) {
                    setStudentOfferApplication({ ...studentOfferApplication, offer: offer, document: element })
                    break
                }
            }
        }
    }

    const addStudentOffer = async () => {
        const result = await fetch(baseUrl + '/save-student-offer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOfferApplication)
            })
        return await result.json()
    }

    const applyToOffer = () => {
        addStudentOffer()
        setApplyMessage()
    }

    const verifyAppliedToOfferStatus = async () => {
        const res = await fetch(`${baseUrl}/offer-applied/${offerId}/${student.id}`)
        return await res.json()
    }

    const setApplyMessage = () => {
        verifyAppliedToOfferStatus()
            .then((data) => data ? setApplyOfferButton({ ...applyOfferButton, message: appliedMessage }) : "")
    }

    const showSelectDocuments = () => {
        return (
            <select defaultValue="DEFAULT" className="mx-5" id={"document" + offer.idOffer} name="document" onChange={checkDocumentChosen}>
                <option value="DEFAULT" disabled>Choisissez un document</option>
                {documents.map((document) => (
                    <option value={document.documentName} key={document.idDocument}>{document.documentName}</option>
                ))}
            </select>)
    }

    const showApplyButton = () => {
        return <button className="btn btn-success mx-3" id="applicationButton" name="button" disabled={applyOfferButton.buttonDisable} onClick={() => applyToOffer()}>Postuler <i className="fas fa-external-link-alt fa-sm"></i></button>
    }

    const displayFunctionality = () => {
        return applyOfferButton.message !== "" ? applyOfferButton.message : showApplyButton()
    }

    return (
        <div>
            <button className="btn btn-primary" data-toggle="modal" data-target={"#offer" + offer.idOffer}>Consulter</button>
            {applyOfferButton.message !== "" ? "" : showSelectDocuments()}
            {displayMessageBoolean === true || displayMessageBoolean === undefined ? displayFunctionality() : ""}
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
