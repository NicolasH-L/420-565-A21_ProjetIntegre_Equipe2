import { IonContent, IonPage, IonText, IonItem, IonLabel, IonAlert, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonCard, IonCardHeader, IonCardContent, IonTextarea, IonBadge, IonIcon, IonToast } from "@ionic/react";
import { alertCircleOutline, idCardOutline, idCardSharp, lockClosedOutline, lockClosedSharp, personCircleSharp, personOutline, personSharp, refresh, refreshCircleSharp, refreshSharp, sendSharp } from "ionicons/icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
const StudentRegistration: React.FC = () => {
    const [showToastAlert, setShowToastAlert] = useState(false)
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

    const onSubmit = (student: any) => {
        postStudent(student)
            .then((data: any) => data.matricule !== undefined ? alert("Inscription réussie") : setShowToastAlert(true))
            .catch(() => setShowToastAlert(true))
    }

    const postStudent = async (student: any) => {
        const result = await fetch('http://localhost:8888/students/register',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        return await result.json();
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
                            <IonButton type="reset" >Réinitialier<IonIcon icon={refreshSharp} style={{ marginLeft: 5 }}></IonIcon> </IonButton>
                        </IonCardContent>
                    </form>
                </IonCard>
                <IonToast
                    isOpen={showToastAlert}
                    onDidDismiss={() => setShowToastAlert(false)}
                    message="Erreur: Matricule existant!"
                    duration={5000}
                />
            </IonContent>
        </IonPage >
    );
};
export default StudentRegistration;