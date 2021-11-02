import React from 'react'
import { useEffect, useState } from 'react'

const Contract = ({ internshipProp, updateMethodContract, studentState, passwordUser, activeStatus }) => {
    const [internship, setInternship] = useState(null)
    const [contract, setContract] = useState({
        internship: "", collegeResponsability: "", companyResponsability: "",
        studentResponsability: "", studentSignature: "", monitorSignature: "", adminSignature: "",
        signatureDateStudent: "", signatureDateMonitor: "", signatureDateAdmin: ""
    })
    const [student, setStudent] = useState({})
    const [contractState, setContractState] = useState({ password: "", userPassword: "", isValid: false, currentStatus: "" })
    const baseUrl = "http://localhost:8888"
    const studentSignatureStatus = "StudentSignature"
    const monitorSignatureStatus = "MonitorSignature"
    const adminSignatureStatus = "AdminSignature"

    useEffect(() => {
        // setContractState({ ...contractState, userPassword: passwordUser })
        contractState.userPassword = passwordUser
        student.id = studentState.id
        setContractState({...contractState, currentStatus : activeStatus})
        console.log(contractState.currentStatus == activeStatus)
        setStudent(studentState)
        setInternship(internshipProp)

        const getContract = async () => {
            const contractFromServer = await fetchContract()
            setContract(contractFromServer)
        }
        getContract()
    }, [])

    const fetchContract = async () => {
        const res = await fetch(`${baseUrl}/contract/get-contract/${student.id}`)
        return await res.json()
    }

    const updateInternship = async () => {
        const result = await fetch(`${baseUrl}/internship/save-internship`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(internship)
            })
        return await result.json()
    }

    const checkCurrentSignatureStatus = (signature) => {
        return !(internship.status === signature)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (validateInput()) {
            updateMethodContract(contract)
            updateInternship()
        }
    }

    const validateInput = () => {
        let isValid = false
        if (contractState.password === contractState.userPassword) {
            setContractState({ ...contractState, isValid: true })
            if (internship.status === studentSignatureStatus) {
                contract.studentSignature = student.firstName + " " + student.lastName
                contract.signatureDateStudent = getToday()
                internship.status = monitorSignatureStatus
            }
            isValid = true
        } else {
            alert("Veuillez entrer votre mot de passe correctement")
        }
        return isValid
    }

    const setContractSignature = (e) => {
        setContractState({ ...contractState, [e.target.name]: e.target.value })
    }

    const getToday = () => {
        return new Date().toLocaleString("en-CA", { year: "numeric", month: "numeric", day: "numeric" })
    }

    return (
        <div className="d-flex justify-content-center my-5 py-2">
            <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                <form className="container-fluid" onSubmit={onSubmit} >
                    <h1 className="text-center">Contrat</h1>
                    {internship && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="adminName" className="text-secondary">Le gestionnaire de stage : </label>
                                <input type="text" className="form-control text-center" id="adminName" name="adminName" disabled={checkCurrentSignatureStatus(adminSignatureStatus)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="monitorName" className="text-secondary"> L'employeur : </label>
                                <input type="text" className="form-control text-center" id="monitorName" name="monitorName"
                                    value={internship.offer.monitor.firstName + ", " + internship.offer.monitor.lastName} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="studentName" className="text-secondary"> L'étudiant : </label>
                                <input type="text" className="form-control text-center" id="studentName" name="studentName"
                                    value={internship.student.firstName + " " + internship.student.lastName} readOnly />
                            </div>
                            <h3 className="text-center mt-5">Conditions de stage suivantes :</h3>
                            <div className="form-group">
                                <label htmlFor="location" className="text-secondary">Endroit du stage : </label>
                                <input type="text" className="form-control text-center" id="location" name="location" value={internship.offer.address} readOnly />
                            </div>
                            <h6 className="text-secondary">Durée du stage</h6>
                            <div className="form-group">
                                <label htmlFor="durationStart" className="text-secondary">Date de début : </label>
                                <input type="text" className="form-control text-center" id="durationStart" name="durationStart" value={internship.offer.startInternshipDate} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="durationEnd" className="text-secondary">Date de fin : </label>
                                <input type="text" className="form-control text-center" id="durationEnd" name="durationEnd" value={internship.offer.endInternshipDate} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numberOfWeeks" className="text-secondary">Nombre total de semaines : </label>
                                <input type="text" className="form-control text-center" id="numberOfWeeks" name="numberOfWeeks"
                                    value={internship.offer.weeksBetweenDates} readOnly />
                            </div>
                            <h6 className="text-secondary">Horaire de travail</h6>
                            <div className="form-group">
                                <label htmlFor="schedule" className="text-secondary">Horaire de travail : </label>
                                <input type="text" className="form-control text-center" id="schedule" name="schedule" value={internship.offer.jobSchedules} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weeklyHours" className="text-secondary">Nombre total d'heures par semaine : </label>
                                <input type="text" className="form-control text-center" id="weeklyHours" name="weeklyHours" value={internship.offer.workingHours} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary" className="text-secondary">Salaire : </label>
                                <input type="text" className="form-control text-center" id="salary" name="salary" value={internship.offer.salary} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="duties" className="text-secondary">Taches et responsabilités du stagiaire : </label>
                                <textarea type="text" className="form-control" id="duties" name="duties" rows="5" value={internship.offer.description} readOnly />
                            </div>
                            <h3 className="text-center mt-5">Responsabilités</h3>
                            <div className="form-group">
                                <label htmlFor="responsabilityCollege" className="text-secondary">Le Collège s’engage à : </label>
                                <textarea type="text" className="form-control" id="responsabilityCollege" name="responsabilityCollege" rows="5" value={contract.collegeResponsability} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="responsabilityCompany" className="text-secondary">L’entreprise s’engage à : </label>
                                <textarea type="text" className="form-control" id="responsabilityCompany" name="responsabilityCompany" rows="5" value={contract.companyResponsability} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="responsabilityStudent" className="text-secondary">L’étudiant s’engage à : </label>
                                <textarea type="text" className="form-control" id="responsabilityStudent" name="responsabilityStudent" rows="5" value={contract.studentResponsability} readOnly />
                            </div>
                            <h3 className="text-center mt-5">Signatures</h3>
                            <div className="form-group">
                                <label htmlFor="signatureStudent" className="text-secondary">Signature de l'étudiant : </label>
                                <input type="text" className="form-control text-center" id="signatureStudent" name="signatureStudent" value={contract.studentSignature !== "" ? contract.studentSignature : ""} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signatureDateStudent" className="text-secondary">Date de signature de l'étudiant : </label>
                                <input type="text" className="form-control text-center" id="signatureDateStudent" name="signatureDateStudent"
                                    value={(contract.signatureDateStudent !== "") ? contract.signatureDateStudent : (internship.status === studentSignatureStatus && contract.studentSignature !== "") ? getToday() : ""} readOnly />
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
                            {contractState.currentStatus !== undefined && contractState.currentStatus === internship.status ?
                                <div className="form-group">
                                    <label htmlFor="password" className="text-secondary">Entrez votre mot de passe : </label>
                                    <input type="password" className="form-control text-center" id="password" name="password" disabled={contractState.isValid} onChange={setContractSignature} />
                                </div>
                                : ""}
                            {contractState.currentStatus !== undefined && contractState.currentStatus === internship.status ?
                                <div className="d-flex justify-content-center mt-5">
                                    <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                                </div>
                                : <strong className="text-success">Contrat signée avec succès <i className="fas fa-exclamation-circle text-success fa-sm"></i></strong>}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Contract
