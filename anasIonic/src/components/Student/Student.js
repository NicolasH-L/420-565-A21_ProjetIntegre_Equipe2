import { IonPage, IonCardSubtitle, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonCardTitle, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import drawing from './student.jpg'

const Student = () => {
    const history = useHistory()
    const historyState = history.location.state

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Étudiant</IonTitle>
                    <IonButtons slot="end">
                        <IonButton disabled onClick={(e) => history.push('/home', {})} >Déposer CV</IonButton>
                        <IonButton disabled onClick={(e) => history.push('/home', {})} >Offres</IonButton>
                        <IonButton onClick={(e) => history.push('/home', historyState)} >log out</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonCard>
                    <img src={drawing} height="300 px" />
                    <IonCardHeader>
                        <IonCardSubtitle>Bonjour</IonCardSubtitle>
                        <IonCardTitle>{historyState.student.firstName + " " + historyState.student.lastName}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Rien à signaler</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Student
