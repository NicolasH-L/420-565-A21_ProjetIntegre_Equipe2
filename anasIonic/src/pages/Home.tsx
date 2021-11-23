import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenu, IonItem, IonList, IonButtons } from '@ionic/react';
import NavButtons from '../components/NavButtons';
import './Home.css';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const history = useHistory()
  const historyState = history.location.state
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <NavButtons></NavButtons>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="bgimg">
          <div className="topleft">
            <p style={{ fontSize: "40px" }}> &#9728;</p>
          </div>
          <div className="middle">
            <h1>Bienvenue</h1>
            <hr />
            <p>Stage Finder &#9733;</p>
          </div>
          <div className="bottomleft">
            <p style={{ fontSize: "16px" }}>&copy; Copyright 2021 - 420-565-AL</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
