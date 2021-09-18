import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';
import {useState} from 'react' 

function App() {
  const [student, setStudents] = useState([])

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

  

  return (
    <div>
      <NavbarHead/>
      <StudentRegistration onAdd={addStudent}/>
      <Footer/>
    </div>
  );
}

export default App;
