import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AdminOffer from './AdminOffer';

const Admin = () => {
    const location = useLocation();
    const urlPath = location.pathname;
    const urlPathArray = urlPath.split("/");
    const adminChoice = urlPathArray[2];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className="ion-margin-top">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className="ion-margin-top">
                        {adminChoice === "adminOffer" || urlPathArray.length === 2 ? "Déposer une offre" : ""}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                    </IonToolbar>
                </IonHeader>
                {adminChoice === "adminOffer" || urlPathArray.length === 2 ? <><AdminOffer /></> : ""}
            </IonContent>
        </IonPage>
    )
}

export default Admin
