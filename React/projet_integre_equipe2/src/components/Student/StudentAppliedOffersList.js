import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import OfferModalView from '../OfferModalView'

const StudentAppliedOffersList = () => {

    const [student, setStudent] = useState()
    const [studentOffers, setStudentOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]
    const baseUrl = 'http://localhost:8888/offers-list'

    useEffect(() => {
        if (historyState === undefined)
            return
        setStudent(historyState)
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffers()
    }, [])

    console.log(student)

    const fetchStudentOffers = async () => {
        const res = await fetch(`${baseUrl}/student-offers/student/${historyState.id}`)
        return await res.json()
    }

    const updateStudentOfferDate = async (studentOffer) => {
        const res = await fetch(`${baseUrl}/student-offer-add-date`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOffer)
            })
        const data = await res.json()
        setStudentOffers(
            studentOffers.map(
                (studentOffer1) => studentOffer1.idStudentOffer === studentOffer.idStudentOffer ?
                    { ...studentOffer1, interviewDate: data.interviewDate } : studentOffer1
            )
        )
        alert("Ajout de la date d'entrevue avec succès!")
    }

    const chooseDate = (studentOffer) => {
        let stringToDate = new Date(studentOffer.offer.startInternshipDate)
        let last = new Date(stringToDate.getTime() - (1 * 24 * 60 * 60 * 1000))
        let maxDate = new Date(last).toISOString().split('T')[0]
        return <input type="date" min={today} max={maxDate} id={"interviewDate" + studentOffer.idStudentOffer} name="interviewDate" className="form-control text-center" onChange={(e) => setInterviewDate(e, studentOffer)} required></input>
    }

    const setInterviewDate = (e, studentOffer) => {
        const indexOfStudentOffer = studentOffers.indexOf(studentOffer)
        studentOffers[indexOfStudentOffer].interviewDate = e.target.value
    }

    const addStudentOfferInterviewDate = (studentOffer) => {
        const index = studentOffers.indexOf(studentOffer)
        if (index < 0) {
            return
        }
        let interviewDate = studentOffers[index].interviewDate
        if (interviewDate === null)
            return alert("Erreur! veuillez choisir une date.")
        else if (student.currentStatus !== "En attente"){
            return alert("Erreur veuillez mettre à jour votre status")
        }
        updateStudentOfferDate(studentOffer)
    }

    return (
        <div className="">
            <h2 className="text-center">Mes offres de stages</h2>
            <div className="p-5 table-responsive">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Entreprise</th>
                            <th scope="col" className="text-center">Poste</th>
                            <th scope="col" className="text-center">Salaire</th>
                            <th scope="col" className="text-center">Date début stage</th>
                            <th scope="col" className="text-center">Date de l'entrevue</th>
                            <th scope="col" className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentOffers.map((studentOffer) => (
                            <tr key={studentOffer.idStudentOffer}>
                                <th className="text-center">{studentOffer.offer.companyName}</th>
                                <td className="text-center">{studentOffer.offer.jobTitle}</td>
                                <td className="text-center">{studentOffer.offer.salary}$</td>
                                <td className="text-center">{studentOffer.offer.startInternshipDate}</td>
                                <td className="text-center">{studentOffer.interviewDate === null ? chooseDate(studentOffer) : studentOffer.interviewDate}</td>
                                <td className="text-center">
                                    <div className="row justify-content-center">
                                        {studentOffer.interviewDate === null ?
                                            <button type="button" className="btn btn-danger mr-5" onClick={() => addStudentOfferInterviewDate(studentOffer)}>Ajouter date</button> : ""
                                        }
                                        <OfferModalView newOffer={studentOffer.offer} displayMessageBoolean={false} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentAppliedOffersList
