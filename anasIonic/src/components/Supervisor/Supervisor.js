import { IonPage, IonCardSubtitle, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonCardTitle, IonText } from "@ionic/react";
import { home } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import desk from './supervisor.jpg'

const Supervisor = () => {
    const history = useHistory()
    const historyState = history.location.state

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Superviseur</IonTitle>
                    <IonButtons slot="end">
                        <IonButton disabled onClick={(e) => history.push('/home', {})} >Étudiants</IonButton>
                        <IonButton onClick={(e) => history.push('/home', historyState)} >log out</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonCard>
                    <img src={desk} height="300 px" />
                    <IonCardHeader>
                        <IonCardSubtitle>Bonjour</IonCardSubtitle>
                        <IonCardTitle>{historyState.supervisor.lastName + " " + historyState.supervisor.firstName}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Rien à signaler</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Supervisor
