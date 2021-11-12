import React from 'react'
import { useState, useEffect } from 'react'
import StudentEvaluationForm from './StudentEvaluationForm'

const StudentEvaluationModalView = ({ contractProp, isModeEdit }) => {
    const [contract, setContract] = useState(null)
    const isEdit = isModeEdit
    useEffect(() => {
        setContract(contractProp)
    }, [])

    return (
        <div>
            {contract !== null
                ?
                <>
                    <button className="btn btn-primary" data-toggle="modal" data-target={"#internship" + contract.internship.idInternship}>Consulter</button>
                    <div className="modal fade" id={"internship" + contract.internship.idInternship} tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <StudentEvaluationForm contractProp={contract} isModeEdit={isEdit}/>
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

export default StudentEvaluationModalView
