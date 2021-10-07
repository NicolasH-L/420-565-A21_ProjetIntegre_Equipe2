import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from './MonitorNavbar'

const Monitor = () => {
    const history = useHistory()
    const monitor = history.location.state
    useEffect(() => {
        console.log(monitor)
        if (monitor !== undefined)
            console.log(monitor)
        else
            history.push("/")
    }, [])

    if (history.location.state === undefined) {
        return null
    } else
        return (
            < div >
                <MonitorNavbar/>
            </div >
        )
}

export default Monitor
