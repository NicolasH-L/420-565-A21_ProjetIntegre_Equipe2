import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = useHistory().location.state
    const [internship, setInternship] = useState([])
    const [contract, setContract] = useState({
        internship: undefined, collegeResponsability: "", companyResponsability: "",
        studentResponsability: "", studentSignature: "", monitorSignature: "", adminSignature: "",
        signatureDateStudent: "", signatureDateMonitor: "", signatureDateAdmin: ""
    })
    const baseUrl = "http://localhost:8888/"
    let studentObject
    let studentId
    let monitor
    let studentName

    useEffect(() => {
        if (history !== undefined) {
            studentObject = historyState
            studentId = studentObject.id
        }
        const getInternship = async () => {
            const internshipFromServer = await fetchInternship()
            setInternship(internshipFromServer)
            studentName = internship.student.firstName + ", " + internship.student.lastName
        }
        getInternship()
    }, [])

    const fetchInternship = async () => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${studentId}`)
        return await res.json()
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="grad ">
            <StudentNavbar useStudent={historyState} />
            <div className="d-flex justify-content-center my-5 py-2">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <form className="container-fluid" onSubmit={onSubmit}>
                        <h1 className="text-center">Contrat</h1>
                        <div className="form-group">
                            <label htmlFor="adminName" className="text-secondary">Le gestionnaire de stage : </label>
                            <input type="text" className="form-control text-center" id="adminName" name="adminName" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorName" className="text-secondary"> L'employeur : </label>
                            <input type="text" className="form-control text-center" id="monitorName" name="monitorName" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="studentName" className="text-secondary"> L'étudiant : </label>
                            <input type="text" className="form-control text-center" id="studentName" name="studentName" value={studentName} readOnly />
                        </div>
                        <h3 className="text-center mt-5">Conditions de stage suivantes :</h3>
                        <div className="form-group">
                            <label htmlFor="location" className="text-secondary">Endroit du stage : </label>
                            <input type="text" className="form-control text-center" id="location" name="location" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration" className="text-secondary">Durée du stage : </label>
                            <input type="text" className="form-control text-center" id="duration" name="duration" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="schedule" className="text-secondary">Horaire de travail : </label>
                            <input type="password" className="form-control text-center" id="schedule" name="schedule" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary" className="text-secondary">Salaire : </label>
                            <input type="password" className="form-control text-center" id="salary" name="salary" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duties" className="text-secondary">Taches et responsabilités du stagiaire : </label>
                            <textarea type="text" className="form-control text-center" id="duties" name="duties" readOnly />
                        </div>
                        <h3 className="text-center mt-5">Responsabilités</h3>
                        <div className="form-group">
                            <label htmlFor="responsabilityCollege" className="text-secondary">Le Collège s’engage à : : </label>
                            <textarea type="text" className="form-control text-center" id="responsabilityCollege" name="responsabilityCollege" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="responsabilityCompany" className="text-secondary">L’entreprise s’engage à : </label>
                            <textarea type="text" className="form-control text-center" id="responsabilityCompany" name="responsabilityCompany" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="responsabilityStudent" className="text-secondary">L’étudiant s’engage à : </label>
                            <textarea type="text" className="form-control text-center" id="responsabilityStudent" name="responsabilityStudent" readOnly />
                        </div>
                        <h3 className="text-center mt-5">Signatures</h3>
                        <div className="form-group">
                            <label htmlFor="signatureStudent" className="text-secondary">Signature de l'étudiant : </label>
                            <input type="text" className="form-control text-center" id="signatureStudent" name="signatureStudent" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signatureDateStudent" className="text-secondary">Date de signature de l'étudiant : </label>
                            <input type="text" className="form-control text-center" id="signatureDateStudent" name="signatureDateStudent" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signatureMonitor" className="text-secondary">Signature employeur : </label>
                            <input type="text" className="form-control text-center" id="signatureMonitor" name="signatureMonitor" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signatureDateMonitor" className="text-secondary">Date de signature de l'employeur : </label>
                            <input type="text" className="form-control text-center" id="signatureDateMonitor" name="signatureDateMonitor" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signatureAdmin" className="text-secondary">Signature du gestionnaire : </label>
                            <input type="text" className="form-control text-center" id="signatureAdmin" name="signatureAdmin" readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signatureDateAdmin" className="text-secondary">Date de signature du gestionnaire : </label>
                            <input type="text" className="form-control text-center" id="signatureDateAdmin" name="signatureDateAdmin" readOnly />
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentSignContract
