import React from 'react'
import { useState, useEffect } from 'react'
import RatingChoices from './RatingChoices'

const EvaluationCapability = ({ newCapability, submitState }) => {
    const [error, setError] = useState({ isEmpty: "" })
    const [capability, setCapability] = useState(null)

    useEffect(() => {
        setCapability(newCapability)
        setError({ ...error, isEmpty: false })
    }, [])

    //TODO error messages
    //TODO scan for missing fields onSubmit

    const setCapabilityValue = (e) => {
        e.preventDefault()
        if (e.target.value === "default") {
            e.target.style.borderColor = "red"
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red"
            submitState.isSubmitValid = false
            error.isEmpty = true
            return
        }
        
        if(error.isEmpty){
            e.target.style.borderColor = "#ced4da"
            e.target.style.boxShadow = "none"
            error.isEmpty = false
        }
        
        console.log(capability.capability)
        console.log(e.target.value)
        capability.value = e.target.value
    }

    return (
        <>
            {capability !== null ?
                <>
                    <label htmlFor="" className="mt-5" name="">{capability.capability} <span className="text-danger font-weight-bold">*</span></label>
                    <RatingChoices newName="value" onChangeMethod={setCapabilityValue} />
                </>
                : ""}
        </>
    )
}

export default EvaluationCapability
