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
import { alertCircleOutline, business, home, idCardSharp, lockClosedSharp, mailSharp, personCircle } from 'ionicons/icons'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';


const MonitorLogin: React.FC = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const patternEmail = /^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$/
    const history = useHistory();
    const historyState = history.location.state
    const initialValues = {
        email: '',
        password: ''
    };

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = (monitor: any) => {
        loginMonitor(monitor.email, monitor.password)
            .then((data: any) => data.email !== null ? history.push("/monitorOfferForm", { monitor: data }) : setShowToastAlert1(true))
            .catch(() => setShowToastAlert1(true))
    }

    const loginMonitor = async (email: any, password: any) => {
        const res = await fetch(`http://192.168.50.154:8888/monitors/${email}/${password}`)
        return await res.json()
    }

    const goToMonitorRegistration = () => {
        history.push("/MonitorRegistration", historyState)
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle className="ion-text-center">Moniteur Login</IonTitle>
                        <IonButton onClick={e => {e.preventDefault(); history.push('/home', historyState)}} ><IonIcon icon={home} /></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: "70px", color: "#0040ff", }}
                                icon={business}
                                className="ion-margin"
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={mailSharp} style={{ marginRight: 5 }}></IonIcon> Email</IonLabel>
                                <IonInput
                                    type="text"
                                    {...register("email", { required: true, pattern: patternEmail })} >
                                </IonInput>
                            </IonItem>
                            {errors.email && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> email invalide</p>}
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
                            {errors.password && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Password invalide</p>}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" type="submit">
                                Login
                            </IonButton>
                            <p style={{ fontSize: "medium" }}>
                                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); goToMonitorRegistration() }}>Sign up!</a>
                            </p>
                        </IonCol>
                    </IonRow>
                </form>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Mot de passe ou email incorrect !"
                    duration={3000}
                />
            </IonContent>
        </IonPage>
    )
}

export default MonitorLogin
