import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import StudentInternshipFoundStatus from './StudentInternshipFoundStatus';
import StudentInterviewDateStatus from './StudentInterviewDateStatus';
import StudentSearchingStatus from './StudentSearchingStatus';
import '../Form.css'

const StudentStatus = () => {
    const history = useHistory();
    const historyState = history.location.state
    const student = historyState.student
    const location = useLocation()
    const [isActualSession, setIsActualSession] = useState(true)

    const badgeColor = student.currentStatus === "Stage trouvé" ? 'badge-success' : 'badge-primary'
    const interviewStatus = student.currentStatus === "En attente" ? " d'une entrevue" : ""

    useEffect(() => {
        fetchSessions().then((data) => getActualSession(data))
    }, [student.actualSession])

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

    const getActualSession = async (sessionsFromServer) => {
        if (sessionsFromServer[sessionsFromServer.length - 1].session === student.actualSession) {
            setIsActualSession(true)
        } else {
            setIsActualSession(false)
        }
    }

    const fetchSessions = async () => {
        const res = await fetch('http://localhost:8888/sessions/get-all-sessions')
        return await res.json()
    }

    return (
        <div>
            <h2 className="text-center text-light">Bienvenue {student.firstName + " " + student.lastName}</h2>
            <div className="d-flex justify-content-center">
                {isActualSession ?
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
                                <StudentInterviewDateStatus onAddStudent={addStudent} />
                                <StudentInternshipFoundStatus onAddStudent={addStudent} />
                            </div>
                        </div>
                    </div>
                    : <h5 className="text-center text-warning">Profil de stage non disponible avec cette session</h5>
                }
            </div>
        </div>
    )
}

export default StudentStatus
