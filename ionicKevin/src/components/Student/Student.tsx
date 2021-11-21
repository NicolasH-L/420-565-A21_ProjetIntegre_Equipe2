import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import React from 'react'
import { useLocation } from 'react-router-dom';
import StudentDocuments from './StudentDocuments';

const Student = () => {
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
                        {monitorChoice === "studentDocuments" || urlPathArray.length === 2 ? "Documents" : ""}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                    </IonToolbar>
                </IonHeader>
                {monitorChoice === "studentDocuments" || urlPathArray.length === 2 ? <><StudentDocuments /></> : ""}
            </IonContent>
        </IonPage>
    )
}

export default Student
