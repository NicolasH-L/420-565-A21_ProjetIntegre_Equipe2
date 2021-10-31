import { IonPage, IonContent, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonToolbar } from '@ionic/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import StudentAuthRegistration from './Student/StudentAuthRegistration';
import StudentAuthLogin from './Student/StudentAuthLogin';
import { useLocation, useParams } from 'react-router';


const StudentAuth = () => {
    const location = useLocation();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(true)

    useEffect(() => {
        studentLoginForm();
    }, [location])

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
