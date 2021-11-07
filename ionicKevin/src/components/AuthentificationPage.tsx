import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useParams } from 'react-router';
import AdminAuth from './Admin/AdminAuth';
import MonitorAuth from './Monitor/MonitorAuth';
import StudentAuth from './Student/StudentAuth';
import SupervisorAuth from './Supervisor/SupervisorAuth';

const AuthentificationPage = () => {
    const { userAuth } = useParams<{ userAuth: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className="ion-margin-top">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className="ion-margin-top">{userAuth === "studentAuth" ? "Étudiant"
                        : userAuth === "supervisorAuth" ? "Superviseur"
                        : userAuth === "monitorAuth" ? "Moniteur"
                        : userAuth === "adminAuth" ? "Gestionnaire" : ""}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {userAuth === "studentAuth" ? <><StudentAuth /></>
                    : userAuth === "supervisorAuth" ? <><SupervisorAuth /></>
                        : userAuth === "monitorAuth" ? <><MonitorAuth /></>
                            : userAuth === "adminAuth" ? <><AdminAuth /></> : <><StudentAuth /></>}
            </IonContent>
        </IonPage>
    )
}

export default AuthentificationPage
