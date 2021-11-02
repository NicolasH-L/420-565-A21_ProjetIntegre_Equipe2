import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from './StudentNavbar'
import StudentAppliedOffersList from './Student/StudentAppliedOffersList'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state
    const studentFromHistoryState = historyState.student
    let studentOfferJSON
    const [student, setStudent] = useState([])
    const [studentOffers, setStudentOffers] = useState([])
    const [showStudentAppliedOfferslist, setshowStudentAppliedOfferslist] = useState()
    const [showSelectStudentAppliedOffer, setshowSelectStudentAppliedOffer] = useState()
    const baseUrl = 'http://localhost:8888/offers-list'
    const stageTrouve = "Stage trouvé"
    const enAttente = "En attente"
    const enRecherche = "En recherche"
    const defaultValue = "default"

    useEffect(() => {
        setStudent(studentFromHistoryState)
        verifyStatus(studentFromHistoryState.currentStatus)
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffers()
    }, [])

    const addStudent = async (student) => {
        const result = await fetch('http://localhost:8888/students/register',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        return await result.json()
    }

    const updateStudentOffer = async (studentOffer) => {
        const res = await fetch(`${baseUrl}/save-student-offer`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOffer)
            })
        const data = await res.json()
        alert("Acceptation de l'offre de stage réussi")
    }

    const saveChanges = () => {
        if (student.currentStatus === stageTrouve) {
            if (studentOfferJSON !== undefined) {
                addStudent(student).then((data) => history.push("/Student", {student: data}))
                updateStudentOffer(studentOfferJSON)
                alert("Statut mise à jour avec succès")
            } else {
                alert("Veuillez sélectionner le stage trouvé")
            }
        }
        if (student.currentStatus === enRecherche || student.currentStatus === enAttente) {
            addStudent(student).then((data) => history.push("/Student", {student: data}))
            alert("Statut mise à jour avec succès")
        }
    }

    const verifyStatus = async (status) => {
        if (status === enAttente) {
            setshowStudentAppliedOfferslist(true)
            setshowSelectStudentAppliedOffer(false)
            return
        }
        if (status === stageTrouve) {
            setshowStudentAppliedOfferslist(false)
            setshowSelectStudentAppliedOffer(true)
            return
        }
        setshowStudentAppliedOfferslist(false)
        setshowSelectStudentAppliedOffer(false)
    }

    const fetchStudentOffers = async () => {
        const res = await fetch(`${baseUrl}/student-offers/student/${studentFromHistoryState.id}`)
        return await res.json()
    }

    const getSelectStudentOfferValue = (e) => {
        if (e.target.value === "default") {
            studentOfferJSON = undefined
            alert("Veuillez sélectionner le stage trouvé")
        } else {
            studentOfferJSON = JSON.parse(e.target.value)
            studentOfferJSON.isAccepted = true
        }
    }

    const showSelectStudentAppliedOfferList = () => {
        return (
            <div className="form-group">
                <label htmlFor="studentOffers" className="text-secondary"> </label>
                <select defaultValue={defaultValue} onChange={getSelectStudentOfferValue} className="form-control text-center" id="studentOffers" name="studentOffers" required>
                    <option value={defaultValue}>Veuillez sélectionner le Stage trouvé</option>
                    {studentOffers.map((studentOffer) => (
                        <option value={JSON.stringify(studentOffer)} key={studentOffer.idStudentOffer}>{studentOffer.offer.companyName + " - "}  {studentOffer.offer.jobTitle}</option>
                    ))}
                </select>
            </div>
        )
    }

    const updateStatus = async (status) => {
        setStudent({ ...student, currentStatus: status })
        verifyStatus(status)
    }

    return (
        <div className="grad">
            <StudentNavbar useStudent={studentFromHistoryState} />
            <div className="btn-group mx-3">
                        <button type="button" disabled={studentFromHistoryState.currentStatus === stageTrouve} className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Statut: {student.currentStatus}
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => { updateStatus(enRecherche) }}>En recherche</button>
                            <button className="dropdown-item" onClick={() => { updateStatus(enAttente) }} >En attente d'une entrevue</button>
                            <button className="dropdown-item" onClick={() => { updateStatus(stageTrouve) }}>Stage trouvé</button>
                        </div>
                    </div>
                    <button className="btn btn-light mx-2 " onClick={() => { saveChanges() }} disabled={studentFromHistoryState.currentStatus === stageTrouve}>Mettre à jour <i className="fas fa-sync-alt"></i></button>
            <div className="d-flex justify-content-center">
                <div className="container my-5">
                    <h1 className="text-center mb-5">Bienvenue {student.firstName} {student.lastName}</h1>
                    {showStudentAppliedOfferslist ? <StudentAppliedOffersList student={studentFromHistoryState} /> : ""}
                    {showSelectStudentAppliedOffer ? showSelectStudentAppliedOfferList() : ""}
                </div>
            </div>
        </div>
    )
}

export default Student
