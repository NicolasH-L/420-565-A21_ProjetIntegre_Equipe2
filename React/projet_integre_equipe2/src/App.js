import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';
import SupervisorRegistration from './components/SupervisorRegistration';
import {useState} from 'react' 
import Registration from './components/Registration/Registration';
import SupervisorLogin from './components/SupervisorLogin';

function App() {
  // const [student, setStudents] = useState([])
  // const [monitor, setMonitors] = useState([])

  // const addMonitor = async (monitor) => {
  //   const result = await fetch('http://localhost:5000/monitors',
  //   {
  //     method:'POST',
  //     headers:{
  //       'Content-type': 'application/json'
  //     },
  //       body: JSON.stringify(monitor)
  //   })
  //   const data = await result.json()
  // //  setMonitors([...monitor, data])
  // }
  // const addSupervisor = async (supervisor) => {
  //   const result = await fetch('http://localhost:5000/supervisors',
  //   {
  //     method:'POST',
  //     headers:{
  //       'Content-type': 'application/json'
  //     },
  //       body: JSON.stringify(supervisor)
  //   })
  //   const data = await result.json()
  // //  setStudents([...monitor, data])
  // }

  return (
    <div>
      {/*<NavbarHead/>*/}
      {/* <Registration/> */}
      <SupervisorLogin/>
      <Footer/>
    </div>
  );
}

export default App;
