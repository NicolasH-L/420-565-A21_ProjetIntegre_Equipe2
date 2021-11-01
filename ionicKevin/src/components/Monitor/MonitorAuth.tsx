import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import MonitorAuthLogin from './MonitorAuthLogin';
import MonitorAuthRegistration from './MonitorAuthRegistration';

const MonitorAuth = () => {
    const location = useLocation();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(true)

    useEffect(() => {
        monitorLoginForm();
    }, [location])

    const monitorRegistrationForm = () => {
        setShowRegistrationForm(true)
        setShowLoginForm(false)
    }

    const monitorLoginForm = () => {
        setShowRegistrationForm(false)
        setShowLoginForm(true)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar></IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton color="light" onClick={e => { e.preventDefault(); monitorLoginForm() }}>Connexion</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light" onClick={e => { e.preventDefault(); monitorRegistrationForm() }}>Inscription</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {showRegistrationForm ? <MonitorAuthRegistration/>
                    : showLoginForm ? <MonitorAuthLogin /> : ""}
            </IonContent>
        </IonPage>
    )
}

export default MonitorAuth
