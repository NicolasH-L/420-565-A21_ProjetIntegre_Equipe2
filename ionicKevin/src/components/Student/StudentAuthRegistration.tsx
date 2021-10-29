import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCol, IonGrid, IonRow, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import { text } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom';

const StudentAuthRegistration = () => {
    const history = useHistory();

    return (
        <form className="ion-padding">
            <IonItem>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" />
            </IonItem>
            <IonButton className="ion-margin-top" type="submit" expand="block">S'inscrire</IonButton>
        </form>
    )
}

export default StudentAuthRegistration
