import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import StudentLogin from './components/Student/StudentLogin';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import StudentRegistration from './components/Student/StudentRegister';
import MonitorRegister from './components/Monitor/MonitorRegister';
import MonitorLogin from './components/Monitor/MonitorLogin';
import SupervisorRegister from './components/Supervisor/SupervisorRegister';
import SupervisorLogin from './components/Supervisor/SupervisorLogin';
import AdminLogin from './components/Admin/AdminLogin';
import Menu from './components/Menu';
import MonitorOfferForm from './components/Monitor/MonitorOfferForm';
import AdminOfferForm from './components/Admin/AdminOfferForm';
import AdminOfferList from './components/Admin/AdminOfferList';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet id="main">
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />

        <Route path="/studentLogin" component={StudentLogin} exact={true} />
        <Route path="/studentRegistration" component={StudentRegistration} exact={true} />

        <Route path="/monitorRegistration" component={MonitorRegister} exact={true} />
        <Route path="/monitorLogin" component={MonitorLogin} exact={true} />
        <Route path="/monitorOfferForm" component={MonitorOfferForm} exact={true} />

        <Route path="/supervisorRegistration" component={SupervisorRegister} exact={true} />
        <Route path="/supervisorLogin" component={SupervisorLogin} exact={true} />

        <Route path="/adminLogin" component={AdminLogin} exact={true} />
        <Route path="/adminOfferForm" component={AdminOfferForm} exact={true} />
        <Route path="/adminOfferList" component={AdminOfferList} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
