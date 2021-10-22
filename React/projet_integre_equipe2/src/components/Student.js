import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from './StudentNavbar'
import StudentAppliedOffersList from './Student/StudentAppliedOffersList'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state
    let studentOfferJSON
    const [userStudent, setUserStudent] = useState([])
    const [studentOffers, setStudentOffers] = useState([])
    const [showStudentAppliedOfferslist, setshowStudentAppliedOfferslist] = useState()
    const [showSelectStudentAppliedOffer, setshowSelectStudentAppliedOffer] = useState()
    const baseUrl = 'http://localhost:8888/offers-list'

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
        const res = await fetch(`${baseUrl}/student-offer-add-date`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOffer)
            })
        const data = await res.json()
        alert("Acceptation de l'offre de stage reussi")
    }


    const saveChanges = () => {
        if(userStudent.currentStatus === "Stage trouvée"){
            if(studentOfferJSON !== undefined){
                alert("Status mise a jour avec succes")
                addStudent(userStudent).then((data) => history.push("/Student", data))
                updateStudentOffer(studentOfferJSON)
            } else {
                alert("Veuillez selectionner le stage trouvée")
            } 
        } 
        if(userStudent.currentStatus === "En attente"){
            addStudent(userStudent).then((data) => history.push("/Student", data))
            alert("Status mise a jour avec succes")
        }
        if(userStudent.currentStatus === "En recherche"){
            addStudent(userStudent).then((data) => history.push("/Student", data))
            alert("Status mise a jour avec succes")
        }
    }

    const verifyStatus = async (status) => {
        if (status === "En attente") {
            setshowStudentAppliedOfferslist(true)
            setshowSelectStudentAppliedOffer(false)
            return
        } 
        if (status === "Stage trouvée"){
            setshowSelectStudentAppliedOffer(true)
            setshowStudentAppliedOfferslist(false)
            return
        } 
        setshowStudentAppliedOfferslist(false)
        setshowSelectStudentAppliedOffer(false)
    }

    const fetchStudentOffers = async () => {
        const res = await fetch(`${baseUrl}/student-offers/student/${historyState.id}`)
        return await res.json()
    }

    const getSelectStudentOfferValue = (e) =>{
        if(e.target.value === "default"){
            alert("Veuillez selectionner le stage trouvée")
        } else {
            studentOfferJSON = JSON.parse(e.target.value)
            studentOfferJSON.isAccepted = true;  
        }
    }

    const showSelectStudentAppliedOfferList = () => {
        return (
            <div className="form-group">
                <label htmlFor="studentOffers" className="text-secondary"> </label>
                <select defaultValue="default" onChange={getSelectStudentOfferValue} className="form-control text-center" id="studentOffers" name="studentOffers" required>
                    <option value="default">Veuillez choisir le représentant</option>
                    {studentOffers.map((studentOffer) => ( 
                        <option value={JSON.stringify(studentOffer)} key={studentOffer.idStudentOffer}>{studentOffer.offer.companyName + " - "}  {studentOffer.offer.jobTitle}</option>
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
                    <button onClick={() => { saveChanges() }}>Enregistrer</button>

                    <h1 className="text-center mb-5">Bienvenue {userStudent.firstName} {userStudent.lastName}</h1>

                    {showStudentAppliedOfferslist ? <StudentAppliedOffersList student={historyState} /> : ""}

                    {showSelectStudentAppliedOffer ? showSelectStudentAppliedOfferList() : ""}

                </div>
            </div>
        </div>
    )
}

export default Student
