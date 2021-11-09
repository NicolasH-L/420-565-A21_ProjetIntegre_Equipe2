class AdminService {
    async getAllMonitors(){
        const res = await fetch('http://localhost:8888/monitors/get-all-monitors')
        return await res.json()
    }
}
export default new AdminService