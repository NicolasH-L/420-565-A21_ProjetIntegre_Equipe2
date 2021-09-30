import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import AdminIntershipOffer from './AdminIntershipOffer'

const Admin = () => {

    const addOffer = async (offer) => {
        const result = await fetch('http://localhost:8888/admin/addOffer',
        {
          method:'POST',
          headers:{
            'Content-type': 'application/json'
          },
            body: JSON.stringify(offer)
        })
        return await result.json()
      }

    return (
        <div>
            <AdminIntershipOffer onAdd={addOffer}/>
        </div>
    )
}

export default Admin
