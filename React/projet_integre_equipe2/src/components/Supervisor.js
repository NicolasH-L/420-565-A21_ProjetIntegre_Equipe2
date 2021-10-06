import React from 'react'
import { useHistory } from 'react-router-dom'

const Supervisor = () => {
    const history = useHistory()
    console.log(history.location.state)
    return (
        <div>
            
        </div>
    )
}

export default Supervisor
