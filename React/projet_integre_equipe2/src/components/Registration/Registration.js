import React from 'react'
import StudentRegistration from '../Student/StudentRegistration'
import MonitorRegistration from '../Monitor/MonitorRegistration'
import SupervisorRegistration from '../Supervisor/SupervisorRegistration'
import '../Form.css'
import NavbarRegistrationLogin from '../NavbarRegistrationLogin'
import Footer from '../Footer'

const Registration = () => {
  const addStudent = async (student) => {
    const result = await fetch('http://localhost:8888/students/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(student)
      })
    return await result.json()
  }

  const addMonitor = async (monitor) => {
    const result = await fetch('http://localhost:8888/monitors/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(monitor)
      })
    return await result.json()
  }

  const addSupervisor = async (supervisor) => {
    const result = await fetch('http://localhost:8888/supervisors/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(supervisor)
      })
    return await result.json()
  }

  return (
    <div>
      <div className="grad">
      <NavbarRegistrationLogin />
      <div className="d-flex justify-content-center ">
        <div className="jumbotron jumbotron-fluid bg-light rounded shadow reactivescreen">
          <h2 className="text-center text-secondary">Inscription</h2>
          <ul className="nav nav-tabs justify-content-center mb-3" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="student-tab" data-toggle="tab" href="#student" role="tab" aria-controls="student" aria-selected="true">Étudiant</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link text-black" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link text-black" id="supervisor-tab" data-toggle="tab" href="#supervisor" role="tab" aria-controls="supervisor" aria-selected="false">Superviseur</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab"><StudentRegistration onAdd={addStudent} /></div>
            <div className="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorRegistration onAdd={addMonitor} /></div>
            <div className="tab-pane fade" id="supervisor" role="tabpanel" aria-labelledby="supervisor-tab"><SupervisorRegistration onAdd={addSupervisor} /></div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  )
}

export default Registration
