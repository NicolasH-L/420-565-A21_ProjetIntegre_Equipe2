import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonLabel,
    IonRow,
    IonCol,
    IonIcon,
    IonButton
} from '@ionic/react';
import React, { useState } from 'react'
import { personCircle } from 'ionicons/icons'

const Student: React.FC = () => {
    const [student, setStudent] = useState({ matricule: "", password: "" })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRow>
                    <IonCol>
                        <IonIcon
                            style={{ fontSize: "70px", color: "#0040ff" }}
                            icon={personCircle}
                            className=""
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Matricule</IonLabel>
                            <IonInput
                                type="text"
                                onIonChange={(e) => setStudent({ ...student, matricule: e.detail.value! })}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Password</IonLabel>
                            <IonInput
                                type="password"
                                onIonChange={(e) => setStudent({ ...student, password: e.detail.value! })}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={(e) => console.log(student)}>
                            Login
                        </IonButton>
                        <p style={{ fontSize: "medium" }}>
                            Don't have an account? <a href="#">Sign up!</a>
                        </p>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};
export default Student;