import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AdminOffer from './AdminOffer';
import AdminOfferList from './AdminOfferList';
import OfferView from './OfferView';

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
                        {adminChoice === "adminOffer" || urlPathArray.length === 2 ? "Déposer une offre" 
                        : adminChoice === "adminOfferList" ? "Offres" 
                        : adminChoice === "offerView" ? "Offre de stage": "" }
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                    </IonToolbar>
                </IonHeader>
                {adminChoice === "adminOffer" || urlPathArray.length === 2 ? <AdminOffer/> 
                : adminChoice === "adminOfferList" ? <AdminOfferList/> 
                : adminChoice === "offerView" ? <OfferView/> : ""}
            </IonContent>
        </IonPage>
    )
}

export default Admin
