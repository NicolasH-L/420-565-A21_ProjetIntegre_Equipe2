import React from 'react'
import { useHistory } from 'react-router'
import StudentInternshipFoundStatus from './StudentInternshipFoundStatus';
import StudentInterviewDateStatus from './StudentInterviewDateStatus';
import StudentSearchingStatus from './StudentSearchingStatus';
import '../Form.css'

const StudentStatus = () => {
    const history = useHistory();
    const historyState = history.location.state
    const student = historyState.student
    const badgeColor = student.currentStatus === "Stage trouvé" ? 'badge-success' : 'badge-primary'
    const interviewStatus = student.currentStatus === "En attente" ? " d'une entrevue" : ""

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
            <h2 className="text-center text-light">Bienvenue {student.firstName + " " + student.lastName}</h2>
            <div className="d-flex justify-content-center">
                <div className="card text-center shadow my-5 reactivescreen">
                    <div className="card-header font-weight-bold">
                        <h5>
                            Votre statut actuel: <span className={`badge ${badgeColor}`} >{student.currentStatus + interviewStatus}</span>
                        </h5>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Avez-vous une date d'entrevue ou trouvé un stage?</h5>
                        <p className="card-text">Cliquez sur l'option qui vous correspond!</p>
                        <div className="d-flex justify-content-center">
                            <StudentSearchingStatus onAddStudent={addStudent} />
                            <StudentInterviewDateStatus onAddStudent={addStudent}/>
                            <StudentInternshipFoundStatus onAddStudent={addStudent} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentStatus
