import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const StudentSearchingStatus = () => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const location = useLocation()

    const addStudent = async (student) => {
        const result = await fetch('http://localhost:8888/students/register',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        return await result.json()
    }

    const setStudentToSearching = async () => {
        student.currentStatus = "En recherche"
        addStudent(student).then((data) => history.push(location.pathname, {student: data}))
    }

    return (
        <div>
            <a href="#" className="btn btn-primary mx-2" data-toggle="modal" data-target="#studentSearchStatus">
                <i className="fas fa-hourglass-start mr-2"></i> En recherche
            </a>
            <div className="modal fade" id="studentSearchStatus" tabIndex="-1" aria-labelledby="studentSearchStatusLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="studentSearchStatusLabel">Passer le statut au mode "En recherche"</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Souhaitez-vous passer votre statut à "En recherche"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { setStudentToSearching() }}>Modifier le statut</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSearchingStatus
