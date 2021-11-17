import React from 'react'
import { useEffect, useState } from 'react'

const RatingChoices = ({ onChangeMethod, newName }) => {

    const getChoices = () => {
        return (
            <select defaultValue="default" className="form-control" name={newName} onChange={onChangeMethod}>
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

export default RatingChoices
