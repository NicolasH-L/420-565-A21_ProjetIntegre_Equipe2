import React from 'react'
import { useState, useEffect } from 'react'
import { RegexPattern } from '../RegexPattern'
import Error from '../Constants/Error'

const EvaluationReHireIntern = ({ monitor, setState, submitState, offer }) => {

    const [reHireIntern, setReHireIntern] = useState({ hireAgain: "", description: "", name: "", signature: "", jobTitle: "", date: "" })
    const [error, setError] = useState({ hireAgain: false, description: false })
    const defaultValue = "default"
    const hireAgainName = "hireAgain"
    const descriptionName = "description"

    useEffect(() => {
        if (reHireIntern.date === "" && reHireIntern.name === "" && reHireIntern.signature === "" && reHireIntern.jobTitle == "") {
            reHireIntern.date = getToday()
            reHireIntern.name = monitor.firstName + " " + monitor.lastName
            reHireIntern.signature = monitor.firstName + " " + monitor.lastName
            reHireIntern.jobTitle = offer.jobTitle
        }
        setState(reHireIntern)
        if (submitState.isSubmit) {
            verifyInputValuesOnSubmit()
        }

    }, [reHireIntern, submitState.isSubmit])

    const verifyInputValuesOnSubmit = () => {
        let pattern = new RegExp(RegexPattern.getPatternGeneral())

        let isReHireValid = (reHireIntern.hireAgain === "" || reHireIntern.hireAgain === defaultValue)
        isReHireValid ? setErrorByNameAndHasError(hireAgainName, true) : setErrorByNameAndHasError(hireAgainName, false)

        let isDescriptionValid = (reHireIntern.description === "" || (reHireIntern.description !== "" && !pattern.test(reHireIntern.description)))
        isDescriptionValid ? setErrorByNameAndHasError(descriptionName, true) : setErrorByNameAndHasError(descriptionName, false)
    }

    const setErrorByNameAndHasError = (name, hasError) => {
        error[name] = hasError
        setError({ ...error, [name]: hasError })
    }

    const getToday = () => {
        return new Date().toLocaleString("en-CA", { year: "numeric", month: "numeric", day: "numeric" })
    }

    const onReHireInternChanged = (e) => {
        e.preventDefault()
        if (validateInputValue(e))
            setReHireIntern({ ...reHireIntern, [e.target.name]: e.target.value })
    }

    const validateInputValue = (e) => {
        let isValid = true
        if (e.target.name === hireAgainName && e.target.value === defaultValue) {
            isValid = false
        } else if ((e.target.name === descriptionName)) {
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
        reHireIntern[e.target.name] = ""
        setReHireIntern({ ...reHireIntern, [e.target.name]: "" })
        setError({ ...error, [e.target.name]: true })
    }

    const resetInputError = (e) => {
        Error.setErrorInputStyles(e, false)
        setError({ ...error, [e.target.name]: false })
    }

    return (
        <div className="mt-5">
            <div className="mt-3 text-left">
                <label htmlFor={hireAgainName}>L’entreprise aimerait accueillir cet/cette élève pour son prochain stage : <span className="text-danger font-weight-bold">*</span></label>
                <select defaultValue={defaultValue} className="form-control text-center" name={hireAgainName} onChange={onReHireInternChanged} style={Error.getInputStyles(error.hireAgain)}>
                    <option value={defaultValue}>Veuillez choisir une valeur</option>
                    <option value="yes">Oui</option>
                    <option value="no">Non</option>
                    <option value="maybe">Peut-être</option>
                </select>
            </div>
            <div className="text-left mt-3">
                <label htmlFor={descriptionName} className="mb-0 mt-3 ml-1">La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage? <span className="text-danger font-weight-bold">*</span></label>
                <textarea type="text" className="form-control" id={descriptionName} name={descriptionName} rows="3" placeholder="Précisez en détails" onChange={onReHireInternChanged} style={Error.getInputStyles(error.description)} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="name">Nom: </label>
                <input className="form-control text-center" type="text" name="name" value={reHireIntern.name} readOnly />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="jobTitle">Fonction:</label>
                <input className="form-control text-center" type="text" name="jobTitle" value={reHireIntern.jobTitle} readOnly />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="signature">Signature: </label>
                <input className="form-control text-center" type="text" name="signature" value={reHireIntern.signature} readOnly />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="date">Date: </label>
                <input className="form-control text-center" type="text" name="date" value={reHireIntern.date} readOnly />
            </div>
        </div>
    )
}

export default EvaluationReHireIntern
