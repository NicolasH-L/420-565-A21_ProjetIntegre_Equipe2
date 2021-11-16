class OfferService{
    async verifyAppliedToOfferStatus (offerId,studentId) {
        const res = await fetch(`http://localhost:8888/offers-list/offer-applied/${offerId}/${studentId}`)
        return await res.json()
    }

    async addStudentOffer (studentOfferApplication) {
        const result = await fetch("http://localhost:8888/offers-list/save-student-offer",
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOfferApplication)
            })
        return await result.json()
    }
}
export default new OfferService