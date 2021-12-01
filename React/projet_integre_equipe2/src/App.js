import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import GuardedRoute from './components/Routes/GuardedRoute'
import { useState, useEffect } from 'react'

import Footer from './components/Footer'
import Registration from './components/Registration/Registration'
import Login from './components/Login/Login'

import Admin from './components/Admin/Admin'
import AdminInternshipOffer from './components/Admin/AdminInternshipOffer'
import AdminInternshipOfferList from './components/Admin/AdminInternshipOfferList'
import AdminStudentCvList from './components/Admin/AdminStudentCvList'
import AdminStudentList from './components/Admin/AdminStudentList'
import AdminStudentAcceptedOffers from './components/Admin/AdminStudentAcceptedOffers'
import AdminAssignSupervisorToStudent from './components/Admin/AdminAssignSupervisorToStudent'
import AdminContracts from './components/Admin/AdminContracts'

import Monitor from './components/Monitor/Monitor'
import MonitorInternshipOffer from './components/Monitor/MonitorInternshipOffer'
import MonitorOfferList from './components/Monitor/MonitorOfferList'
import MonitorStudentList from './components/Monitor/MonitorStudentList'
import MonitorContracts from './components/Monitor/MonitorContracts'
import MonitorEvaluateStudent from './components/Monitor/MonitorEvaluateStudent'

import Student from './components/Student/Student'
import StudentUploadCV from './components/Student/StudentUploadCV'
import StudentInternshipListOffers from './components/Student/StudentInternshipListOffers'
import StudentDocuments from './components/Student/StudentDocuments'
import StudentSignContract from './components/Student/StudentSignContract'
import StudentContractList from './components/Student/StudentContractList'

import Supervisor from './components/Supervisor/Supervisor'
import SupervisorAssignedStudentList from './components/Supervisor/SupervisorAssignedStudentList'
import SupervisorEvaluations from './components/Supervisor/SupervisorEvaluations'

import OfferView from './components/Offer/OfferView'
import ViewDocument from './components/ViewDocument'
import ErrorRoute from './components/Routes/ErrorRoute'
import HomePage from './components/HomePage/HomePage';

window.onload = function () {
  if (window.history.state === null && sessionStorage.getItem("userType") !== "") {
    sessionStorage.setItem("userType", "")
    window.location.pathname = "/"
  }
}

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(sessionStorage.getItem("userType") === "admin")
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(sessionStorage.getItem("userType") === "student")
  const [isMonitorAuthenticated, setIsMonitorAuthenticated] = useState(sessionStorage.getItem("userType") === "monitor")
  const [isSupervisorAuthenticated, setIsSupervisorAuthenticated] = useState(sessionStorage.getItem("userType") === "supervisor")

  useEffect(() => {
    let userType = sessionStorage.getItem("userType")
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
    } else if (user === "supervisor") {
      setIsSupervisorAuthenticated(true)
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => (
          <>
            <HomePage />
          </>
        )} />
        <Route path="/HomePage">
          <Redirect to="/" />
        </Route>

        <Route path="/Login" exact render={() => (
          <>
            <Login authGuardLogin={login} />
          </>
        )} />

        <Route path="/Registration" component={Registration} />

        <GuardedRoute path='/Admin' component={Admin} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminOffer" component={AdminInternshipOffer} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminOffersList" component={AdminInternshipOfferList} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminStudentList" component={AdminStudentList} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminStudentCvList" component={AdminStudentCvList} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminStudentAcceptedOffers" component={AdminStudentAcceptedOffers} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminAssignSupervisorToStudent" component={AdminAssignSupervisorToStudent} auth={isAdminAuthenticated} />
        <GuardedRoute path="/AdminContracts" component={AdminContracts} auth={isAdminAuthenticated} />

        <GuardedRoute path='/Monitor' component={Monitor} auth={isMonitorAuthenticated} />
        <GuardedRoute path="/MonitorOffer" component={MonitorInternshipOffer} auth={isMonitorAuthenticated} />
        <GuardedRoute path="/MonitorOfferList" component={MonitorOfferList} auth={isMonitorAuthenticated} />
        <GuardedRoute path="/MonitorStudentList" component={MonitorStudentList} auth={isMonitorAuthenticated} />
        <GuardedRoute path="/MonitorContracts" component={MonitorContracts} auth={isMonitorAuthenticated} />
        <GuardedRoute path="/MonitorEvaluateStudent" component={MonitorEvaluateStudent} auth={isMonitorAuthenticated} />

        <GuardedRoute path='/Student' component={Student} auth={isStudentAuthenticated} />
        <GuardedRoute path="/StudentUploadCV" component={StudentUploadCV} auth={isStudentAuthenticated} />
        <GuardedRoute path="/StudentDocuments" component={StudentDocuments} auth={isStudentAuthenticated} />
        <GuardedRoute path="/StudentInternshipListOffers" component={StudentInternshipListOffers} auth={isStudentAuthenticated} />
        <GuardedRoute path="/StudentSignContract" component={StudentSignContract} auth={isStudentAuthenticated} />
        <GuardedRoute path="/StudentContractList" component={StudentContractList} auth={isStudentAuthenticated} />

        <GuardedRoute path='/Supervisor' component={Supervisor} auth={isSupervisorAuthenticated} />
        <GuardedRoute path="/SupervisorAssignedStudentList" component={SupervisorAssignedStudentList} auth={isSupervisorAuthenticated} />
        <GuardedRoute path="/SupervisorEvaluations" component={SupervisorEvaluations} auth={isSupervisorAuthenticated} />

        <Route path="/OfferView" component={OfferView} />
        <Route path="/ViewDocument" component={ViewDocument} />

        <Route path="*" component={ErrorRoute} />
        <Footer />
      </Switch>
    </Router>
  )
}

export default App
