import { IonContent, IonPage, IonText, IonItem, IonLabel, IonAlert, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonCard, IonCardHeader, IonCardContent, IonTextarea, IonBadge, IonIcon, IonToast } from "@ionic/react";
import { alertCircleOutline, home, idCardOutline, idCardSharp, lockClosedOutline, lockClosedSharp, personCircleSharp, personOutline, personSharp, refresh, refreshCircleSharp, refreshSharp, sendSharp } from "ionicons/icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const StudentRegistration: React.FC = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const [showToastAlert2, setShowToastAlert2] = useState(false)
    const history = useHistory();
    const historyState = history.location.state
    const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/
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
            .then((data: any) => data.matricule !== undefined ? setShowToastAlert2(true) : setShowToastAlert1(true))
            .catch(() => setShowToastAlert1(true))
    }

    const postStudent = async (student: any) => {
        const result = await fetch('http://192.168.50.154:8888/students/register',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        return await result.json();
    }

    function goToStudentLogin() {
        history.push("/studentLogin", historyState)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle size="large" className="ion-text-center">Inscription Étudiant</IonTitle>
                        <IonButton onClick={e => {e.preventDefault(); history.push('/home', historyState)}} ><IonIcon icon={home} /></IonButton>
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
                                <IonLabel position="floating"><IonIcon icon={idCardSharp} style={{ marginRight: 5 }}></IonIcon>Matricule</IonLabel>
                                <IonInput type="text" {...register("matricule", { required: true, pattern: /^[0-9]{7}$/i })}></IonInput>
                                {errors.matricule && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Matricule invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={lockClosedSharp} style={{ marginRight: 5 }}></IonIcon>Password</IonLabel>
                                <IonInput type="password" {...register("password", { required: true, pattern: patternPassword })}></IonInput>
                                {errors.password && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Password invalide</p>}
                            </IonItem>
                            <IonButton type="submit" className="ion-margin">Soumettre<IonIcon icon={sendSharp} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                            <IonButton type="reset" className="ion-margin">Réinitialiser<IonIcon icon={refreshSharp} style={{ marginLeft: 5 }}></IonIcon> </IonButton>
                            <p style={{ fontSize: "medium" }}>
                                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); goToStudentLogin() }}>Sign in!</a>
                            </p>
                        </IonCardContent>
                    </form>
                </IonCard>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Erreur: Matricule existant !"
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
export default StudentRegistration;
