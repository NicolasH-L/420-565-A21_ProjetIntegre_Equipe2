import React from 'react'
import StudentRegistration from '../StudentRegistration';
import MonitorRegistration from '../MonitorRegistration';
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
      //  setStudents([...student, data])
      }

    return (
        <div className="grad">
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-25 shadow m-5">
                    <h2 className="text-center text-secondary">Inscription</h2>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="cegep-tab" data-toggle="tab" href="#cegep" role="tab" aria-controls="cegep" aria-selected="true">Cégep</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link text-black" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="cegep" role="tabpanel" aria-labelledby="cegep-tab"><StudentRegistration onAdd={addStudent} /></div>
                        <div class="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorRegistration onAdd={addMonitor} /></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Registration
