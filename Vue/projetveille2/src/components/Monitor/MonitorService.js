class MonitorService {
    async addOffer (offer) {
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

    async verifyMonitorExists (email) {
        const res = await fetch(`http://localhost:8888/monitors/monitorEmailExists/${email}`)
        return await res.json()
    }

    async getOffersByMonitor (monitorId) {
        const res = await fetch(`http://localhost:8888/offer/get-all-valid-offers/${monitorId}`)
        return await res.json()
    }
}
export default new MonitorService