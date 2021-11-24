import React from 'react'
import { useState, useEffect } from 'react'
import EvaluationForm from './EvaluationForm'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'

const EvaluationModalView = ({ contractProp }) => {
    const [contract, setContract] = useState(null)

    useEffect(() => {
        setContract(contractProp)
    }, [])

    return (
        <div>
            {contract !== null
                ?
                <>
                    <button className="btn btn-primary mr-5" data-toggle="modal" data-target={"#internship" + contract.internship.idInternship}>
                        <span className="hideButtonText">Évaluer stagiaire</span>
                        <span className="hideButtonIcon">Évaluer <i className="fas fa-user-graduate"></i></span>
                    </button>
                    <div className="modal fade" id={"internship" + contract.internship.idInternship} tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <EvaluationForm contractProp={contract} />
                                <div className="modal-footer mt-4">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : ""}
        </div>
    )
}

export default EvaluationModalView
