import React from 'react'
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
        return await res.json()
    }

    return (
        <div>
            <AdminIntershipOffer verifyMonitorExists={monitorEmailExists} onAdd={addOffer}/>
        </div>
    )
}

export default Admin
