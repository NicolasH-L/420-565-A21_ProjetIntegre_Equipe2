import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import OfferModalView from '../OfferModalView'

const StudentAppliedOffersList = () => {

    const [offers, setOffers] = useState([])
    const [studentOffers, setStudentOffers] = useState([])
    const [student, setStudent] = useState({})
    const history = useHistory()
    const historyState = history.location.state
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]
    
    useEffect(() => {
        if (historyState === undefined)
            return
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
            console.log(studentOffersFromServer)
        }
        setStudent(historyState)
        getStudentOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offer/get-all-valid-offers')
        return await res.json()
    }

    const fetchStudentOffers = async () =>{
        const res = await fetch(`http://localhost:8888/offers-list/student-offers/student/${historyState.id}`)
        return await res.json()
    }

    const findFutureDate = () => {
        let futureDate = new Date(timeElapsed)
        futureDate.setDate(futureDate.getDate() + 220)
        let futureDateFormat = futureDate.toISOString().split('T')[0]
        return futureDateFormat
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
                            <th scope="col" className="text-center">Date d'affichage</th>
                            <th scope="col" className="text-center">Date limite d'affichage</th>
                            <th scope="col" className="text-center">Date de l'entrevue</th>
                            <th scope="col" className="text-center"></th>
                            <th scope="col" className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentOffers.map((studentOffer) => (
                            <tr key={studentOffer.idStudentOffer}>
                                <th className="text-center">{studentOffer.offer.companyName}</th>
                                <td className="text-center">{studentOffer.offer.jobTitle}</td>
                                <td className="text-center">{studentOffer.offer.salary}$</td>
                                <td className="text-center">{studentOffer.offer.displayDate}</td>
                                <td className="text-center">{studentOffer.offer.deadlineDate}</td>
                                <td className="text-center">{studentOffer.interviewDate === null ? "Aucune": studentOffer.interviewDate}</td>
                                <td className="text-center">test</td>

                                <td className="text-center"><OfferModalView newOffer={studentOffer.offer}/></td>
                                <td className="text-center">test</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default StudentAppliedOffersList