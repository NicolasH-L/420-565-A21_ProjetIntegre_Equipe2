import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './../AdminNavbar'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'

const AdminStudentAcceptedOffers = () => {
    const collegeTerms = "Communiquer avec le stagiaire pour lui donner toutes les ressources disponibles qu'il/elle a besoin lors de son stage ainsi que donner tous les renseignements nécessaires pour l'entreprise."
    const monitorTerms = "Suivre le progrès du stagiaire et documenter ce qu'il/elle fait lors de son stage afin de préparer une évaluation lorsque ce dernier ou cette dernière fini son stage."
    const studentTerms = "Accomplir ou réaliser les tâches demandées par le moniteur. Améliorer ou continuer à développer les besoins auprès de l'équipe et s'assurer que tout est conforme."
    const typeNotification = "Signature"
    const message = "Veuillez signer le contrat disponible"
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin

    const [acceptedOffers, setAcceptedOffers] = useState([])
    const [internship, setInternship] = useState({
        isSignedByStudent: false, isSignedByMonitor: false, status: "",
        offer: undefined, student: undefined, session: ""
    })
    const [contract, setContract] = useState({
        internship: undefined,
        collegeResponsability: collegeTerms, companyResponsability: monitorTerms,
        studentResponsability: studentTerms, studentSignature: "", monitorSignature: "", adminSignature: "",
        signatureDateStudent: "", signatureDateMonitor: "", signatureDateAdmin: "", session: ""
    })

    const [notification, setNotification] = useState({
        typeNotification: typeNotification, message: message, session: admin.actualSession
    })

    const sessionPrefix = ["winter", "summer"]
    const lastMonthOfTheYear = 11
    const winterStart = 8
    const winterDeadLine = 1
    const summerStart = 2
    const summerDeadLine = 5

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
        setInternshipSession()
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

    const createContract = async (internship) => {
        contract.internship = internship
        contract.session = internship.session
        const res = await fetch('http://localhost:8888/contract/save-contract',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contract)
            })
        const data = await res.json()
        alert("Processus de signature commencé")
        createNotificationStudent(internship, notification)
        return data
    }

    const createNotificationStudent = async (internship, notification) => {
        let idStudent = internship.student.id
        const result = await fetch(`http://localhost:8888/notification/save-notification-for-student/${idStudent}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(notification)
            })
        return await result.json()
    }

    const setInternshipSession = () => {
        let sessionDate = new Date()
        let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
        let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
        let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
            : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
        internship.session = session
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
                (offer1) => offer1.idStudentOffer === acceptedOffer.idStudentOffer ? { ...offer1, isInternshipStarted: data.isInternshipStarted } : offer1
            )
        )
    }

    const filterAcceptedOffers = (acceptedOffer) => {
        return acceptedOffer.isInternshipStarted === false
            && admin.actualSession === acceptedOffer.session
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center">Débuter signature des offres acceptées</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
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
                                        <td data-title="Nom étudiant">{acceptedOffer.student.firstName + " " + acceptedOffer.student.lastName}</td>
                                        <td data-title="Matricule">{acceptedOffer.student.matricule}</td>
                                        <td data-title="Poste">{acceptedOffer.offer.jobTitle}</td>
                                        <td className="responsiveWidth">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewOffer(acceptedOffer.offer) }}>
                                                <span className="hideButtonText">Consulter</span>
                                                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                            </button>
                                            <button className="btn btn-success mx-2"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    startSigningProcess(acceptedOffer)
                                                        .then((data) => data.student == null ? alert("Une erreur est survenue, veuillez réessayer plus tard!") : createContract(data))
                                                }}>
                                                <span className="hideButtonText">Débuter signatures</span>
                                                <span className="hideButtonIcon"><i className="fas fa-file-signature"></i></span>
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
