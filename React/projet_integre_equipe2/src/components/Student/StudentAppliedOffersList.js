import React from 'react'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import OfferModalView from '../OfferModalView'
import Swal from 'sweetalert2'

const StudentAppliedOffersList = ({onSetDate}) => {
    const [studentOffers, setStudentOffers] = useState([])
    const [tmpStudentOffers, setTmpStudentOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const location = useLocation()

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]
    const baseUrl = 'http://localhost:8888/offers-list'

    useEffect(() => {
        if (historyState === undefined)
            return
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
            const cloneStudentOffers = _.cloneDeep(studentOffersFromServer)
            setTmpStudentOffers(cloneStudentOffers)
        }
        getStudentOffers()
    }, [])

    const fireSwalBadDate = () => {
        Swal.fire({
            title: "Veuillez choisir une date",
            icon: 'info',
            position: 'top',
            toast: true,
            timer: 2000,
            showConfirmButton: false,
            width: '400px',
        })
    }

    const fireSwalGoodDate = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: 'Date ajouté avec succès',
            showConfirmButton: false,
            timer: 2000
        })
      }
    
    const fetchStudentOffers = async () => {
        const res = await fetch(`${baseUrl}/student-offers/student/${student.id}`)
        return await res.json()
    }

    const chooseDate = (studentOffer) => {
        let stringToDate = new Date(studentOffer.offer.startInternshipDate)
        let dayOffset = 1
        let last = new Date(stringToDate.getTime() - (dayOffset * 24 * 60 * 60 * 1000))
        let maxDate = new Date(last).toISOString().split('T')[0]
        return <input type="date" min={today} max={maxDate} id={"interviewDate" + studentOffer.idStudentOffer} name="interviewDate" className="form-control text-center" onChange={(e) => setInterviewDate(e, studentOffer)}></input>
    }

    const setInterviewDate = (e, studentOffer) => {
        const indexOfStudentOffer = retrieveStudentOfferIndex(tmpStudentOffers, studentOffer)
        tmpStudentOffers[indexOfStudentOffer].interviewDate = e.target.value
    }

    const retrieveStudentOfferIndex = (studentOffersArray, studentOffer) => {
        let index = 0
        for (let i = 0; i < studentOffersArray.length; i++) {
            if (studentOffersArray[i].idStudentOffer !== studentOffer.idStudentOffer) {
                index++
            }
            else {
                break
            }
        }
        return index
    }

    const addStudentOfferInterviewDate = (studentOffer) => {
        const index = retrieveStudentOfferIndex(tmpStudentOffers, studentOffer)
        if (index < 0) {
            return
        }
        let interviewDate = tmpStudentOffers[index].interviewDate
        if (interviewDate === null)
            return fireSwalBadDate()
        updateStudentOfferDate(tmpStudentOffers[index])
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
        fireSwalGoodDate()
        student.currentStatus = "En attente"
        onSetDate(student).then((data) => history.push(location.pathname, {student: data}))
    }

    const filterStudentOffers = (studentOffer) => {
        return studentOffer.session === student.actualSession
    }

    return (
        <div>
            <h2 className="text-center">Mes offres de stages</h2>
            <div className="p-5 table-responsive">
                <table className="table table-hover bg-light shadow">
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
                        {studentOffers
                        .filter(filterStudentOffers)
                        .map((studentOffer) => (
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
