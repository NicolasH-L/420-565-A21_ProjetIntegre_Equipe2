import React from 'react'
import { useState, useEffect } from 'react'
import EvaluationCapabilityRatingChoices from './EvaluationCapabilityRatingChoices'
import Error from '../Constants/Error'

const EvaluationCapability = ({ newCapability, submitState }) => {
    const [error, setError] = useState({ hasError: false })
    const [capability, setCapability] = useState(null)
    const defaultValue = "default"

    useEffect(() => {
        setCapability(newCapability)
        if (error.hasError === "") {
            setError({ ...error, hasError: false })
        }

        if (submitState.isSubmit) {
            verifyInputValueOnSubmit()
        }
    }, [submitState.isSubmit, error.hasError])

    const verifyInputValueOnSubmit = () => {
        if (capability.value === "" || capability.value === defaultValue){
            error.hasError = true
            setError({...error, hasError : true})
        }
    }

    const setCapabilityValue = (e) => {
        e.preventDefault()
        if (e.target.value === defaultValue) {
            capability[e.target.name] = ""
            setCapability({...capability, [e.target.name]: ""})
            error.hasError = true
            setError({...error, hasError: true})
            return
        }

        if (error.hasError) {
            Error.setErrorInputStyles(e, false)
            error.hasError = false
        }

        capability.value = e.target.value
        setCapability({ ...capability, [e.target.name]: e.target.value })
    }

    return (
        <>
            {capability !== null ?
                <>
                    <label htmlFor="value" className="mt-5">{capability.capability} <span className="text-danger font-weight-bold">*</span></label>
                    <EvaluationCapabilityRatingChoices newName="value" onChangeMethod={setCapabilityValue} errorState={error}/>
                </>
                : ""}
        </>
    )
}

export default EvaluationCapability
