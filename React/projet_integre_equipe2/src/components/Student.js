import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from './StudentNavbar'
import StudentAppliedOffersList from './Student/StudentAppliedOffersList'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [userStudent, setUserStudent] = useState([])

    useEffect(() => {
        setUserStudent(historyState)
    }, [])

    console.log(userStudent)

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
            <StudentNavbar useStudent={historyState} />
            <div className="d-flex justify-content-center">
                <div className="container my-5">
                    
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userStudent.currentStatus}
                        </button>
                        <div class="dropdown-menu">
                            <button className="dropdown-item" onClick={() => { setUserStudent({...userStudent, currentStatus: "En Recherche"}) }}>En recherche</button>
                            <button className="dropdown-item" onClick={() => { setUserStudent({...userStudent, currentStatus: "En attente"}) }} >En attente d'une entrevue</button>
                            <button className="dropdown-item" onClick={() => { setUserStudent({...userStudent, currentStatus: "Stage trouvée"}) }}>Stage trouvée</button>
                        </div>
                    </div>
                    <button onClick={() => { addStudent(userStudent) }}>Enregistrer</button>

                    <h1 className="text-center mb-5">Bienvenu {userStudent.firstName} {userStudent.lastName}</h1>
                    <StudentAppliedOffersList />
                </div>
            </div>
        </div>
    )
}

export default Student
