import './App.css';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';

function App() {
  return (
    <div className="App">
      <NavbarHead/>
      {/* <StudentRegistration/> */}
      <MonitorRegistration/>
    </div>
  );
}

export default App;
