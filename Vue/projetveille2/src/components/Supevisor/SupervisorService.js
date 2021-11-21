class SupervisorService{
    async getInternships (idSuperviseur) {
        const res = await fetch(`http://localhost:8888/internship/get-all-internships-by-supervisor/${idSuperviseur}`)
        return await res.json()
    }
}
export default new SupervisorService