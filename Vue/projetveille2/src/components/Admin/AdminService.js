class AdminService {
    async getAllMonitors(){
        const res = await fetch('http://localhost:8888/monitors/get-all-monitors')
        return await res.json()
    }

    async getAllOffers () {
        const res = await fetch('http://localhost:8888/offer/get-all-offers')
        return await res.json()
    }

    async acceptOffer (offer) {
        const res = await fetch(`http://localhost:8888/offer/accept-offer/${offer.idOffer}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await res.json()
    }

    async declineOffer (offer) {
        const res = await fetch(`http://localhost:8888/offer/decline-offer/${offer.idOffer}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await res.json()
    }
}
export default new AdminService