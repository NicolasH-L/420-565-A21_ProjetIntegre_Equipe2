import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import React from 'react'
import { useLocation } from 'react-router-dom';
import MonitorOffer from './MonitorOffer.js';

const Monitor = () => {
    const location = useLocation();
    const urlPath = location.pathname;
    const urlPathArray = urlPath.split("/");
    const monitorChoice = urlPathArray[2];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className="ion-margin-top">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className="ion-margin-top">
                        {monitorChoice === "monitorOffer" || urlPathArray.length === 2 ? "Déposer une offre" : ""}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                    </IonToolbar>
                </IonHeader>
                {monitorChoice === "monitorOffer" || urlPathArray.length === 2 ? <><MonitorOffer /></> : ""}
            </IonContent>
        </IonPage>
    )
}

export default Monitor
