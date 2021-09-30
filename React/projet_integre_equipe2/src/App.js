import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer';
import Registration from './components/Registration/Registration';
import SupervisorLogin from './components/SupervisorLogin';
import Login from './components/Login/Login';
import MonitorLogin from './components/MonitorLogin';
import AdminIntershipOffer from './components/AdminIntershipOffer';
import Admin from './components/Admin';

function App() {
  return (
      <Router>
        <div>
          <Route path = "/" exact render={(props) => (
          <>
            <Login/>
          </>
        )}/>
          <Route path = "/Login" component={Login}/>
          <Route path = "/Registration" component={Registration}/>
          <Route path = "/Admin" component={Admin}/>
          <Route path = "/AdminOffer" component={AdminIntershipOffer}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
