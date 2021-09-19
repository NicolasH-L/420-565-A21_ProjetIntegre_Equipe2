import React, { useEffect, useState } from "react";

import './App.css';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';

function App() { 
  const [monitors, setMonitors] = useState([])

  // useEffect(() => {
  //   const getMonitors = async () => {
  //     const monitorsFromServer = await fetchMonitors()
  //     setMonitors(monitorsFromServer)
  //   }
  //   getMonitors()
  // }, []) 

  // const fetchMonitors = async () => {
  //   const res = await fetch('http://localhost:5000/monitors')
  //   const data = await res.json()
  //   return data
  // }

  const addMonitorInscription = async (monitor) =>{
    const res = await fetch('http://localhost:5000/monitors',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(monitor)
    })
    const data = await res.json()
    setMonitors([...monitors, data])
  }
  return (
    <div>
      <NavbarHead/>
      <MonitorRegistration onAdd={addMonitorInscription}/>
      {/* <StudentRegistration/> */}
      <Footer/>
    </div>
  );
}

export default App;
