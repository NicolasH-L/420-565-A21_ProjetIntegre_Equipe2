import React from 'react'

const EvaluationCapabilityRatingChoices = ({ onChangeMethod, newName, errorState }) => {

    const getInputStyles = (errorValue) => {
        return errorValue === true ? { borderColor: 'red', boxShadow: '0 1px 1px red inset, 0 0 8px red' } : { borderColor: '#ced4da', boxShadow: 'none' }
    }

    const getChoices = () => {
        return (
            <select defaultValue="default" className="form-control" name={newName} onChange={onChangeMethod} style={getInputStyles(errorState.hasError)}>
                <option className="text-center" value="default">Veuillez choisir une valeur</option>
                <option className="text-center" value="Totalement en accord">Totalement en accord</option>
                <option className="text-center" value="Plutôt en accord">Plutôt en accord</option>
                <option className="text-center" value="Plutôt en désaccord">Plutôt en désaccord</option>
                <option className="text-center" value="N/A*">N/A*</option>
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
