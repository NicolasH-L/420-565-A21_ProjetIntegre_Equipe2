class RegistrationService {

  async addStudent(student) {
    const res = await fetch('http://localhost:8888/students/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(student)
      })
    return await res.json()
  }

  async addMonitor(monitor) {
    const res = await fetch('http://localhost:8888/monitors/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(monitor)
      })
    return await res.json()
  }

  async addSupervisor(supervisor) {
    const res = await fetch('http://localhost:8888/supervisors/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(supervisor)
      })
    return await res.json()
  }


}

export default new RegistrationService