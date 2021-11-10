import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import StudentAppliedOffersList from '../Student/StudentAppliedOffersList'

const StudentInterviewDateStatus = () => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student

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

    return (
        <div>
            <a href="#" className="btn btn-primary mx-2" data-toggle="modal" data-target="#studentInterviewDateStatus">
                <i className="fas fa-calendar-alt mr-2"></i> Date d'entrevue
            </a>
            <div className="modal fade" id="studentInterviewDateStatus" tabIndex="-1" aria-labelledby="studentInterviewDateStatusLabel" aria-hidden="true">
                <div className="modal-xl modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="studentInterviewDateStatusLabel">Ajouter une date d'entrevue et mettre son statut "En attente"</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <StudentAppliedOffersList onSetDate={addStudent} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentInterviewDateStatus
