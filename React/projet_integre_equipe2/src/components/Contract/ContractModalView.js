import React from 'react'
import Contract from '../Contract/Contract'

const ContractModalView = ({ userPasswordProp, currentStatusProp, contractProp, viewerStatus }) => {
    const contract = contractProp
    const currentStatus = currentStatusProp
    const userPassword = userPasswordProp

    return (
        <div>
            <button className="btn btn-primary" data-toggle="modal" data-target={"#contract" + contract.idContract}>Consulter</button>
            <div className="modal fade" id={"contract" + contract.idContract} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <Contract passwordUser={userPassword} currentStatus={currentStatus}
                            contractProp={contract} viewerStatus={viewerStatus}/>
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
