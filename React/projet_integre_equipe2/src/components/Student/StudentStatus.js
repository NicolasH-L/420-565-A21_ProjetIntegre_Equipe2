import React from 'react'
import { useHistory } from 'react-router'
import StudentNavbar from '../StudentNavbar';
import StudentInterviewDateStatus from './StudentInterviewDateStatus';
import StudentSearchingStatus from './StudentSearchingStatus';

const StudentStatus = () => {
    const history = useHistory();
    const historyState = history.location.state
    const student = historyState.student

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
                            <a href="#" className="btn btn-primary mx-2">
                                <i className="fas fa-handshake mr-2"></i> Stage trouvé
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentStatus
