import { IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonCardTitle, IonText } from "@ionic/react";
import { home, business, alertCircleOutline, cash, briefcase, mail, hourglass, timeOutline, calendar, today, arrowDown, checkmark, close, document, location } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const OfferView = () => {
    const history = useHistory()
    const historyState = history.location.state

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonButton onClick={e => { e.preventDefault(); history.push('/adminOfferList', historyState) }}>back</IonButton>
                        <IonTitle size="large" className="ion-text-center">Offre de stage</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                    </IonCardHeader>
                    <form className="ion-padding">
                        <IonCardContent>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={business} style={{ marginRight: 5 }}></IonIcon>Nom de l'entreprise</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.companyName} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={location} style={{ marginRight: 5 }}></IonIcon>Adresse</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.address} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={cash} style={{ marginRight: 5 }}></IonIcon>Salaire</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.salary} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={briefcase} style={{ marginRight: 5 }}></IonIcon>Position</IonLabel>
                                <IonTextarea readonly value={historyState.offer.jobTitle} ></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={briefcase} style={{ marginRight: 5 }}></IonIcon>Description</IonLabel>
                                <IonTextarea readonly value={historyState.offer.description} ></IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={briefcase} style={{ marginRight: 5 }}></IonIcon>Compétences</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.skills} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={mail} style={{ marginRight: 5 }}></IonIcon>Courriel du représentant</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.monitorEmail} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={hourglass} style={{ marginRight: 5 }}></IonIcon>Heures de travail</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.workingHours} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={timeOutline} style={{ marginRight: 5 }}></IonIcon>Horaire de travail</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.jobSchedules} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Date d'affichage</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.displayDate} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Date limite</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.deadlineDate} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Début Stage</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.startInternshipDate} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Fin Stage</IonLabel>
                                <IonInput readonly type="text" value={historyState.offer.endInternshipDate} />
                            </IonItem>
                        </IonCardContent>
                    </form>
                </IonCard>
            </IonContent>
        </IonPage >
    )
}

export default OfferView
