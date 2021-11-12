import React from 'react'
import { useState, useEffect } from 'react'
import Evaluations from '../Constants/Evaluations'
import RatingChoices from './RatingChoices'

const Behaviors = () => {
    const [behaviors, setBehaviors] = useState(null)
    const [behavior, setBehavior] = useState({
        header: "", subheader: "", capabilities: [], comments: ""
    })

    useEffect(() => {

        setBehaviors(Evaluations.behaviors())
        console.log(Evaluations.behaviors())
    }, [])

    const displayBehaviors = () => {
        return (
            <>
            {behaviors.map(behavior => (
                <>
                    <h2 className="mt-5" key={behavior.capabilities}>{behavior.header}</h2>
                    <h5 className="mt-2">{behavior.subHeader}</h5>
                    {behavior.capabilities.map(
                        capability => (
                            <>
                            <label htmlFor="" className="mt-3" key={behavior.capabilities}>{capability}</label>
                            <RatingChoices onChangeMethod={""} name={""}/>
                            </>
                        )
                    )}
                </>
                ))}
            </>
        )
    }

    return (
        <div className="form-group">
            {behaviors !== null ?
                displayBehaviors()
            : ""}
        </div>
    )
}

export default Behaviors
