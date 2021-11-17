import React from 'react'
import { useState, useEffect } from 'react'


const EvaluationReHireIntern = ({ monitor, setState, submitState }) => {
    const [reHireIntern, setReHireIntern] = useState({ hireAgain: "", description: "", name: "", signature: "", jobTitle: "", date: "" })
    const [error, setError] = useState({ hireAgain: "", description: "", name: "", signature: "", jobTitle: "" })
    const defaultValue = "default"

    useEffect(() => {
        if (reHireIntern.date === "" && reHireIntern.name === "" && reHireIntern.signature === "") {
            reHireIntern.date = getToday()
            reHireIntern.name = monitor.firstName + " " + monitor.lastName
            reHireIntern.signature = monitor.firstName + " " + monitor.lastName
        }
        setState(reHireIntern)
        console.log("modified rehireIntern in the useffect")
    }, [reHireIntern])

    const getToday = () => {
        return new Date().toLocaleString("en-CA", { year: "numeric", month: "numeric", day: "numeric" })
    }

    //TODO error messages
    //TODO scan for missing fields onSubmit

    const onReHireInternChanged = (e) => {
        e.preventDefault()
        if (validateInputValue(e) === false) {
            submitState.isSubmitValid = false
            return
        }
        setReHireIntern({ ...reHireIntern, [e.target.name]: e.target.value })
    }

    const validateInputValue = (e) => {
        let isValid = true
        if (e.target.name === "hireAgain" && e.target.value === "default") {
            isValid = false
        }

        if (!isValid)
            setError({ ...error, [e.target.name]: e.target.value })

        return isValid
    }

    return (
        <div className="mt-5">
            <h5>L’ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN STAGE :</h5>
            <div className="mt-3 mb-5 text-left">
                <span className="text-danger font-weight-bold">* = champ obligatoire</span>
            </div>
            <select defaultValue="default" className="form-control" name="hireAgain" onChange={onReHireInternChanged} id="">
                <option className="text-center" value="default">Veuillez choisir une valeur</option>
                <option className="text-center" value="yes">Oui</option>
                <option className="text-center" value="no">Non</option>
                <option className="text-center" value="maybe">Peut-être</option>
            </select>
            <div className="text-left mt-3">
                <label htmlFor="description" className="mb-0 mt-3 ml-1">La formation technique du stagiaire était-elle suffisante pour accomplir le mandat de stage? <span className="text-danger font-weight-bold">*</span></label>
                <textarea type="text" className="form-control" id="description" name="description" rows="3" placeholder="Précisez en détails" onChange={onReHireInternChanged} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="name">Nom: </label>
                <input className="form-control text-center" type="text" name="name" value={reHireIntern.name} readOnly />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="jobTitle">Fonction: <span className="text-danger font-weight-bold">*</span></label>
                <input className="form-control text-center" type="text" name="jobTitle" placeholder="Entrez la fonction" onChange={onReHireInternChanged} />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="signature">Signature: </label>
                <input className="form-control text-center" type="text" name="signature" value={reHireIntern.signature} readOnly />
            </div>
            <div className="text-left mt-3">
                <label htmlFor="date">Téléphone du stagiaire: </label>
                <input className="form-control text-center" type="text" name="date" value={reHireIntern.date} readOnly />
            </div>
        </div>
    )
}

export default EvaluationReHireIntern
