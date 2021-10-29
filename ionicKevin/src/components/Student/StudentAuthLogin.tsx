import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCol, IonGrid, IonRow, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react'
import React from 'react'

const StudentAuthLogin = () => {
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
            <IonButton className="ion-margin-top" type="submit" expand="block">Se connecter</IonButton>
        </form>
    )
}

export default StudentAuthLogin
