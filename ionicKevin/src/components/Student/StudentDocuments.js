import React, { useState } from 'react'
import { IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonItem, IonLabel } from '@ionic/react'

const StudentDocuments = () => {
    const [uploadFile, setUploadFile] = useState()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Documents</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel>Choisir</IonLabel>
                    <IonInput type="file" onIonChange={(e) => { setUploadFile(e.target.files[0]); console.log(uploadFile) }} ></IonInput>
                </IonItem>
            </IonContent>
        </IonPage>
    )
}

export default StudentDocuments
