import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const StudentSearchingStatus = ({ onAddStudent }) => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const location = useLocation()
    const enRecherche = "En recherche"
    const stageTrouve = "Stage trouvé"

    const setStudentToSearching = async () => {
        student.currentStatus = enRecherche
        onAddStudent(student).then((data) => history.push(location.pathname, { student: data }))
    }

    return (
        <div>
            <button
                href="#"
                className="btn btn-primary mx-2"
                data-toggle="modal"
                data-target="#studentSearchStatus"
                disabled={student.currentStatus === enRecherche ? true : false}
                hidden={student.currentStatus === stageTrouve ? true : false}>
                <i className="fas fa-hourglass-start mr-2"></i> En recherche
            </button>
            <div className="modal fade" id="studentSearchStatus" tabIndex="-1" aria-labelledby="studentSearchStatusLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="studentSearchStatusLabel">Passer le statut à "En recherche"</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Souhaitez-vous passer votre statut à "En recherche"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => { setStudentToSearching() }}
                                disabled={student.currentStatus === enRecherche ? true : false}>
                                Modifier le statut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSearchingStatus
