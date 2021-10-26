import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  } from '@ionic/react';
  import React from 'react';
  
  const NewItem: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>New Item</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <div>
                <h1>Student component</h1>
                <button className="btn btn-primary">click</button>
            </div>
        </IonContent>
      </IonPage>
    );
  };
  export default NewItem;