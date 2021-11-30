import React from 'react'
import DownloadButton from '../DownloadButton'
import EvaluationPdf from './EvaluationPdf'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'
import DocumentMethods from '../Document/DocumentMethods'

const EvaluationPdfModalView = ({ evaluation }) => {

    return (
        <div className="d-flex">
            <div>
                <button className="btn btn-primary" data-toggle="modal" data-target={"#evaluation" + evaluation.idEvaluation}>
                    <span className="hideButtonText">Consulter l'évaluation</span>
                    <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                </button>
                <div className="modal fade" id={"evaluation" + evaluation.idEvaluation} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <EvaluationPdf evaluationState={evaluation} />
                            <div className="modal-footer mt-4">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DownloadButton byte={DocumentMethods.base64ToArrayBytes(evaluation.pdf)} documentName={evaluation.evaluationName} />
        </div>
    )
}

export default EvaluationPdfModalView
