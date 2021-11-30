import React from 'react'
import { useState, useEffect } from 'react'
import EvaluationCapability from './EvaluationCapability'

const EvaluationBehavior = ({ newBehavior, submitState }) => {
    const [behavior, setBehavior] = useState(null)
    const defaultValue = "default"

    useEffect(() => {
        if (behavior === null)
            setBehavior(newBehavior)
    }, [behavior, submitState.isSubmitValid])

    const onChangeMethod = (e) => {
        e.preventDefault()
        if (e.target.value === defaultValue)
            return
        behavior[e.target.name] = e.target.value
    }

    return (
        <div className="mt-5">
            {behavior !== null ?
                <>
                    <h2 className="mt-5" key={behavior.capabilities}>{behavior.header}</h2>
                    <h5 className="mt-2">{behavior.subHeader}</h5>
                    <div className="my-0 text-left">
                        <span className="text-danger font-weight-bold">* = champ obligatoire</span>
                    </div>
                    {behavior.capabilities.map(
                        capability => (
                            <div className="text-left" key={capability.capability}>
                                <EvaluationCapability newCapability={capability} submitState={submitState} />
                            </div>
                        )
                    )}
                    <div className="text-left mt-3">
                        <label htmlFor="comments" className="mb-0 mt-3 ml-1">Commentaires:</label>
                        <textarea type="text" className="form-control" id="comments" name="comments" rows="3" placeholder="Précisez-vos commentaires, s'il y a lieu." onChange={onChangeMethod} />
                    </div>
                    <div className="mt-3 text-left">
                        <span className="font-weight-bold">* N/A = non applicable</span>
                    </div>
                </>
                : ""}
        </div>
    )
}

export default EvaluationBehavior
