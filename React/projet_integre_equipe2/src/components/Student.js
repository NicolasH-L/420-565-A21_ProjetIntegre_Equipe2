import React from 'react'
import { useHistory } from 'react-router-dom'
import StudentUploadCV from './StudentUploadCV'
import StudentDocuments from './StudentDocuments'
import { useEffect } from 'react'
import StudentNavbar from './StudentNavbar'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state

    return (
        <div>
            <StudentNavbar useStudent={historyState} />
        </div>
    )
}

export default Student
