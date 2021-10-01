import React from 'react'
import { useHistory } from 'react-router-dom'

const Student = () => {
    const history = useHistory()

    console.log(history.location.state)

    return (
        <div>
            
        </div>
    )
}

export default Student
