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
    IonButton,
    IonToast
} from '@ionic/react';
import React, { useState } from 'react'
import { alertCircleOutline, home, idCardSharp, lockClosedSharp, mailSharp, peopleCircleSharp, personCircle, personSharp } from 'ionicons/icons'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const history = useHistory();
    const historyState = history.location.state
    const initialValues = {
        username: '',
        password: ''
    };

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = (admin: any) => {
        loginAdmin(admin.username, admin.password)
            .then((data: any) => data.username !== null ? history.push("/adminOfferForm", { admin: data }) : setShowToastAlert1(true))
            .catch(() => setShowToastAlert1(true))
    }

    const loginAdmin = async (username: any, password: any) => {
        const res = await fetch(`http://192.168.50.154:8888/admin/${username}/${password}`)
        return await res.json()
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle className="ion-text-center">Admin Login</IonTitle>
                        <IonButton onClick={e => { e.preventDefault(); history.push('/home', historyState) }} ><IonIcon icon={home} /></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: "70px", color: "#0040ff", }}
                                icon={peopleCircleSharp}
                                className="ion-margin"
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={idCardSharp} style={{ marginRight: 5 }}></IonIcon> Username</IonLabel>
                                <IonInput
                                    type="text"
                                    {...register("username", { required: true, minLength: 2 })} >
                                </IonInput>
                            </IonItem>
                            {errors.username && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> username invalide</p>}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={lockClosedSharp} style={{ marginRight: 5 }}></IonIcon> Password</IonLabel>
                                <IonInput
                                    type="password"
                                    {...register("password", { required: true, pattern: patternPassword })}>
                                </IonInput>
                            </IonItem>
                            {errors.password && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> password invalide</p>}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" type="submit">
                                Login
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </form>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Mot de passe ou username incorrect !"
                    duration={3000}
                />
            </IonContent>
        </IonPage>
    )
}

export default AdminLogin
