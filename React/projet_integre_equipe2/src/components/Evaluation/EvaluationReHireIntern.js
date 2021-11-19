import React from 'react'
import { useState, useEffect } from 'react'
import { RegexPattern } from '../RegexPattern'

const EvaluationReHireIntern = ({ monitor, setState, submitState, offer }) => {

    const [reHireIntern, setReHireIntern] = useState({ hireAgain: "", description: "", name: "", signature: "", jobTitle: "", date: "" })
    const [error, setError] = useState({ hireAgain: false, description: false, name: false, signature: false, jobTitle: false })
    const defaultValue = "default"

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
        if (reHireIntern.hireAgain === "" || reHireIntern.hireAgain === defaultValue) {
            error.hireAgain = true
            setError({ ...error, hireAgain: true })
        } else if (reHireIntern.hireAgain !== "" && reHireIntern.hireAgain !== defaultValue) {
            error.hireAgain = false
            setError({ ...error, hireAgain: false })
        }

        if (reHireIntern.description === "" || (reHireIntern.description !== "" && !pattern.test(reHireIntern.description))) {
            error.description = true
            setError({ ...error, description: true })
        } else if (reHireIntern.description !== "" && pattern.test(reHireIntern.description)) {
            error.description = false
            setError({ ...error, description: false })
        }

        if (reHireIntern.jobTitle === "" || (reHireIntern.jobTitle !== "" && !pattern.test(reHireIntern.jobTitle))) {
            error.jobTitle = true
            setError({ ...error, jobTitle: true })
        } else if (reHireIntern.jobTitle !== "" && pattern.test(reHireIntern.jobTitle)) {
            error.jobTitle = false
            setError({ ...error, jobTitle: false })
        }
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
        if (e.target.name === "hireAgain" && e.target.value === "default") {
            isValid = false
        } else if ((e.target.name === "description")) {
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
        // TODO start
        reHireIntern[e.target.name] = ""
        setReHireIntern({ ...reHireIntern, [e.target.name]: "" })
        // TODO end
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
            <div className="mt-3 text-left">
                <label htmlFor="hireAgain">L’entreprise aimerait accueillir cet/cette élève pour son prochain stage : <span className="text-danger font-weight-bold">*</span></label>
                <select defaultValue={defaultValue} className="form-control text-center" name="hireAgain" onChange={onReHireInternChanged} style={getInputStyles(error.hireAgain)}>
                    <option value={defaultValue}>Veuillez choisir une valeur</option>
                    <option value="yes">Oui</option>
                    <option value="no">Non</option>
                    <option value="maybe">Peut-être</option>
                </select>
            </div>
            <div className="text-left mt-3">
                <label htmlFor="description" className="mb-0 mt-3 ml-1">La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage? <span className="text-danger font-weight-bold">*</span></label>
                <textarea type="text" className="form-control" id="description" name="description" rows="3" placeholder="Précisez en détails" onChange={onReHireInternChanged} style={getInputStyles(error.description)} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="name">Nom: </label>
                <input className="form-control text-center" type="text" name="name" value={reHireIntern.name} readOnly />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="jobTitle">Fonction:</label>
                <input className="form-control text-center" type="text" name="jobTitle"  value={reHireIntern.jobTitle} readOnly/>
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
