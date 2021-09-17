import './App.css';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';

function App() {
  
  const addStudents = async (task) => {
    const res = await fetch('http://localhost:5000/students',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })
  }
  
  return (
    <div className="container-fluid">
      <NavbarHead/>
      <MonitorRegistration/>
      {/* <StudentRegistration/> */}
      <Footer/>
      
    </div>
  );
}

export default App;
