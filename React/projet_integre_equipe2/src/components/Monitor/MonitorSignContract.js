import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from '../MonitorNavbar'

const MonitorSignContract = () => {
    const [contracts, setContracts] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    // Todo convert to historyState.monitor
    const monitor = historyState

    useEffect(() => {
        const getAllContracts = async () =>{
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer)
        }
        getAllContracts()
    }, [])

    const fetchContracts = async () =>{
        const res = await fetch(`http://localhost:8888/contract/get-all-by-monitor/${monitor.id}`)
        return await res.json()
    }

    return (
        <div className="grad">
            <MonitorNavbar/>
            <h2 className="text-center">Mes contrats</h2>
            <div className="container">
                
            </div>
        </div>
    )
}

export default MonitorSignContract
