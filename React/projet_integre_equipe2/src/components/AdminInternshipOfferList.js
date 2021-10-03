import React from 'react'
import { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'

const AdminInternshipOfferList = () => {
    const [offers, setOffers] = useState([])

    useEffect(() => {
        const getOffers = async () => {
            const offersFromServer = await fetchOffers()
            setOffers(offersFromServer)
        }
        getOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:5000/offers')
        return await res.json()
    }

    return (
        <div className="grad">
            <AdminNavbar />
            <div className="m-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Entreprise</th>
                            <th scope="col">Poste</th>
                            <th scope="col">Salaire</th>
                            <th scope="col">Validité</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {offers.map((offer) => (
                            <>
                                <tr className={`${offer.isValid ? 'table-success' : offer.isValid == null ? 'table-warning' : 'table-danger'}`}>
                                    <th>{offer.companyName}</th>
                                    <td>{offer.jobTitle}</td>
                                    <td>{offer.salary}$</td>
                                    <td>{offer.state}</td>
                                    <td className="w-25">
                                        <button className="btn btn-primary mx-2">Afficher</button>
                                        <button className="btn btn-success mx-2">Accepter</button>
                                        <button className="btn btn-danger mx-2">Refuser</button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminInternshipOfferList
