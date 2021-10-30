import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './../AdminNavbar'

const AdminStudentAcceptedOffers = () => {
    const collegeTerms = "Communiqué avec le stagiaire pour lui donner tout les ressources qu'il/elle a besoin lors de son stage ainsi que donner toutes les informations nécessaire pour l'entreprise."
    const monitorTerms = "Suivre le progrès du stagiaire et documenter ce qu'il/elle fait lors de son stage afin de préparer une évaluation lorsque ce dernier ou cette dernière fini son stage."
    const studentTerms = "Accomplir ou réaliser les taches demandées par le moniteur. Ameliorer ou continuer a developper auprès de l'équipe et s'assurer que tout est conforme. "
    
    const [acceptedOffers, setAcceptedOffers] = useState([])
    const [internship, setInternship] = useState({
        isSignedByStudent: false, isSignedByMonitor: false, status: "",
        offer: undefined, student: undefined
    })
    const [contract, setContract] = useState({
        internship: undefined,
        collegeResponsability: collegeTerms, companyResponsability: monitorTerms,
        studentResponsability: studentTerms, studentSignature: "", monitorSignature: "", adminSignature: "",
        signatureDateStudent: "", signatureDateMonitor: "", signatureDateAdmin: ""
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

    const createContract = async (internship) => {
        contract.internship = internship
        console.log("Create")
        console.log(contract)
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
                                                        .then((data) => data.student == null ? alert("Une erreur est survenue, veuillez réessayer plus tard!") : createContract(data))
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
