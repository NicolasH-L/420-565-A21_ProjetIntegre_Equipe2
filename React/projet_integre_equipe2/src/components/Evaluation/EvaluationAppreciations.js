import React from 'react'
import { useState, useEffect } from 'react'
import Error from '../Constants/Error'

const EvaluationAppreciations = ({ setState, submitState }) => {
    const [appreciation, setAppreciation] = useState({ expectationResult: "", appreciations: "", isDiscussed: "" })
    const [error, setError] = useState({ expectationResult: false, appreciations: false, isDiscussed: false })
    const defaultValue = "default"
    const expectationResultName = "expectationResult"
    const appreciationsName = "appreciations"
    const isDiscussedName = "isDiscussed"

    useEffect(() => {
        setState(appreciation)
        if (submitState.isSubmit) {
            verifyInputValuesOnSubmit()
        }
    }, [appreciation, submitState.isSubmit])

    const verifyInputValuesOnSubmit = () => {

        let isExpectationValid = (appreciation.expectationResult === "" || appreciation.expectationResult === defaultValue)
        isExpectationValid ? setErrorByNameAndHasError(expectationResultName, true) : setErrorByNameAndHasError(expectationResultName, false)

        let isAppreciationsValid = (appreciation.appreciations === "" || (appreciation.appreciations !== ""))
        isAppreciationsValid ? setErrorByNameAndHasError(appreciationsName, true) : setErrorByNameAndHasError(appreciationsName, false)

        let isDiscussedValid = (appreciation.isDiscussed !== "")
        isDiscussedValid ? setErrorByNameAndHasError(isDiscussedName, false) : setErrorByNameAndHasError(isDiscussedName, true)
    }

    const setErrorByNameAndHasError = (name, hasError) => {
        error[name] = hasError
        setError({ ...error, [name]: hasError })
    }

    const onAppreciationChanged = (e) => {
        e.preventDefault()
        if (validateInputValue(e))
            setAppreciation({ ...appreciation, [e.target.name]: e.target.value })
    }

    const validateInputValue = (e) => {
        let isValid = true
        if (e.target.name === expectationResultName || e.target.name == isDiscussedName) {
            if (e.target.value === defaultValue) {
                isValid = false
            }
        } else if (e.target.name === appreciationsName) {
            if (e.target.value === "") {
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
        appreciation[e.target.name] = ""
        setAppreciation({ ...appreciation, [e.target.name]: "" })
        setError({ ...error, [e.target.name]: true })
    }

    const resetInputError = (e) => {
        Error.setErrorInputStyles(e, false)
        setError({ ...error, [e.target.name]: false })
    }

    return (
        <div className="mt-5">
            <h2 className="mb-4">Appréciation Globale du Stagiaire</h2>
            <div className="mt-3 mb-5 text-left">
                <span className="text-danger font-weight-bold">* = champ obligatoire</span>
            </div>
            <div className="text-left mt-3">
                <label htmlFor={expectationResultName} className="mb-0 mt-3">Les habiletés du stagiaire et vos attentes: <span className="text-danger font-weight-bold">*</span></label>
            </div>
            <select defaultValue={defaultValue} className="form-control text-center" name={expectationResultName} onChange={onAppreciationChanged} style={Error.getInputStyles(error.expectationResult)}>
                <option value={defaultValue}>Veuillez choisir une valeur</option>
                <option value="5">Les habiletés démontrées dépassent de beaucoup les attentes</option>
                <option value="4">Les habiletés démontrées dépassent les attentes</option>
                <option value="3">Les habiletés démontrées répondent pleinement aux attentes</option>
                <option value="2">Les habiletés démontrées répondent partiellement aux attentes</option>
                <option value="1">Les habiletés démontrées ne répondent pas aux attentes</option>
            </select>
            <div className="text-left mt-3">
                <label htmlFor={appreciationsName} className="mb-0 mt-3 ml-1">Précisez votre appréciation: <span className="text-danger font-weight-bold">*</span></label>
                <textarea type="text" className="form-control" id={appreciationsName} name={appreciationsName} rows="3" placeholder="Précizez votre appréciation du stagiaire." onChange={onAppreciationChanged} style={Error.getInputStyles(error.appreciations)} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor={isDiscussedName} className="mb-0 mt-3 ml-1">Cette évaluation a été discutée avec le stagiaire: <span className="text-danger font-weight-bold">*</span></label>
                <select defaultValue={defaultValue} className="form-control" name={isDiscussedName} id={isDiscussedName} onChange={onAppreciationChanged} style={Error.getInputStyles(error.isDiscussed)}>
                    <option className="text-center" value={defaultValue}>Veuillez choisir une valeur</option>
                    <option className="text-center" value={true}>Oui</option>
                    <option className="text-center" value={false}>Non</option>
                </select>
            </div>
        </div>
    )
}

export default EvaluationAppreciations
