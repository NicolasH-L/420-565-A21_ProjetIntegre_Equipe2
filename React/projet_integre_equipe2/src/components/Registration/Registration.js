import React from 'react'
import StudentRegistration from '../StudentRegistration';
import MonitorRegistration from '../MonitorRegistration';
import SupervisorRegistration from '../SupervisorRegistration';
import './Registration.css'

const Registration = () => {
    const addStudent = async (student) => {
        const result = await fetch('http://localhost:5000/students',
        {
          method:'POST',
          headers:{
            'Content-type': 'application/json'
          },
            body: JSON.stringify(student)
        })
        const data = await result.json()
      //  setStudents([...student, data])
      }
    
      const addMonitor = async (monitor) => {
        const result = await fetch('http://localhost:5000/monitors',
        {
          method:'POST',
          headers:{
            'Content-type': 'application/json'
          },
            body: JSON.stringify(monitor)
        })
        const data = await result.json()
      //  setMonitors([...monitor, data])
      }

      const addSupervisor = async (supervisor) => {
        const result = await fetch('http://localhost:5000/supervisors',
        {
          method:'POST',
          headers:{
            'Content-type': 'application/json'
          },
            body: JSON.stringify(supervisor)
        })
        const data = await result.json()
      //  setSupervisors([...supervisor, data])
      }

    return (
        <div className="grad">
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded col-sm-12 col-md-9 col-lg-6 col-xl-4 shadow m-5">
                    <h2 className="text-center text-secondary">Inscription</h2>
                    <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="cegep-tab" data-toggle="tab" href="#cegep" role="tab" aria-controls="cegep" aria-selected="true">Cégep</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-black" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-black" id="supervisor-tab" data-toggle="tab" href="#supervisor" role="tab" aria-controls="supervisor" aria-selected="false">Superviseur</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="cegep" role="tabpanel" aria-labelledby="cegep-tab"><StudentRegistration onAdd={addStudent} /></div>
                        <div className="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorRegistration onAdd={addMonitor} /></div>
                        <div className="tab-pane fade" id="supervisor" role="tabpanel" aria-labelledby="supervisor-tab"><SupervisorRegistration onAdd={addSupervisor} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
