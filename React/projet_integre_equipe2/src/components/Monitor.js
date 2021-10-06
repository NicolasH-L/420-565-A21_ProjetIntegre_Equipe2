import React from 'react'
import MonitorInternshipOffer from './MonitorInternshipOffer'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
const Monitor = () => {
    // le useHistory n'est gardé que par session d'onglet, donc il faudra stocker le user 
    const history = useHistory()
    const monitor = history.location.state
    // ligne pour le bouton log out
    // history.replace({...history.location.state, undefined})
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
                <MonitorInternshipOffer />
            </div >
        )
}

export default Monitor
