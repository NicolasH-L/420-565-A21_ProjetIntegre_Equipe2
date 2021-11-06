import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Registration from './components/Registration/Registration'
import Login from './components/Login/Login'
import AdminInternshipOffer from './components/AdminInternshipOffer'
import AdminInternshipOfferList from './components/AdminInternshipOfferList'
import Admin from './components/Admin'
import Monitor from './components/Monitor'
import MonitorInternshipOffer from './components/MonitorInternshipOffer'
import Student from './components/Student'
import Supervisor from './components/Supervisor'
import StudentUploadCV from './components/StudentUploadCV'
import OfferView from './components/OfferView'
import AdminStudentCvList from './components/AdminStudentCvList'
import AdminStudentList from './components/AdminStudentList'
import ViewDocument from './components/ViewDocument'
import StudentInternshipListOffers from './components/StudentInternshipListOffers'
import StudentDocuments from './components/StudentDocuments'
import MonitorOfferList from './components/MonitorOfferList'
import AdminStudentAcceptedOffers from './components/Admin/AdminStudentAcceptedOffers'
import MonitorStudentList from './components/MonitorStudentList'
import AdminInternshipList from './components/Admin/AdminInternshipList'
import StudentSignContract from './components/Student/StudentSignContract'
import AdminAssignSupervisorToStudent from './components/Admin/AdminAssignSupervisorToStudent'
import SupervisorAssignedStudentList from './components/Supervisor/SupervisorAssignedStudentList'
import MonitorContracts from './components/Monitor/MonitorContracts'
import AdminContracts from './components/Admin/AdminContracts'

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact render={(props) => (
          <>
            <Login />
          </>
        )} />
        <Route path="/Login" component={Login} />
        <Route path="/Registration" component={Registration} />
        <Route path="/Admin" component={Admin} />
        <Route path="/AdminOffer" component={AdminInternshipOffer} />
        <Route path="/AdminOffersList" component={AdminInternshipOfferList} />
        <Route path="/Monitor" component={Monitor} />
        <Route path="/MonitorOffer" component={MonitorInternshipOffer} />
        <Route path="/MonitorOfferList" component={MonitorOfferList} />
        <Route path="/MonitorStudentList" component={MonitorStudentList} />
        <Route path="/Student" component={Student} />
        <Route path="/StudentUploadCV" component={StudentUploadCV} />
        <Route path="/StudentDocuments" component={StudentDocuments} />
        <Route path="/OfferView" component={OfferView} />
        <Route path="/Supervisor" component={Supervisor} />
        <Route path="/StudentInternshipListOffers" component={StudentInternshipListOffers} />
        <Route path="/AdminStudentList" component={AdminStudentList} />
        <Route path="/AdminStudentCvList" component={AdminStudentCvList} />
        <Route path="/ViewDocument" component={ViewDocument} />
        <Route path="/AdminStudentAcceptedOffers" component={AdminStudentAcceptedOffers} />
        <Route path="/AdminInternshipList" component={AdminInternshipList} />
        <Route path="/StudentSignContract" component={StudentSignContract} />
        <Route path="/AdminAssignSupervisorToStudent" component={AdminAssignSupervisorToStudent}></Route>
        <Route path="/SupervisorAssignedStudentList" component={SupervisorAssignedStudentList}></Route>
        <Route path="/MonitorContracts" component={MonitorContracts}/>
        <Route path="/AdminContracts" component={AdminContracts}/>
        <Footer />
      </div>
    </Router>
  )
}

export default App
