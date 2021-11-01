import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import React from 'react'
import AdminAuthLogin from './Admin/AdminAuthLogin';

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
