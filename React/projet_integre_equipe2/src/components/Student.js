import React from 'react'
import { useHistory } from 'react-router-dom'
import StudentUploadCV from './StudentUploadCV'
import StudentDocuments from './StudentDocuments'
import { useEffect } from 'react'

const Student = () => {
    const history = useHistory()

    useEffect(() => {
       /* history.push("/StudentUploadCV",history.location.state) */
        history.push("/StudentDocuments",history.location.state)
    }, [])
    

    return (
        <div>
            
        </div>
    )
}

export default Student
