import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import AdminIntershipOffer from './components/AdminIntershipOffer';
import Admin from './components/Admin';
import Student from './components/Student';

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
          <Route path = "/Student" component={Student}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
