import React from 'react'
import { useState, useEffect } from 'react'
import Behaviors from './Behaviors'
import EvaluationRecipient from './EvaluationRecipient'
import EvaluationAppreciations from './EvaluationAppreciations'
import EvaluationReHireIntern from './EvaluationReHireIntern'

const EvaluationForm = ({ contractProp }) => {
    const [contract, setContract] = useState(null)
    const [behaviors, setBehaviors] = useState(null)
    const [appreciation, setAppreciation] = useState({ expectationResult: "", appreciations: "", isDiscussed: "" })
    const [reHireIntern, setReHireIntern] = useState({ hireAgain: "", description: "", name: "", signature: "", jobTitle: "", date: "" })
    const [internEvaluation, setInternEvaluation] = useState({ contract: "", behaviors: [], actualWeeklyHours: "", appreciation: "", reHireIntern: "" })
    const [submit, setSubmit] = useState({ isSubmit: "", isSubmitValid: "" })
    const baseUrl = "http://localhost:8888"

    useEffect(() => {
        setContract(contractProp)
        setSubmit({ ...submit, isSubmit: false, isSubmitValid: false })
    }, [behaviors])

    const onSubmit = (e) => {
        e.preventDefault()
        submit.isSubmit = true
        // submit.isSubmitValid =
        validateSubmit()
        if (submit.isSubmit === false || submit.isSubmitValid === false || validateSubmit() === false) {
            alert("Veuillez remplir les champs obligatoires")
            return
        }
        console.log("success")
        contract.isEvaluatedByMonitor = true
        internEvaluation.contract = contract
        internEvaluation.appreciation = appreciation
        internEvaluation.reHireIntern = reHireIntern
        internEvaluation.behaviors = behaviors
        updateContract()
        // TODO error message to fill in everything
        submit.isSubmit = false
        console.log(internEvaluation)
    }

    const validateSubmit = () => {
        console.log(behaviors)

        for (let i = 0; i < behaviors.length; i++) {
            if (behaviors[i] === null || behaviors[i] === undefined) {
                console.log("behavior is null")
                submit.isSubmitValid = false
                break
            }
            let capabitilies = behaviors[i].capabilities
            for (let j = 0; j < capabitilies.length; j++) {
                if(capabitilies[j].capability === "" || capabitilies[j].capability === undefined || 
                    capabitilies[j].value === "" || capabitilies[j].value === undefined){
                        console.log("empty capability")
                        submit.isSubmitValid = false
                        break
                    }
            }
        }

        console.log(reHireIntern)
        console.log(internEvaluation.actualWeeklyHours)
        console.log(appreciation)
        submit.isSubmitValid = (appreciation.expectationResult !== "" && appreciation.appreciations !== "" && appreciation.isDiscussed !== ""
            && reHireIntern.hireAgain !== "" && reHireIntern.description !== "" && reHireIntern.name !== "" && reHireIntern.jobTitle !== ""
            && internEvaluation.actualWeeklyHours !== "")
        console.log("after all loops")
        console.log(submit.isSubmitValid)
    }

    const updateContract = async () => {
        
        // TODO save the contract basically update it 
        // TODO the contract controller will receive the internEvaluation object and will extract it in two separate phases
        // first it will take the contract then validate the isEvaluated or maybe we dont need it anymore :thinking:

        // const result = await fetch(`${baseUrl}/contract/save-contract`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify(contract)
        //     })
        // return await result.json()
    }

    const onValueChanged = (e) => {
        e.preventDefault()
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
                        <Behaviors behaviors={behaviors} setBehaviors={setBehaviors} submitState={submit}/>

                        <EvaluationAppreciations setState={setAppreciation} submitState={submit}/>
                        
                        <div className="formGroup mt-5 text-left">
                            <label htmlFor="weeklyHours">Veuillez indiquer le nombre d'heures réel par semaine d'encadrement accordé au stagiaire <span className="text-danger font-weight-bold">*</span></label>
                            <input className="form-control text-center" type="number" name="actualWeeklyHours" min="0" max="168" placeholder="Entrez le nombre d'heures par semaine entre 0 et 168" onChange={onValueChanged} />
                        </div>
                        
                        <EvaluationReHireIntern monitor={contract.internship.offer.monitor} setState={setReHireIntern} submitState={submit}/>
                        
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
