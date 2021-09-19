import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';
import {useState} from 'react' 
import Registration from './components/Registration/Registration';

function App() {
  const [student, setStudents] = useState([])

  

  return (
    <div>
      {/*<NavbarHead/>*/}
      <Registration/>
      <Footer/>
    </div>
  );
}

export default App;
