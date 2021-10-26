import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    return (
        <div>
            <StudentNavbar useStudent={historyState} />
            
        </div>
    )
}

export default StudentSignContract
