import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import StudentNavbar from './StudentNavbar'

const StudentInternshipOffers = () => {
    const [offers, setOffers] = useState([])
    const history = useHistory()

    useEffect(() => {
        const getOffers = async () => {
            const offersFromServer = await fetchOffers()
            setOffers(offersFromServer)
        }
        getOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offer/get-all-valid-offers')
        return await res.json()
    }

    // const acceptOffer = async (offer) => {
    //     const res = await fetch(`http://localhost:8888/offer/accept-offer/${offer.idOffer}`,
    //         {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify(offer)
    //         })
    //     const data = await res.json()

    //     setOffers(
    //         offers.map(
    //             (offer1) => offer1.idOffer === offer.idOffer ? {...offer1, valid: data.valid, state: data.state} : offer1
    //         )
    //     )
    // }

    // const declineOffer = async (offer) => {
    //     const res = await fetch(`http://localhost:8888/offer/decline-offer/${offer.idOffer}`,
    //         {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify(offer)
    //         })
    //     const data = await res.json()

    //     setOffers(
    //         offers.map(
    //             (offer1) => offer1.idOffer === offer.idOffer ? {...offer1, valid: data.valid, state: data.state} : offer1
    //         )
    //     )
    // }

    const viewOffer = async (offer) => {
        history.push("/OfferView", offer)
    }

    return (
        <div className="grad">
            <StudentNavbar />
            <h2 className="text-center">Offres de stage</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Entreprise</th>
                            <th scope="col">Poste</th>
                            <th scope="col">Salaire</th>
                            <th scope="col">Date d'affichage</th>
                            <th scope="col">Validité</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr className={`${offer.valid ? 'table-success' : offer.state == null ? 'table-warning' : 'table-danger'}`} key={offer.idOffer}>
                                <th>{offer.companyName}</th>
                                <td>{offer.jobTitle}</td>
                                <td>{offer.salary}$</td>
                                <td>{offer.displayDate}</td>
                                <td>{offer.state == null ? "En attente" : offer.state}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(offer) }}>Afficher</button>
                                    <button className="btn btn-success mx-2" onClick={e => { e.preventDefault(); acceptOffer(offer) }}>Accepter</button>
                                    <button className="btn btn-danger mx-2" onClick={e => { e.preventDefault(); declineOffer(offer) }}>Refuser</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentInternshipOffers
