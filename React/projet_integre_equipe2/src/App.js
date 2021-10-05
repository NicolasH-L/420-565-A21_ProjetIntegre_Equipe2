import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import AdminIntershipOffer from './components/AdminIntershipOffer';
import AdminInternshipOfferList from './components/AdminInternshipOfferList';
import Admin from './components/Admin';
import Student from './components/Student';
import StudentUploadCV from './components/StudentUploadCV';

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
          <Route path = "/AdminOffer" component={AdminIntershipOffer}/>
          <Route path = "/AdminOffersList" component={AdminInternshipOfferList}/>
          <Route path = "/Student" component={Student}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
