import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MonitorNavbar from './MonitorNavbar'

const MonitorStudentList = () => {
    const [studentOffers, setStudentOffers] = useState([])
    const history = useHistory()
    const monitor = history.location.state
    const idOffer = window.location.href.split('/')[4]

    const viewDocumentCv = async (document) => {
        history.push("/ViewDocument", document)
    }

    useEffect(() => {
        const getStudentOffersByIdOffer = async () => {
            const studentOffersFromServer = await fetchStudentOffersByIdOffer()
            setStudentOffers(studentOffersFromServer)
        }
        getStudentOffersByIdOffer()
    }, [])

    const fetchStudentOffersByIdOffer = async () => {
        const res = await fetch(`http://localhost:8888/offers-list/get-all-studentOffersByIdOffer/${idOffer}`)
        return await res.json()
    }



    return (
        <div className="grad">
            <MonitorNavbar />
            <div className="justify-content-start d-flex mx-5">
                <button className="btn btn-light" onClick={e => { e.preventDefault(); history.goBack() }}>
                    <i className="fas fa-angle-double-left"></i> Retour
                </button>
            </div>
            <h2 className="text-center">Candidatures</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Matricule</th>
                            <th scope="col">CV</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentOffers.map((studentOffer) => (
                            <tr key={studentOffer.idStudentOffer}>
                                <th>{studentOffer.student.firstName + " " + studentOffer.student.lastName}</th>
                                <td>{studentOffer.student.matricule}</td>
                                <td>{studentOffer.document.documentName}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={(e) => viewDocumentCv(studentOffer.document)}>consulter</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MonitorStudentList
