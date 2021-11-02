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
import { alertCircleOutline, idCardSharp, lockClosedSharp, personCircle } from 'ionicons/icons'
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const StudentLogin: React.FC = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const history = useHistory();
    const initialValues = {
        matricule: '',
        password: ''
    };

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = (student: any) => {
        loginStudent(student.matricule, student.password)
            .then((data: any) => data.matricule !== null ? history.push("/Home", { student: data }) : setShowToastAlert1(true))
            .catch(() => setShowToastAlert1(true))
    }

    const loginStudent = async (matricule: any, password: any) => {
        const res = await fetch(`http://localhost:8888/students/${matricule}/${password}`)
        return await res.json()
    }

    function goToStudentRegistration() {
        history.push("/StudentRegistration", {})
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-center">Student Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: "70px", color: "#0040ff", }}
                                icon={personCircle}
                                className="ion-margin"
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={idCardSharp} style={{ marginRight: 5 }}></IonIcon> Matricule</IonLabel>
                                <IonInput
                                    type="text"
                                    {...register("matricule", { required: true, pattern: /^[0-9]{7}$/i })} >
                                </IonInput>
                            </IonItem>
                            {errors.matricule && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Matricule invalide</p>}
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
                                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); goToStudentRegistration() }}>Sign up!</a>
                            </p>
                        </IonCol>
                    </IonRow>
                </form>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Mot de passe ou matricule incorrect !"
                    duration={3000}
                />
            </IonContent>
        </IonPage>
    );
};
export default StudentLogin;