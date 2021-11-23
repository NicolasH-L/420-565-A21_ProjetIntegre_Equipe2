import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonCardTitle, IonText, IonRedirect } from "@ionic/react";
import { home, business, alertCircleOutline, cash, briefcase, mail, hourglass, timeOutline, calendar, today, arrowDown, checkmark, close, eye } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const MonitorOfferList = () => {
    const [offers, setOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const monitor = historyState.monitor

    useEffect(() => {
        const getOffersByMonitor = async () => {
            const offersFromServer = await fetchOffersByMonitor()
            setOffers(offersFromServer)
        }
        getOffersByMonitor()
    }, [])

    const fetchOffersByMonitor = async () => {
        const res = await fetch(`http://localhost:8888/offer/get-all-valid-offers/${monitor.id}`)
        return await res.json()
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle size="large" className="ion-text-center">Liste offres</IonTitle>
                        <IonButton onClick={(e) => history.push('/monitorOfferForm', { monitor: monitor })} >Déposer offre</IonButton>
                        <IonButton onClick={(e) => history.push('/home', historyState)} >log out</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {offers.map((offer) => (

                    <IonCard key={offer.idOffer}>
                        <IonCardHeader>
                            <IonCardTitle style={{ fontWeight: "bold" }}>{offer.companyName}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem >
                                <IonText style={{ fontFamily: "Verdana" }} >
                                    <p>Poste: {offer.jobTitle}</p>
                                    <p>Salaire: {offer.salary}$</p>
                                    <p>Date d'affichage: {offer.displayDate.split('T')[0]}</p>
                                    <p>Date limite: {offer.deadlineDate.split('T')[0]}</p>
                                </IonText>
                            </IonItem>
                            <IonButton color="primary" onClick={e => { e.preventDefault() }} className="ion-margin" size="small">Voir Étudiants <IonIcon icon={eye} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage >
    )
}

export default MonitorOfferList
