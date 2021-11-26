import React from 'react'
import Contract from '../Contract/Contract'
import './../ResponsiveButtons.css'

const ContractModalView = ({ currentStatusProp, contractProp, signature }) => {
    return (
        <div>
            <button className="btn btn-primary mx-2" data-toggle="modal" data-target={"#contract" + contractProp.idContract}>
                <span className="hideButtonText">Consulter</span>
                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
            </button>
            <div className="modal fade" id={"contract" + contractProp.idContract} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <Contract currentStatus={currentStatusProp} contractProp={contractProp} signature={signature} />
                        <div className="modal-footer mt-4">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractModalView
