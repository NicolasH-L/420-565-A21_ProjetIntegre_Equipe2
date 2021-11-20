import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const StudentInternshipFoundStatus = ({ onAddStudent }) => {
    const [studentOffers, setStudentOffers] = useState([])
    const [studentOffer, setStudentOffer] = useState(undefined)
    const [isInternshipFound, setIsInternshipFound] = useState(false)

    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const location = useLocation()

    useEffect(() => {
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffers()
        student.currentStatus === "Stage trouvé" ? setIsInternshipFound(true) : setIsInternshipFound(false)
    }, [])

    const fetchStudentOffers = async () => {
        const res = await fetch(`http://localhost:8888/offers-list/student-offers/student/${student.id}`)
        return await res.json()
    }

    const selectStudentOfferValue = (e) => {
        if (e.target.value === "default") {
            alert("Veuillez sélectionner le stage trouvé")
            setStudentOffer(undefined)
            return
        }
        setStudentOffer(JSON.parse(e.target.value))
    }

    const setStudentInternship = () => {
        if (studentOffer != undefined && !isInternshipFound) {
            updateStudentOffer(studentOffer)
            setIsInternshipFound(true)
            student.currentStatus = "Stage trouvé"
            onAddStudent(student).then((data) => history.push(location.pathname, { student: data }))
            return
        }
        alert("Veuillez sélectionner le stage trouvé")
    }

    const updateStudentOffer = async (studentOffer) => {
        studentOffer.isAccepted = true;
        const res = await fetch(`http://localhost:8888/offers-list/save-student-offer`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOffer)
            })
        const data = await res.json()
        alert("Offre de stage acceptée avec succès")
    }

    const filterStudentOffers = (studentOffer) => {
        return studentOffer.session === student.actualSession
    }

    return (
        <div>
            <a href="#" className="btn btn-primary mx-2" data-toggle="modal" data-target="#studentInternshipFoundStatus">
                <i className="fas fa-handshake mr-2"></i> Stage trouvé
            </a>
            <div className="modal fade" id="studentInternshipFoundStatus" tabIndex="-1" aria-labelledby="studentInternshipFindedStatusLabel" aria-hidden="true">
                <div className="modal-lg modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="studentInternshipFindedStatusLabel">Sélectionnez le stage pour lequel vous avez été retenu</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="studentOffers" className="text-secondary"> </label>
                                <select
                                    disabled={isInternshipFound}
                                    defaultValue="default"
                                    onChange={selectStudentOfferValue}
                                    className="form-control text-center shadow font-weight-bold"
                                    id="studentOffers"
                                    name="studentOffers"
                                    required>
                                    <option value="default" className="font-weight-bold">Veuillez sélectionner le stage trouvé</option>
                                    {studentOffers
                                    .filter(filterStudentOffers)
                                    .map((studentOffer) => (
                                        <option value={JSON.stringify(studentOffer)} key={studentOffer.idStudentOffer} className="font-weight-bold">
                                            {studentOffer.offer.companyName + " - "}  {studentOffer.offer.jobTitle}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <span className="text-danger">
                            <i className="fas fa-exclamation-circle mr-2"></i>Veuillez noter que cette action est irréversible
                            </span>
                            <div>
                                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary mr-2" onClick={() => { setStudentInternship() }} hidden={isInternshipFound}>
                                    Modifier le statut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentInternshipFoundStatus
