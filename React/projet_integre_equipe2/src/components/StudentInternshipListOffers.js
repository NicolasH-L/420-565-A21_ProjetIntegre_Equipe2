import React from 'react'
import { useState, useEffect } from 'react'
import StudentNavbar from './StudentNavbar'
import OfferModalView from './OfferModalView'
import { useHistory } from 'react-router'

const StudentInternshipListOffers = () => {
    const [offers, setOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student

    useEffect(() => {
        if (historyState === undefined)
            return
        const getOffers = async () => {
            const offersFromServer = await fetchOffers()
            setOffers(offersFromServer)
        }
        getOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offer/get-all-valid-offers/')
        return await res.json()
    }

    const filterOffers = (offer) => {
        return offer.session === student.actualSession
    }

    return (
        <div className="grad">
            <StudentNavbar useStudent={student} />
            <h2 className="text-center">Offres de stage</h2>
            <div className="p-5 table-responsive">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Entreprise</th>
                            <th scope="col" className="text-center">Poste</th>
                            <th scope="col" className="text-center">Salaire</th>
                            <th scope="col" className="text-center">Date d'affichage</th>
                            <th scope="col" className="text-center">Date limite d'affichage</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers
                        .filter(filterOffers)
                        .map((offer) => (
                            <tr key={offer.idOffer}>
                                <th className="text-center">{offer.companyName}</th>
                                <td className="text-center">{offer.jobTitle}</td>
                                <td className="text-center">{offer.salary}$</td>
                                <td className="text-center">{offer.displayDate}</td>
                                <td className="text-center">{offer.deadlineDate}</td>
                                <td><OfferModalView newOffer={offer}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentInternshipListOffers
