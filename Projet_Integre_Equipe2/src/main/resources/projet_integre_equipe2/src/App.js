import './App.css';
import MonitorRegistration from './components/MonitorRegistration';
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container-fluid">
      <NavbarHead/>
      <MonitorRegistration/>
      <Footer/>
    </div>
  );
}

export default App;
