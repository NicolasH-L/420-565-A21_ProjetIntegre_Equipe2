import React from 'react'
import MonitorInternshipOffer from './MonitorInternshipOffer'
import { useHistory } from 'react-router-dom'

const Monitor = () => {
    const historyState = useHistory().location.state
    console.log(historyState)

    return (
        <div>
            <MonitorInternshipOffer />
        </div>
    )
}

export default Monitor
