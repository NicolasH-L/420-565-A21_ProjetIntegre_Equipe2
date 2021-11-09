import React from 'react'
import { useHistory } from 'react-router'
import StudentNavbar from '../StudentNavbar';
import StudentSearchingStatus from './StudentSearchingStatus';

const StudentStatus = () => {
    const history = useHistory();
    const historyState = history.location.state
    const student = historyState.student

    return (
        <div className="grad">
            <StudentNavbar />
            <h2 className="text-center">Bienvenue {student.firstName + " " + student.lastName}</h2>
            <div className="d-flex justify-content-center">
                <div class="card text-center shadow w-50 my-5">
                    <div class="card-header font-weight-bold">
                        Votre statut actuel: <p className="text-success">{student.currentStatus}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Avez-vous une date d'entevue ou trouvé un stage?</h5>
                        <p class="card-text">Cliquez sur l'option qui vous correspond!</p>
                        <StudentSearchingStatus/>
                        <a href="#" class="btn btn-primary mx-2">
                            <i className="fas fa-calendar-alt mr-2"></i> Date d'entrevue
                        </a>
                        <a href="#" class="btn btn-primary mx-2">
                            <i className="fas fa-handshake mr-2"></i> Stage trouvé
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentStatus
