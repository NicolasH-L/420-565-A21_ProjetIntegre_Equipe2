import React from 'react'
import { useState, useEffect } from 'react'
import { RegexPattern } from '../RegexPattern'

const EvaluationAppreciations = ({ setState, submitState }) => {
    const [appreciation, setAppreciation] = useState({ expectationResult: "", appreciations: "", isDiscussed: "" })
    const [error, setError] = useState({ expectationResult: false, appreciations: false, isDiscussed: false })
    const defaultValue = "default"

    useEffect(() => {
        setState(appreciation)
        if (submitState.isSubmit) {
            verifyInputValuesOnSubmit()
        }
    }, [appreciation, submitState.isSubmit])

    const verifyInputValuesOnSubmit = () => {
        let pattern = new RegExp(RegexPattern.getPatternGeneral())
        if (appreciation.expectationResult === "" || appreciation.expectationResult === defaultValue) {
            error.expectationResult = true
            setError({ ...error, expectationResult: true })
        }
        else if (appreciation.expectationResult !== "" && appreciation.expectationResult !== defaultValue) {
            error.expectationResult = false
            setError({ ...error, expectationResult: false })
        }

        if (appreciation.appreciations === "" || (appreciation.appreciations !== "" && !pattern.test(appreciation.appreciations))) {
            error.appreciations = true
            setError({ ...error, appreciations: true })
        }
        else if (appreciation.appreciations !== "" && pattern.test(appreciation.appreciations)) {
            error.appreciations = false
            setError({ ...error, appreciations: false })
        }

        if (appreciation.isDiscussed === "") {
            error.isDiscussed = true
            setError({ ...error, isDiscussed: true })
        }
        else if (appreciation.isDiscussed !== "") {
            error.isDiscussed = false
            setError({ ...error, isDiscussed: false })
        }
    }

    const onAppreciationChanged = (e) => {
        e.preventDefault()
        if (validateInputValue(e))
            setAppreciation({ ...appreciation, [e.target.name]: e.target.value })
    }

    const validateInputValue = (e) => {
        let isValid = true
        if (e.target.name === "expectationResult" || e.target.name == "isDiscussed") {
            if (e.target.value === defaultValue) {
                isValid = false
            }
        } else if (e.target.name === "appreciations") {
            let pattern = new RegExp(RegexPattern.getPatternGeneral())
            if (!pattern.test(e.target.value) || e.target.value === "") {
                isValid = false
            }
        }

        if (!isValid) {
            displayInputError(e)
            return
        }
        if (error[e.target.name] !== false) {
            resetInputError(e)
            isValid = true
        }

        return isValid
    }

    const displayInputError = (e) => {
        // TODO remove this later
        console.log("input error")
        console.log(e.target.name)
        // TODO end of remove
        appreciation[e.target.name] = ""
        setAppreciation({...appreciation, [e.target.name]: ""})
        setError({ ...error, [e.target.name]: true })
    }

    const resetInputError = (e) => {
        e.target.style.borderColor = "#ced4da"
        e.target.style.boxShadow = "none"
        setError({ ...error, [e.target.name]: false })
    }

    const getInputStyles = (errorValue) => {
        return errorValue === true ? { borderColor: 'red', boxShadow: '0 1px 1px red inset, 0 0 8px red' } : { borderColor: '#ced4da', boxShadow: 'none' }
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
            {/* TODO might have to modify the value names for the document mapping ex: expectionResult-1, expectionResult-2, expectionResult-3, etc.  */}
            <select defaultValue={defaultValue} className="form-control text-center" name="expectationResult" onChange={onAppreciationChanged} style={getInputStyles(error.expectationResult)}>
                <option value={defaultValue}>Veuillez choisir une valeur</option>
                <option value="Les habiletés démontrées dépassent de beaucoup les attentes">Les habiletés démontrées dépassent de beaucoup les attentes</option>
                <option value="Les habiletés démontrées dépassent les attentes">Les habiletés démontrées dépassent les attentes</option>
                <option value="Les habiletés démontrées répondent pleinement aux attentes">Les habiletés démontrées répondent pleinement aux attentes</option>
                <option value="Les habiletés démontrées répondent partiellement aux attentes">Les habiletés démontrées répondent partiellement aux attentes</option>
                <option value="Les habiletés démontrées ne répondent pas aux attentes">Les habiletés démontrées ne répondent pas aux attentes</option>
            </select>
            <div className="text-left mt-3">
                <label htmlFor="appreciations" className="mb-0 mt-3 ml-1">Précisez votre appréciation: <span className="text-danger font-weight-bold">*</span></label>
                <textarea type="text" className="form-control" id="appreciations" name="appreciations" rows="3" placeholder="Précizez votre appréciation du stagiaire." onChange={onAppreciationChanged} style={getInputStyles(error.appreciations)} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="isDiscussed" className="mb-0 mt-3 ml-1">Cette évaluation a été discutée avec le stagiaire: <span className="text-danger font-weight-bold">*</span></label>
                <select defaultValue={defaultValue} className="form-control" name="isDiscussed" id="isDiscussed" onChange={onAppreciationChanged} style={getInputStyles(error.isDiscussed)}>
                    <option className="text-center" value={defaultValue}>Veuillez choisir une valeur</option>
                    <option className="text-center" value={true}>Oui</option>
                    <option className="text-center" value={false}>Non</option>
                </select>
            </div>
        </div>
    )
}

export default EvaluationAppreciations
