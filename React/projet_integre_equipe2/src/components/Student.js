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

    return (
        <div className="grad">
            <StudentNavbar useStudent={historyState} />
            <div className="d-flex justify-content-center">
                <div className="container my-5">
                    <h1 className="text-center mb-5">Bienvenu {userStudent.firstName} {userStudent.lastName}</h1>
                    <StudentAppliedOffersList />
                </div>
            </div>
        </div>
    )
}

export default Student
