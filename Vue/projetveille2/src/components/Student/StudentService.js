class StudentService{
    async getDocuments(studentId) {
        const res = await fetch(`http://localhost:8888/document/get-all-documents/${studentId}`)
        return await res.json()
    }

    async getValidOffers () {
        const res = await fetch('http://localhost:8888/offer/get-all-valid-offers/')
        return await res.json()
    }
}
export default new StudentService