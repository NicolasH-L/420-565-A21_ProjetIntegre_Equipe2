import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonCardTitle, IonText } from "@ionic/react";
import { home, business, alertCircleOutline, cash, briefcase, mail, hourglass, timeOutline, calendar, today, arrowDown, checkmark, close } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const AdminOfferList = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const [showToastAlert2, setShowToastAlert2] = useState(false)
    const [offers, setOffers] = useState([])
    const history = useHistory()
    const historyState = history.location.state

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
                (offer1) => offer.idOffer === offer1.idOffer ? { ...offer1, valid: data.valid, state: data.state } : offer1
            )
        )
        setShowToastAlert1(true)
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
        setShowToastAlert2(true)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle size="large" className="ion-text-center">Liste offres</IonTitle>
                        <IonButton onClick={(e) => history.push('/home', {})} ><IonIcon icon={home} /></IonButton>
                        <IonButton onClick={(e) => history.push('/adminOfferForm')} >Déposer offre</IonButton>
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
                                    <br />
                                    <div style={{ backgroundColor: `${offer.valid ? 'lightgreen' : offer.state === "" ? 'yellow' : '#ff3333'}` }}>
                                        <p>Validité: {offer.state === '' ? "En attente" : offer.state}</p>
                                    </div>
                                    <IonButton color="success" onClick={e => { e.preventDefault(); acceptOffer(offer) }} className="ion-margin" size="small">Publier<IonIcon icon={checkmark} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                                    <IonButton color="danger" onClick={e => { e.preventDefault(); declineOffer(offer) }} className="ion-margin" size="small">Retirer<IonIcon icon={close} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                                </IonText>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}
                <IonToast
                    color="success"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Offre publiée!"
                    duration={1000}
                />
                <IonToast
                    color="danger"
                    isOpen={showToastAlert2}
                    onDidDismiss={() => setShowToastAlert2(false)}
                    message="Offre refusée!"
                    duration={1000}
                />
            </IonContent>
        </IonPage >
    )
}

export default AdminOfferList
