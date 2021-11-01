import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import AdminAuthLogin from './AdminAuthLogin';

const AdminAuth = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar></IonToolbar>
            </IonHeader>
            <IonContent>
                <AdminAuthLogin/>
            </IonContent>
        </IonPage>
    )
}

export default AdminAuth
