import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer /> */}
        <div className="bgimg">
          <div className="topleft">
            <p style={{ fontSize: "40px" }}> &#9728;</p>
          </div>
          <div className="middle">
            <h1>Welcome</h1>
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
