import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './../AdminNavbar'

const AdminStudentAcceptedOffers = () => {
    const [acceptedOffers, setAcceptedOffers] = useState([])
    const [internship, setInternship] = useState({
        isSignedByStudent: false, isSignedByMonitor: false, status: "",
        offer: undefined, student: undefined
    })
    const history = useHistory()

    useEffect(() => {
        const getAcceptedOffers = async () => {
            const acceptedOffersFromServer = await fetchOffers()
            setAcceptedOffers(acceptedOffersFromServer)
        }
        getAcceptedOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offers-list/get-all-accepted-offers')
        return await res.json()
    }

    const viewOffer = async (offer) => {
        history.push("/OfferView", offer)
    }

    const startSigningProcess = async (acceptedOffer) => {
        internship.offer = acceptedOffer.offer
        internship.student = acceptedOffer.student
        internship.status = "StudentSignature"
        const res = await fetch('http://localhost:8888/internship/save-internship',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(internship)
            })
        const data = await res.json()
        
        confirmStudentOfferInternship(acceptedOffer)

        return data
    }

    const confirmStudentOfferInternship = async (acceptedOffer) => {
        acceptedOffer.isInternshipStarted = true
        const res = await fetch('http://localhost:8888/offers-list/save-student-offer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(acceptedOffer)
            })
        const data = await res.json()

        setAcceptedOffers(
            acceptedOffers.map(
                (offer1) => offer1.idStudentOffer === acceptedOffer.idStudentOffer ? {...offer1, isInternshipStarted: data.isInternshipStarted} : offer1
            )
        )
    }

    const filterAcceptedOffers = (acceptedOffer) => {
        return acceptedOffer.isInternshipStarted == false
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center">Offres de stage acceptés</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg">
                        <thead>
                            <tr>
                                <th scope="col">Nom de l'étudiant</th>
                                <th scope="col">Matricule</th>
                                <th scope="col">Poste</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {acceptedOffers
                            .filter(filterAcceptedOffers)
                            .map((acceptedOffer) => (
                                <tr key={acceptedOffer.idStudentOffer}>
                                    <th>{acceptedOffer.student.firstName + " " + acceptedOffer.student.lastName}</th>
                                    <td>{acceptedOffer.student.matricule}</td>
                                    <td>{acceptedOffer.offer.jobTitle}</td>
                                    <td className="w-25">
                                        <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(acceptedOffer.offer) }}>Consulter</button>
                                        <button className="btn btn-success mx-2"
                                            onClick={e => {
                                                e.preventDefault();
                                                startSigningProcess(acceptedOffer)
                                                    .then((data) => data.student == null ? alert("Une erreur est survenue, veuillez réessayer plus tard!") : alert("Processus de signature commencé"))
                                            }}>
                                            Débuter signatures
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminStudentAcceptedOffers
