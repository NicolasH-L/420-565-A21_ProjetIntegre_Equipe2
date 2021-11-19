import React from 'react'
import DownloadButton from '../DownloadButton'
import EvaluationPdf from './EvaluationPdf'

const EvaluationPdfModalView = ({ evaluation }) => {
    const base64ToArrayBuffer = (base64) => {
        var binaryString = window.atob(base64)
        var binaryLen = binaryString.length
        var bytes = new Uint8Array(binaryLen)
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i)
            bytes[i] = ascii
        }
        return bytes
    }

    return (
        <div>
            <button className="btn btn-primary mr-5" data-toggle="modal" data-target={"#evaluation" + evaluation.idEvaluation}>Consulter l'évaluation</button>
            <div className="modal fade" id={"evaluation" + evaluation.idEvaluation} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <EvaluationPdf evaluationState={evaluation}/>
                        <div className="modal-footer mt-4">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
            <DownloadButton byte={base64ToArrayBuffer(evaluation.pdf)} documentName={evaluation.evaluationName} />
        </div>
    )
}

export default EvaluationPdfModalView
