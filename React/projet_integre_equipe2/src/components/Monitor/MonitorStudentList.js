import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import MonitorNavbar from './MonitorNavbar'
import '../ResponsiveTable.css'
import '../ResponsiveButtons.css'

const MonitorStudentList = () => {
    const [studentOffers, setStudentOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor
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

    const filterStudents = (studentOffer) => {
        console.log(studentOffer)
        return studentOffer.student.actualSession == monitor.actualSession
    }

    return (
        <div className="grad">
            <MonitorNavbar />
            <div className="justify-content-start d-flex mx-5">
                <button className="btn btn-light" onClick={e => { e.preventDefault(); history.goBack() }}>
                    <i className="fas fa-angle-double-left"></i> Retour
                </button>
            </div>
            <h2 className="text-center mt-4">Candidatures</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Matricule</th>
                            <th scope="col">CV</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentOffers
                            .filter(filterStudents)
                            .map((studentOffer) => (
                                <tr key={studentOffer.idStudentOffer}>
                                    <td data-title="Nom">{studentOffer.student.firstName + " " + studentOffer.student.lastName}</td>
                                    <td data-title="Matricule">{studentOffer.student.matricule}</td>
                                    <td data-title="CV">{studentOffer.document.documentName}</td>
                                    <td className="responsiveWidth">
                                        <button className="btn btn-primary mx-2" onClick={(e) => viewDocumentCv(studentOffer.document)}>
                                            <span className="hideButtonText">Consulter CV</span>
                                            <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                        </button>
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
