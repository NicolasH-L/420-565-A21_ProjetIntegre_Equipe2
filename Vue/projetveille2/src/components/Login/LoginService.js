class LoginService{
    
    async loginStudent(matricule, password){
        const res = await fetch(`http://localhost:8888/students/${matricule}/${password}`)
        return await res.json()
    }

    async loginSupervisor(email, password){
        const res = await fetch(`http://localhost:8888/supervisors/${email}/${password}`)
        return await res.json()
    }

    async loginAdmin(username, password){
        const res = await fetch(`http://localhost:8888/admin/${username}/${password}`)
        return await res.json()
    }

    async loginMonitor(email, password){
        const res = await fetch(`http://localhost:8888/monitors/${email}/${password}`)
        return await res.json()
    }
}

export default new LoginService