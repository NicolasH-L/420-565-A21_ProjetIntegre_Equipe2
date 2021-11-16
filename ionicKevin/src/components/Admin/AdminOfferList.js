import React, { useState, useEffect } from 'react'
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonList } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { book, checkmark, close } from 'ionicons/icons';


const AdminOfferList = () => {
    const [offers, setOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState === undefined ? JSON.parse(sessionStorage.getItem("admin")) : historyState.admin

    useEffect(() => {
        const getOffers = async () => {
            const offersFromServer = await fetchOffers()
            setOffers(offersFromServer)
        }
        getOffers()
    }, [])

    const fetchOffers = async () => {
        const res = await fetch('http://localhost:8888/offer/get-all-offers')
        return await res.json()
    }

    const acceptOffer = async (offer) => {
        const res = await fetch(`http://localhost:8888/offer/accept-offer/${offer.idOffer}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        const data = await res.json()

        setOffers(
            offers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? { ...offer1, valid: data.valid, state: data.state } : offer1
            )
        )
    }

    const declineOffer = async (offer) => {
        const res = await fetch(`http://localhost:8888/offer/decline-offer/${offer.idOffer}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        const data = await res.json()

        setOffers(
            offers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? { ...offer1, valid: data.valid, state: data.state } : offer1
            )
        )
    }

    const viewOffer = async (offer) => {
        history.push("/admin/offerView", offer)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CardExamples</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {offers.map((offer) => (
                    <IonCard className="ion-margin-vertical">
                        <IonCardHeader>
                            {/*<IonCardSubtitle>Card Subtitle</IonCardSubtitle>*/}
                            <IonCardTitle className="ion-text-center">{offer.companyName + " - " + offer.jobTitle}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                <IonItem>
                                    <IonLabel>Salaire: {offer.salary + "$"}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Date d'affichage: {offer.displayDate}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel color={`${offer.valid ? 'success' : offer.state == null ? 'warning' : 'danger'}`}>
                                        Validité: {offer.state == null ? "En attente" : offer.state}
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                        <IonItem className="ion-justify-content-center">
                            <IonButton
                                size="default"
                                fill="outline"
                                color="primary"
                                className="ion-margin-end"
                                onClick={e => { e.preventDefault(); viewOffer(offer) }}
                            >
                                <IonIcon ios={book} md={book}/>
                            </IonButton>
                            <IonButton
                                size="default"
                                fill="outline"
                                color="success"
                                className="ion-margin-end"
                                onClick={e => { e.preventDefault(); acceptOffer(offer) }}
                            >
                                <IonIcon ios={checkmark} md={checkmark}/>
                            </IonButton>
                            <IonButton
                                size="default"
                                fill="outline"
                                color="danger"
                                className="ion-margin-end"
                                onClick={e => { e.preventDefault(); declineOffer(offer) }}
                            >
                                <IonIcon ios={close} md={close}/>
                            </IonButton>
                        </IonItem>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    )
}

export default AdminOfferList
