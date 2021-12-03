import React from 'react'
import { useState, useEffect } from 'react'
import EvaluationBehaviorList from './EvaluationBehaviorList'
import EvaluationRecipient from './EvaluationRecipient'
import EvaluationAppreciations from './EvaluationAppreciations'
import EvaluationReHireIntern from './EvaluationReHireIntern'
import Swal from 'sweetalert2'
import Error from '../Constants/Error'

const EvaluationForm = ({ contractProp }) => {
    const [contract, setContract] = useState(null)
    const [behaviors, setBehaviors] = useState(null)
    const [appreciation, setAppreciation] = useState({})
    const [reHireIntern, setReHireIntern] = useState({})
    const [internEvaluation, setInternEvaluation] = useState({ contract: "", behaviors: [], actualWeeklyHours: "", appreciation: "", reHireIntern: "" })
    const [submit, setSubmit] = useState({ isSubmit: "", isSubmitValid: "" })
    const [error, setError] = useState({ hasError: false })
    const baseUrl = "http://10.10.68.10:8888"

    const fireSwalError = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'error',
            title: 'Erreur! Impossible de créer l\'évaluation',
            showConfirmButton: false,
            timer: 3000,
            width: '500px'
        })
    }

    const fireSwalBadFields = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'warning',
            title: "Veuillez remplir les champs obligatoires",
            showConfirmButton: false,
            timer: 2000,
            width: '450px'
        })
    }

    const fireSwalEvaluationSuccess = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: "Évaluation envoyée avec succès",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            width: '450px'
        }).then(() => {
            window.location.reload(true)
        })
    }

    useEffect(() => {
        setContract(contractProp)
        setSubmit({ ...submit, isSubmit: false, isSubmitValid: false })
    }, [behaviors, error.hasError])

    const onSubmit = (e) => {
        e.preventDefault()
        submit.isSubmit = true
        setSubmit({ ...submit, isSubmit: true })
        validateSubmit()
        if (submit.isSubmit === false || submit.isSubmitValid === false) {
            fireSwalBadFields()
            return
        }

        contract.isEvaluatedByMonitor = true
        internEvaluation.contract = contract
        internEvaluation.appreciation = appreciation
        internEvaluation.reHireIntern = reHireIntern
        internEvaluation.behaviors = behaviors
        setInternEvaluation({ ...internEvaluation, contract: contract, appreciation: appreciation, reHireIntern: reHireIntern, behaviors: behaviors })
        submit.isSubmit = false
        setSubmit({ ...submit, isSubmit: false })
        saveEvaluation(internEvaluation)
            .then((data) => data.contract !== null ? reloadPage() : fireSwalError())
    }

    const reloadPage = () => {
        fireSwalEvaluationSuccess()
    }

    const saveEvaluation = async (contract) => {
        const result = await fetch(`${baseUrl}/evaluation/save-evaluation`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contract)
            })
        return await result.json()
    }

    const validateSubmit = () => {
        submit.isSubmitValid = true

        if (internEvaluation.actualWeeklyHours === "") {
            submit.isSubmitValid = false
            error.hasError = true
            setError({ ...error, hasError: true })
            setSubmit({ ...submit, isSubmitValid: false })
            return
        }
        validateBehaviors()

        if (submit.isSubmitValid === false) {
            setSubmit({ ...submit, isSubmitValid: false })
            return
        }

        const isValid = validateAppreciations() && validateReHireIntern()
        submit.isSubmitValid = isValid
        setSubmit({ ...submit, isSubmitValid: isValid })
    }

    const validateBehaviors = () => {
        for (let i = 0; i < behaviors.length; i++) {
            if (behaviors[i] === null || behaviors[i] === undefined || behaviors[i] === "") {
                submit.isSubmitValid = false
                break
            }
            let capabitilies = behaviors[i].capabilities
            for (let j = 0; j < capabitilies.length; j++) {
                if (capabitilies[j].capability === "" || capabitilies[j].capability === undefined ||
                    capabitilies[j].value === "" || capabitilies[j].value === undefined || capabitilies[j].value === null) {
                    submit.isSubmitValid = false
                    break
                }
            }
        }
    }

    const validateAppreciations = () => {
        return (appreciation.expectationResult !== "" && appreciation.appreciations !== "" && appreciation.isDiscussed !== ""
            && reHireIntern.hireAgain !== "")
    }

    const validateReHireIntern = () => {
        return (reHireIntern.description !== "" && reHireIntern.name !== "" && reHireIntern.jobTitle !== ""
            && internEvaluation.actualWeeklyHours !== "")
    }

    const onValueChanged = (e) => {
        e.preventDefault()
        let hasError = false
        if (e.target.value >= 0 && e.target.value <= 168 && e.target.value !== "") {
            hasError = false
        } else {
            hasError = true
        }
        error.hasError = hasError
        setError({ ...error, hasError: hasError })
        setInternEvaluation({ ...internEvaluation, [e.target.name]: e.target.value })
    }

    return (
        <div className="my-5">
            {contract !== null ?
                <form className="container-fluid" onSubmit={onSubmit} >
                    <h1 className="text-center">Fiche d’évaluation du stagiaire</h1>
                    <div className="mt-5">
                        <div className="form-group mt-3 text-left">
                            <label htmlFor="studentName">Nom de l’élève: </label>
                            <input className="form-control text-center" type="text" name="studentName" value={contract.internship.student.firstName + " " + contract.internship.student.lastName} readOnly />
                        </div>
                        <div className="form-group mt-4 text-left">
                            <label htmlFor="companyName">Nom de l’entreprise: </label>
                            <input className="form-control text-center" type="text" name="companyName" value={contract.internship.offer.companyName} readOnly />
                        </div>
                        <div className="form-group mt-4 text-left">
                            <label htmlFor="supervisorName">Nom du superviseur: </label>
                            <input className="form-control text-center" type="text" name="supervisorName" value={contract.internship.supervisor.firstName + " " + contract.internship.supervisor.lastName} readOnly />
                        </div>
                        <div className="form-group mt-4 text-left">
                            <label htmlFor="jobName">Fonction: </label>
                            <input className="form-control text-center" type="text" name="jobName" value={contract.internship.offer.jobTitle} readOnly />
                        </div>
                        <div className="form-group mt-4 text-left">
                            <label htmlFor="phoneNumber">Téléphone du stagiaire: </label>
                            <input className="form-control text-center" type="text" name="phoneNumber" value={contract.internship.student.telephoneNumber} readOnly />
                        </div>
                        <EvaluationBehaviorList behaviors={behaviors} setBehaviors={setBehaviors} submitState={submit} />
                        <EvaluationAppreciations setState={setAppreciation} submitState={submit} />
                        <div className="formGroup mt-5 text-left">
                            <label htmlFor="weeklyHours">Veuillez indiquer le nombre d'heures réel par semaine d'encadrement accordé au stagiaire <span className="text-danger font-weight-bold">*</span></label>
                            <input className="form-control text-center" type="number" name="actualWeeklyHours" min="0" max="168" placeholder="Entrez le nombre d'heures par semaine entre 0 et 168" onChange={onValueChanged} style={Error.getInputStyles(error.hasError)} />
                        </div>
                        <EvaluationReHireIntern monitor={contract.internship.offer.monitor} setState={setReHireIntern} submitState={submit} offer={contract.internship.offer} />
                        <EvaluationRecipient contract={contract} />
                        <div className="mt-2">
                            <h5>Nous vous remercions de votre appui!</h5>
                            <div>
                                Collège André-Laurendeau
                            </div>
                            <div>
                                ALTERNANCE TRAVAIL-ÉTUDES
                            </div>
                            <div>
                                2021-09-21
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5">Soumettre l'évaluation</button>
                </form>
                : ""}
        </div>
    )
}

export default EvaluationForm
