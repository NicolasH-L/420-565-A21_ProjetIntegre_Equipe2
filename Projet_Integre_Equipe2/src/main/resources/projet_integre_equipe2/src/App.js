import './App.css';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import StudentRegistration from './components/StudentRegistration';
import Footer from './components/Footer';

function App() {
  return (
    <div class="container-fluid">
      <NavbarHead/>
      <MonitorRegistration/>
      <Footer/>
    </div>
  );
}

export default App;
