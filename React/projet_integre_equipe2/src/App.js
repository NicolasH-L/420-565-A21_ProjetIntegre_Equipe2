import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer';
import Registration from './components/Registration/Registration';
import SupervisorLogin from './components/SupervisorLogin';
import Login from './components/Login/Login';
import MonitorLogin from './components/MonitorLogin';

function App() {
  return (
      <Router>
        <div>
          {/*<NavbarHead/>*/}
          <Route path = "/" exact render={(props) => (
          <>
            <Login/>
          </>
        )}/>
          <Route path = "/Login" component={Login}/>
          <Route path = "/Registration" component={Registration}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
