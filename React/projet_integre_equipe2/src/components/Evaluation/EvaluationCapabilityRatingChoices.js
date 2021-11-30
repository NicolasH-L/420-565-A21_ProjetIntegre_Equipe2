import React from 'react'
import Error from '../Constants/Error'

const EvaluationCapabilityRatingChoices = ({ onChangeMethod, newName, errorState }) => {

    const getChoices = () => {
        return (
            <select defaultValue="default" className="form-control" name={newName} onChange={onChangeMethod} style={Error.getInputStyles(errorState.hasError)}>
                <option className="text-center" value="default">Veuillez choisir une valeur</option>
                <option className="text-center" value="1">Totalement en accord</option>
                <option className="text-center" value="2">Plutôt en accord</option>
                <option className="text-center" value="3">Plutôt en désaccord</option>
                <option className="text-center" value="4">Totalement en désaccord</option>
                <option className="text-center" value="5">N/A*</option>
            </select>
        )
    }
    return (
        <>
            {getChoices("productivity")}
        </>
    )
}

export default EvaluationCapabilityRatingChoices
