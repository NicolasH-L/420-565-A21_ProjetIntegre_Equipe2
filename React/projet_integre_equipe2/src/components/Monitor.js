import React from 'react'
import MonitorInternshipOffer from './MonitorInternshipOffer'

const Monitor = () => {
    const addOffer = async (offer) => {
        const result = await fetch('http://localhost:8888/offer/saveOffer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await result.json()
    }

    return (
        <div>
            <MonitorInternshipOffer onAdd={addOffer} />
        </div>
    )
}

export default Monitor
