import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonPage, IonRouterOutlet, IonRouterLink, IonContent, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { triangle, square } from 'ionicons/icons';
import { Link, Redirect, Route, useHistory } from 'react-router-dom';
import StudentAuthRegistration from './Student/StudentAuthRegistration';
import StudentAuthLogin from './Student/StudentAuthLogin';
import { useParams } from 'react-router';


const StudentAuth = () => {
    const { authType } = useParams<{ authType: string; }>();
    const history = useHistory();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(true)

    const studentRegistrationForm = () => {
        setShowRegistrationForm(true)
        setShowLoginForm(false)
    }

    const studentLoginForm = () => {
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
                            <IonButton color="light" onClick={e => { e.preventDefault(); studentLoginForm() }}>Connexion</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light" onClick={e => { e.preventDefault(); studentRegistrationForm() }}>Inscription</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {showRegistrationForm ? <StudentAuthRegistration />
                    : showLoginForm ? <StudentAuthLogin /> : ""}
            </IonContent>
        </IonPage>
    )
}

export default StudentAuth
