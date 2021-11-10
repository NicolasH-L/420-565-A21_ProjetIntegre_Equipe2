import React from 'react'
import { useHistory } from 'react-router'
import StudentNavbar from '../StudentNavbar';
import StudentInternshipFindedStatus from './StudentInternshipFindedStatus';
import StudentInterviewDateStatus from './StudentInterviewDateStatus';
import StudentSearchingStatus from './StudentSearchingStatus';

const StudentStatus = () => {
    const history = useHistory();
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
        <div className="grad">
            <StudentNavbar useStudent={student}/>
            <h2 className="text-center">Bienvenue {student.firstName + " " + student.lastName}</h2>
            <div className="d-flex justify-content-center">
                <div className="card text-center shadow w-50 my-5">
                    <div className="card-header font-weight-bold">
                        Votre statut actuel: <p className="text-success">{student.currentStatus}</p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Avez-vous une date d'entevue ou trouvé un stage?</h5>
                        <p className="card-text">Cliquez sur l'option qui vous correspond!</p>
                        <div className="d-flex justify-content-center">
                            <StudentSearchingStatus />
                            <StudentInterviewDateStatus />
                            <StudentInternshipFindedStatus onAddStudent={addStudent}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentStatus
