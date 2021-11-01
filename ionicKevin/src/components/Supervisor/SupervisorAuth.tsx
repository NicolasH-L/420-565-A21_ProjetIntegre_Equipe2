import { IonPage, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SupervisorAuthLogin from './SupervisorAuthLogin';
import SupervisorAuthRegistration from './SupervisorAuthRegistration';

const SupervisorAuth = () => {
    const location = useLocation();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(true)

    useEffect(() => {
        supervisorLoginForm();
    }, [location])

    const supervisorRegistrationForm = () => {
        setShowRegistrationForm(true)
        setShowLoginForm(false)
    }

    const supervisorLoginForm = () => {
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
                            <IonButton color="light" onClick={e => { e.preventDefault(); supervisorLoginForm() }}>Connexion</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light" onClick={e => { e.preventDefault(); supervisorRegistrationForm() }}>Inscription</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {showRegistrationForm ? <SupervisorAuthRegistration />
                    : showLoginForm ? <SupervisorAuthLogin /> : ""}
            </IonContent>
        </IonPage>
    )
}

export default SupervisorAuth
