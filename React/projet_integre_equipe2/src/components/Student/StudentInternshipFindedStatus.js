import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const StudentInternshipFindedStatus = ({ onAddStudent }) => {
    const [studentOffers, setStudentOffers] = useState([])
    const [studentOffer, setStudentOffer] = useState(undefined)
    const [isInternshipFinded, setIsInternshipFinded] = useState(false)

    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const location = useLocation()

    const sessionPrefix = ["winter", "summer"]
    const lastMonthOfTheYear = 11
    const winterStart = 8
    const winterDeadLine = 1
    const summerStart = 2
    const summerDeadLine = 5

    useEffect(() => {
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffers()
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
        if (studentOffer != undefined && !isInternshipFinded) {
            updateStudentOffer(studentOffer)
            setIsInternshipFinded(true)
            student.currentStatus = "Stage trouvé"
            onAddStudent(student).then((data) => history.push(location.pathname, { student: data }))
            return
        }
        alert("Veuillez sélectionner le stage trouvé")
    }

    const updateStudentOffer = async (studentOffer) => {
        studentOffer.isAccepted = true;
        studentOffer.session = setOfferSession()
        const res = await fetch(`http://localhost:8888/offers-list/save-student-offer`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOffer)
            })
        const data = await res.json()
        alert("Acceptation de l'offre de stage réussi")

        function setOfferSession() {
            let sessionDate = new Date()
            let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
            let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
            let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
                : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
            return session
        }
    }

    const filterStudentOffers = (studentOffer) => {
        return studentOffer.session === student.actualSession
    }

    return (
        <div>
            <a href="#" className="btn btn-primary mx-2" data-toggle="modal" data-target="#studentInternshipFindedStatus">
                <i className="fas fa-handshake mr-2"></i> Stage trouvé
            </a>
            <div className="modal fade" id="studentInternshipFindedStatus" tabIndex="-1" aria-labelledby="studentInternshipFindedStatusLabel" aria-hidden="true">
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
                                    disabled={isInternshipFinded}
                                    defaultValue="default"
                                    onChange={selectStudentOfferValue}
                                    className="form-control text-center shadow font-weight-bold"
                                    id="studentOffers"
                                    name="studentOffers"
                                    required>
                                    <option value="default" className="font-weight-bold">Veuillez sélectionner le Stage trouvé</option>
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
                                <button type="button" className="btn btn-primary mr-2" onClick={() => { setStudentInternship() }} hidden={isInternshipFinded}>
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

export default StudentInternshipFindedStatus
