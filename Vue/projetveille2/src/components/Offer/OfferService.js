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

    async verifyAppliedToOfferStatusOnLoad (offerId,studentId) {
        console.log("Offre:" + offerId + " etudiant:" + studentId)
        const res = await fetch(`http://localhost:8888/offers-list/offer-applied/${offerId}/${studentId}`)
        const data = await res.json()
        return data
    }
}
export default new OfferService