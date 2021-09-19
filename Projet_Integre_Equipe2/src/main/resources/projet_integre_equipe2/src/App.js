import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';
import SupervisorRegistration from './components/SupervisorRegistration';
import {useState} from 'react' 

function App() {
  const [student, setStudents] = useState([])
  const [monitor, setMonitors] = useState([])

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
  //  setStudents([...monitor, data])
  }

  return (
    <div>
      <NavbarHead/>
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="cegep-tab" data-toggle="tab" href="#cegep" role="tab" aria-controls="cegep" aria-selected="true">Cégep</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="supervisor-tab" data-toggle="tab" href="#supervisor" role="tab" aria-controls="supervisor" aria-selected="false">Superviseur</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="cegep" role="tabpanel" aria-labelledby="cegep-tab"><StudentRegistration onAdd={addStudent}/></div>
          <div className="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorRegistration onAdd={addMonitor}/></div>
          <div className="tab-pane fade" id="supervisor" role="tabpanel" aria-labelledby="supervisor-tab"><SupervisorRegistration onAdd={addSupervisor}/></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
