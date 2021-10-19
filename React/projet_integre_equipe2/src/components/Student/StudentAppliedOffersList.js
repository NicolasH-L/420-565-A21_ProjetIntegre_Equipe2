import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

const StudentAppliedOffersList = ({useStudent}) => {

    const [offers, setOffers] = useState([])
    const [studentOffers, setStudentOffers] = useState([])
    const [student, setStudent] = useState({})
    const history = useHistory()
    const historyState = history.location.state
    
    useEffect(() => {
        if (historyState === undefined)
            return
        const getStudentOffers = async () => {
            const studentOffersFromServer = await fetchStudentOffers()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffers()
        setStudent(historyState)
        console.log(student)
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offer/get-all-valid-offers/')
        return await res.json()
    }

    const fetchStudentOffers = async () =>{
        const rest = await fetch(`http://localhost:8888/offers-list/student-offers/student/${student.id}`)
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

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer.idOffer}>
                                <th className="text-center">{offer.companyName}</th>
                                <td className="text-center">{offer.jobTitle}</td>
                                <td className="text-center">{offer.salary}$</td>
                                <td className="text-center">{offer.displayDate}</td>
                                <td className="text-center">{offer.deadlineDate}</td>
                                <td className="text-center">{offer.deadlineDate}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default StudentAppliedOffersList