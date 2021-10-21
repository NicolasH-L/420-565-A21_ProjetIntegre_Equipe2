import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from './StudentNavbar'
import StudentAppliedOffersList from './Student/StudentAppliedOffersList'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [userStudent, setUserStudent] = useState([])
    const [studentOffers, setStudentOffers] = useState([])
    const [showStudentAppliedOfferslist, setshowStudentAppliedOfferslist] = useState()
    const baseUrl = 'http://localhost:8888/offers-list'
    const [studentOfferKey, setstudentOfferKey] = useState()

    useEffect(() => {
        setUserStudent(historyState)
        verifyStatus(historyState.currentStatus)
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffers()
    }, [])

    const addStudent = async (student) => {
        console.log(studentOfferKey)
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

    const verifyStatus = async (status) => {
        if (status === "En attente") {
            setshowStudentAppliedOfferslist(true)
        } else {
            setshowStudentAppliedOfferslist(false)
        }
    }

    const fetchStudentOffers = async () => {
        const res = await fetch(`${baseUrl}/student-offers/student/${historyState.id}`)
        return await res.json()
    }

    const getSelectStudentOfferValue = (e) =>{
        setstudentOfferKey(e.target.value)
        console.log(e.target.value)
    }

    const showSelectStudentAppliedOfferList = () => {
        return (
            <div className="form-group">
                <label htmlFor="studentOffers" className="text-secondary"><i className="fas fa-at"></i> Courriel du représentant de l'entreprise: </label>
                <select defaultValue="default" onChange={getSelectStudentOfferValue} className="form-control text-center" id="studentOffers" name="studentOffers" required>
                    <option value="default">Veuillez choisir le représentant</option>
                    {studentOffers.map((studentOffer) => (
                        <option value={studentOffer.offer.idOffer} key={studentOffer.offer.idOffer}>{studentOffer.offer.companyName + " - "}  {studentOffer.offer.jobTitle}</option>
                    ))}
                </select>
            </div>
        )
    }

    const updateStatus = async (status) => {
        setUserStudent({ ...userStudent, currentStatus: status })
        verifyStatus(status)
    }

    return (
        <div className="grad">
            <StudentNavbar useStudent={historyState} />
            <div className="d-flex justify-content-center">
                <div className="container my-5">

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userStudent.currentStatus}
                        </button>
                        <div class="dropdown-menu">
                            <button className="dropdown-item" onClick={() => { updateStatus("En recherche") }}>En recherche</button>
                            <button className="dropdown-item" onClick={() => { updateStatus("En attente") }} >En attente d'une entrevue</button>
                            <button className="dropdown-item" onClick={() => { updateStatus("Stage trouvée") }}>Stage trouvée</button>
                        </div>
                    </div>
                    <button onClick={() => { addStudent(userStudent).then((data) => history.push("/Student", data)) }}>Enregistrer</button>

                    <h1 className="text-center mb-5">Bienvenue {userStudent.firstName} {userStudent.lastName}</h1>

                    {showStudentAppliedOfferslist ? <StudentAppliedOffersList /> : ""}

                    {showStudentAppliedOfferslist ? showSelectStudentAppliedOfferList() : ""}

                </div>
            </div>
        </div>
    )
}

export default Student
