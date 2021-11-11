import React from 'react'
import { useHistory } from 'react-router-dom'
import StudentNavbar from './StudentNavbar'
import StudentStatus from './Student/StudentStatus'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student

    return (
        <div className="grad">
            <StudentNavbar useStudent={student} />
            <StudentStatus/>
        </div>
    )
}

export default Student
