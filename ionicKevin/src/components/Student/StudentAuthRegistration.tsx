import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCol, IonGrid, IonRow, IonInput, IonItem, IonLabel, IonList, IonToast, IonBadge } from '@ionic/react'
import { text } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { RegexPattern } from '../RegexPattern';
import { useForm } from 'react-hook-form';

const StudentAuthRegistration = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});

    const onSubmit = (student: any) => {
        addStudent(student)
        .then((data: any) => data.matricule !== undefined ? history.push("/") : setShowToastAlert(true))
        .catch(() => setShowToastAlert(true));
    }

    const addStudent = async (student: any) => {
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
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Inscription</IonTitle>
            <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                    <IonLabel position="floating">Nom: </IonLabel>
                    <IonInput type="text"  {...register("lastName", { required: true, pattern: RegexPattern.getPatternName() })}/>
                    { errors.lastName &&  <IonBadge color="danger">First name is required</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prénom: </IonLabel>
                    <IonInput type="text" {...register("firstName", { required: true, pattern: RegexPattern.getPatternName() })}/>
                    { errors.firstName &&  <IonBadge color="danger">First name is required</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Matricule: </IonLabel>
                    <IonInput type="text" {...register("matricule", { required: true, pattern: RegexPattern.getPatternMatricule() })}/>
                    { errors.matricule &&  <IonBadge color="danger">Matricule doit contenir 7 chiffres</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Mot de passe </IonLabel>
                    <IonInput type="password" {...register("password", { required: true, pattern: RegexPattern.getPatternPassword() })}/>
                    { errors.password &&  <IonBadge color="danger">First name is required</IonBadge> }
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">S'inscrire</IonButton>
            </form>
            <IonToast 
                isOpen={showToastAlert}
                onDidDismiss={() => setShowToastAlert(false)}
                message="Matricule existant!"
                duration={2000}
            />
        </div>
    )
}

export default StudentAuthRegistration
