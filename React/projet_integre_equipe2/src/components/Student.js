import React from 'react'
import { useHistory } from 'react-router-dom'
import StudentNavbar from './StudentNavbar'
import StudentStatus from './Student/StudentStatus'
import Footer from './Footer'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student

    return (
        <div>
            <div className="grad">
                <StudentNavbar useStudent={student} />
                <StudentStatus />
            </div>
            <Footer/>
        </div>

    )
}

export default Student
