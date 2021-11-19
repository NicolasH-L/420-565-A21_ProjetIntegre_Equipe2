import React from 'react'

const EvaluationRecipient = ({ contract }) => {

    return (
        <>
            <h4 className="mt-5">Veuillez retourner ce formulaire à </h4>
            <div>{contract.adminSignature}</div>
            <div className="mt-0">Cégep André-Laurendeau</div>
            <div className="mt-0">1111, rue Lapierre</div>
            <div className="mt-0">LASALLE (Québec)</div>
            <div className="mt-0">H8N 2J4</div>
            <div className="mt-0">Numéro de télécopieur : (514) 364-7130</div>
        </>
    )
}

export default EvaluationRecipient
