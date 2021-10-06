import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import AdminInternshipOffer from './components/AdminInternshipOffer';
import AdminInternshipOfferList from './components/AdminInternshipOfferList';
import Admin from './components/Admin';
import Monitor from './components/Monitor';
import MonitorInternshipOffer from './components/MonitorInternshipOffer';
import Student from './components/Student';
import StudentUploadCV from './components/StudentUploadCV';
import OfferView from './components/OfferView';

function App() {
  return (
      <Router>
        <div>
          <Route path = "/" exact render={(props) => (
          <>
            <StudentUploadCV/>
          </>
        )}/>
          <Route path = "/Login" component={Login}/>
          <Route path = "/Registration" component={Registration}/>
          <Route path = "/Admin" component={Admin}/>
          <Route path = "/AdminOffer" component={AdminInternshipOffer}/>
          <Route path = "/AdminOffersList" component={AdminInternshipOfferList}/>
          <Route path = "/Monitor" component={Monitor}/>
          <Route path = "/MonitorOffer" component={MonitorInternshipOffer}/>
          <Route path = "/Student" component={Student}/>
          <Route path = "/OfferView" component={OfferView}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
