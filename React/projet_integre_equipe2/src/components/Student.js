import React from 'react'
import { useHistory } from 'react-router-dom'
import StudentUploadCV from './StudentUploadCV'
import { useEffect } from 'react'
import StudentNavbar from './StudentNavbar'

const Student = () => {
    const history = useHistory()

    // useEffect(() => {
    //     history.push("/StudentUploadCV",history.location.state)
    // }, [])
    

    return (
        <div>
            <StudentNavbar></StudentNavbar>
        </div>
    )
}

export default Student
