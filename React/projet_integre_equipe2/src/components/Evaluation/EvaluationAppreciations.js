import React from 'react'
import { useState, useEffect } from 'react'
import { RegexPattern } from '../RegexPattern'

const EvaluationAppreciations = ({ setState, submitState }) => {
    const [appreciation, setAppreciation] = useState({ expectationResult: "", appreciations: "", isDiscussed: "" })
    const [error, setError] = useState({ isEmpty: "" })
    // TODO Replace onChangeMethod (prop) by setState (prop)

    //TODO error messages
    //TODO scan for missing fields onSubmit
    useEffect(() => {
        setState(appreciation)
        console.log("modified appreciation in the effect")
    }, [appreciation])

    const onAppreciationChanged = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        // TODO add valiadation + setSubmitState
        validateInputValue(e)

        setAppreciation({ ...appreciation, [e.target.name]: e.target.value })
    }

    const validateInputValue = (e) => {
        let isValid = true
        if ((e.target.name === "expectationResult" || e.target.name == "isDiscussed")) {
            if (e.target.value === "default") {
                isValid = false
            }
        } else if (e.target.name === "appreciations") {
            let pattern = new RegExp(RegexPattern.getPatternGeneral())
            if (!pattern.test(e.target.value) || e.target.value === "") {
                isValid = false
            }
        }

        if (!isValid) {
            e.target.style.borderColor = "red"
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red"
            error.isEmpty = true
            submitState.isSubmitValid = false
            return
        }
        
        if (error.isEmpty) {
            e.target.style.borderColor = "#ced4da"
            e.target.style.boxShadow = "none"
            error.isEmpty = false
            isValid = true
        }

        return isValid
    }

    return (
        <div className="mt-5">
            <h2 className="mb-4">Appréciation Globale du Stagiaire</h2>
            <div className="mt-3 mb-5 text-left">
                <span className="text-danger font-weight-bold">* = champ obligatoire</span>
            </div>
            <div className="text-left mt-3">
                <label htmlFor="expectationResult" className="mb-0 mt-3">Les habiletés du stagiaire et vos attentes: <span className="text-danger font-weight-bold">*</span></label>
            </div>
            <select defaultValue="default" className="form-control" name="expectationResult" onChange={onAppreciationChanged}>
                <option className="text-center" value="default">Veuillez choisir une valeur</option>
                <option className="text-center" value="">Les habiletés démontrées dépassent de beaucoup les attentes</option>
                <option className="text-center" value="Totalement en accord">Les habiletés démontrées dépassent les attentes</option>
                <option className="text-center" value="Plutôt en accord">Les habiletés démontrées répondent pleinement aux attentes</option>
                <option className="text-center" value="Plutôt en désaccord">Les habiletés démontrées répondent partiellement aux attentes</option>
                <option className="text-center" value="N/A*">Les habiletés démontrées ne répondent pas aux attentes</option>
            </select>
            <div className="text-left mt-3">
                <label htmlFor="appreciations" className="mb-0 mt-3 ml-1">Précisez votre appréciation: <span className="text-danger font-weight-bold">*</span></label>
                <textarea type="text" className="form-control" id="appreciations" name="appreciations" rows="3" placeholder="Précizez votre appréciation du stagiaire." onChange={onAppreciationChanged} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="isDiscussed" className="mb-0 mt-3 ml-1">Cette évaluation a été discutée avec le stagiaire: <span className="text-danger font-weight-bold">*</span></label>
                <select defaultValue="default" className="form-control" name="isDiscussed" id="isDiscussed" onChange={onAppreciationChanged}>
                    <option className="text-center" value="default">Veuillez choisir une valeur</option>
                    <option className="text-center" value={true}>Oui</option>
                    <option className="text-center" value={false}>Non</option>
                </select>
            </div>
        </div>
    )
}

export default EvaluationAppreciations
