import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import GuardedRoute from './components/GuardedRoute';
import { useState, useEffect } from 'react'

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

window.onload = function () {
  if (window.history.state === null && sessionStorage.getItem("userType") !== "") {
    sessionStorage.setItem("userType", "")
    window.location.pathname = "/"
  }
}

function App() {
  const [isAutheticated, setisAutheticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(sessionStorage.getItem("userType") === "admin")
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(sessionStorage.getItem("userType") === "student")
  const [isMonitorAuthenticated, setIsMonitorAuthenticated] = useState(sessionStorage.getItem("userType") === "monitor")
  const [isSupervisorAuthenticated, setIsSupervisorAuthenticated] = useState(false)

  let userType

  useEffect(() => {
    userType = sessionStorage.getItem("userType")
    if (userType === null) {
      sessionStorage.setItem("userType", "")
    }
  }, [])

  function login(user) {
    sessionStorage.setItem("userType", user)
    if (user === "admin") {
      setIsAdminAuthenticated(true)
    } else if (user === "student") {
      setIsStudentAuthenticated(true)
    } else if (user === "monitor") {
      setIsMonitorAuthenticated(true)
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => (
          <>
            <Login authGuardLogin={login} />
          </>
        )} />
        <Route path="/Login">
          <Redirect to="/" />
        </Route>
        {/*<Route path="/Login" component={Login} />*/}
        <Route path="/Registration" component={Registration} />

        {<GuardedRoute path='/Admin' component={Admin} auth={isAdminAuthenticated} />}
        {/*<Route path="/Admin" component={Admin} />*/}
        <Route path="/AdminOffer" component={AdminInternshipOffer} />
        <Route path="/AdminOffersList" component={AdminInternshipOfferList} />
        {/*<Route path="/Monitor" component={Monitor} />*/}
        {<GuardedRoute path='/Monitor' component={Monitor} auth={isMonitorAuthenticated} />}

        <Route path="/MonitorOffer" component={MonitorInternshipOffer} />
        <Route path="/MonitorOfferList" component={MonitorOfferList} />
        <Route path="/MonitorStudentList" component={MonitorStudentList} />
        {/*<Route path="/Student" component={Student} />*/}
        <GuardedRoute path='/Student' component={Student} auth={isStudentAuthenticated} />

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
        <Route path="/MonitorContracts" component={MonitorContracts} />
        <Route path="/AdminContracts" component={AdminContracts} />
        <Footer />
      </Switch>
    </Router>
  )
}

export default App
