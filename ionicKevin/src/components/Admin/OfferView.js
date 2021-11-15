import React from 'react'
import { IonInput, IonItem, IonLabel, IonTitle, IonTextarea, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const OfferView = () => {
    const history = useHistory()
    const offer = history.location.state

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Offre de stage</IonTitle>
            <form className="ion-padding" id="AdminOfferForm">
                <IonItem>
                    <IonLabel position="floating">Nom de l'entreprise: </IonLabel>
                    <IonInput type="text" value={offer.companyName} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Poste: </IonLabel>
                    <IonInput type="text" value={offer.jobTitle} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Courriel du représentant de l'entreprise: </IonLabel>
                    <IonInput type="text" value={offer.monitorEmail} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Adresse: </IonLabel>
                    <IonInput type="text" value={offer.address} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Horaire de travail: </IonLabel>
                    <IonInput type="text" value={offer.jobSchedule} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Heures de travail: </IonLabel>
                    <IonInput type="text" value={offer.workingHours} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Salaire: </IonLabel>
                    <IonInput type="text" value={offer.salary + "$"} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Compétences: </IonLabel>
                    <IonTextarea value={offer.skills} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description: </IonLabel>
                    <IonTextarea value={offer.description} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Date d'affichage: </IonLabel>
                    <IonInput type="text" value={offer.displayDate} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Date limite: </IonLabel>
                    <IonInput type="text" value={offer.deadlineDate} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Début de stage: </IonLabel>
                    <IonInput type="text" value={offer.startInternshipDate} readonly />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Fin de stage: </IonLabel>
                    <IonInput type="text" value={offer.endInternshipDate} readonly />
                </IonItem>
            </form>
        </div>
    )
}

export default OfferView
