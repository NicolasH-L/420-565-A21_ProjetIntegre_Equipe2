import { IonContent, IonPage, IonText, IonItem, IonLabel, IonAlert, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonCard, IonCardHeader, IonCardContent, IonTextarea, IonBadge, IonIcon, IonToast } from "@ionic/react";
import { alertCircleOutline, business, businessOutline, businessSharp, home, idCardOutline, idCardSharp, lockClosedOutline, lockClosedSharp, mailOutline, mailSharp, personCircleSharp, personOutline, personSharp, refresh, refreshCircleSharp, refreshSharp, sendSharp } from "ionicons/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const MonitorRegister: React.FC = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const [showToastAlert2, setShowToastAlert2] = useState(false)
    const history = useHistory();
    const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/
    const patternEmail = /^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$/
    const patternCompany = /^[^ ]+([ ]{0,1}[^ ]+)+$/
    const initialValues = {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        companyName: ''
    };

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = (monitor: any) => {
        postMonitor(monitor)
            .then((data: any) => data.email !== undefined ? setShowToastAlert2(true) : setShowToastAlert1(true))
            .catch(() => setShowToastAlert1(true))
    }

    const postMonitor = async (monitor: any) => {
        const result = await fetch('http://192.168.50.154:8888/monitors/register',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(monitor)
            })
        return await result.json();
    }

    function goToMonitorLogin() {
        history.push("/monitorLogin", {})
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle size="large" className="ion-text-center">Inscription Moniteur</IonTitle>
                        <IonButton routerLink={"/home"} ><IonIcon icon={home} /></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        Formulaire d'inscription
                    </IonCardHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
                        <IonCardContent>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={personSharp} style={{ marginRight: 5 }}></IonIcon>Nom</IonLabel>
                                <IonInput type="text" {...register("lastName", { required: true, pattern: patternName })}></IonInput>
                                {errors.lastName && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Nom invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={personSharp} style={{ marginRight: 5 }}></IonIcon>Prénom</IonLabel>
                                <IonInput type="text" {...register("firstName", { required: true, pattern: patternName })}></IonInput>
                                {errors.firstName && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Prénom invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={businessSharp} style={{ marginRight: 5 }}></IonIcon>Nom de l'entreprise</IonLabel>
                                <IonInput type="text" {...register("companyName", { required: true, pattern: patternCompany })}></IonInput>
                                {errors.companyName && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Nom d'entreprise invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={mailSharp} style={{ marginRight: 5 }}></IonIcon>Email</IonLabel>
                                <IonInput type="text" {...register("email", { required: true, pattern: patternEmail })}></IonInput>
                                {errors.email && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Email invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={lockClosedSharp} style={{ marginRight: 5 }}></IonIcon>Password</IonLabel>
                                <IonInput type="password" {...register("password", { required: true, pattern: patternPassword })}></IonInput>
                                {errors.password && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Password invalide</p>}
                            </IonItem>
                            <IonButton type="submit" className="ion-margin">Soumettre<IonIcon icon={sendSharp} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                            <IonButton type="reset" className="ion-margin">Réinitialiser<IonIcon icon={refreshSharp} style={{ marginLeft: 5 }}></IonIcon> </IonButton>
                            <p style={{ fontSize: "medium" }}>
                                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); goToMonitorLogin() }}>Sign in!</a>
                            </p>
                        </IonCardContent>
                    </form>
                </IonCard>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Erreur: email existant !"
                    duration={3000}
                />
                <IonToast
                    color="success"
                    isOpen={showToastAlert2}
                    onDidDismiss={() => setShowToastAlert2(false)}
                    message="Inscription réussie !"
                    duration={3000}
                />
            </IonContent>
        </IonPage >
    );
};

export default MonitorRegister
