import React from 'react'
import { useHistory } from 'react-router-dom'
import StudentAppliedOffersList from './StudentAppliedOffersList'

const StudentInterviewDateStatus = ({onAddStudent}) => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const stageTrouve = "Stage trouvé"

    return (
        <div>
            <button
                href="#"
                className="btn btn-primary mx-2"
                data-toggle="modal"
                data-target="#studentInterviewDateStatus"
                hidden={student.currentStatus === stageTrouve ? true : false}>
                <i className="fas fa-calendar-alt mr-2"></i> Date d'entrevue
            </button>
            <div className="modal fade" id="studentInterviewDateStatus" tabIndex="-1" aria-labelledby="studentInterviewDateStatusLabel" aria-hidden="true">
                <div className="modal-xl modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="studentInterviewDateStatusLabel">Ajouter une date d'entrevue et mettre mon statut à "En attente"</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <StudentAppliedOffersList onSetDate={onAddStudent} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentInterviewDateStatus
