import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import AdminIntershipOffer from './AdminIntershipOffer'

const Admin = () => {

    const addOffer = async (offer) => {
        const result = await fetch('http://localhost:8888/offer/saveOffer',
        {
          method:'POST',
          headers:{
            'Content-type': 'application/json'
          },
            body: JSON.stringify(offer)
        })
        return await result.json()
    }

    const monitorEmailExists = async(email) => {
        const res = await fetch(`http://localhost:8888/monitors/monitorEmailExists/${email}`)
        const data = await res.json()
        return data
    }

    return (
        <div>
            <AdminIntershipOffer onAdd={addOffer} verifyMonitorExists={monitorEmailExists}/>
        </div>
    )
}

export default Admin
