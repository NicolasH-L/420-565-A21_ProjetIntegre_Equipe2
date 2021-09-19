import './App.css';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';
import SupervisorRegistration from './components/SupervisorRegistration';

function App() {
  return (
    <div>
      <NavbarHead/>
      {/* <MonitorRegistration/> */}
      {/* <StudentRegistration/> */}´
      <SupervisorRegistration/>
      <Footer/>
    </div>
  );
}

export default App;
