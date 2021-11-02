import { IonContent, IonPage, IonText, IonItem, IonLabel, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonCard, IonCardHeader, IonCardContent, IonTextarea, IonBadge, IonIcon } from "@ionic/react";
import { alertCircleOutline, idCardOutline, idCardSharp, lockClosedOutline, lockClosedSharp, personCircleSharp, personOutline, personSharp, refresh, refreshCircleSharp, refreshSharp, sendSharp } from "ionicons/icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
const StudentRegistration: React.FC = () => {
    const initialValues = {
        lastName: '',
        firstName: '',
        matricule: '',
        password: ''
    };

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const resetForm = () => {
        reset(initialValues)
    }

    const onSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large" className="ion-text-center">Student Registration</IonTitle>
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
                                <IonInput type="text" {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })}></IonInput>
                                {errors.lastName && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Nom invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={personSharp} style={{ marginRight: 5 }}></IonIcon>Prénom</IonLabel>
                                <IonInput type="text" {...register("firstName", { required: true, pattern: /^[A-Za-z]+$/i })}></IonInput>
                                {errors.firstName && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Prénom invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={idCardSharp} style={{ marginRight: 5 }}></IonIcon>Matricule</IonLabel>
                                <IonInput type="text" {...register("matricule", { required: true, pattern: /^[0-9]+$/i })}></IonInput>
                                {errors.matricule && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Matricule invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={lockClosedSharp} style={{ marginRight: 5 }}></IonIcon>Password</IonLabel>
                                <IonInput type="password" {...register("password", { required: true, pattern: /^[A-Za-z]+$/i })}></IonInput>
                                {errors.password && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Password invalide</p>}
                            </IonItem>
                            <IonButton type="submit" className="ion-margin">Soumettre<IonIcon icon={sendSharp} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                            <IonButton onClick={(e) => resetForm()}>Réinitialier<IonIcon icon={refreshSharp} style={{ marginLeft: 5 }}></IonIcon> </IonButton>
                        </IonCardContent>
                    </form>
                </IonCard>
            </IonContent>
        </IonPage >
    );
};
export default StudentRegistration;