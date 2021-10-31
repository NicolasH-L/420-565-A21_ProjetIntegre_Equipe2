import { IonBadge, IonButton, IonInput, IonItem, IonLabel, IonTitle, IonToast } from '@ionic/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { RegexPattern } from '../RegexPattern';

const MonitorAuthRegistration = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});
    
    const onSubmit = (monitor: any) => {
        addMonitor(monitor)
        .then((data: any) => data.email !== undefined ? history.push("/authentificationPage/monitorAuth") : setShowToastAlert(true))
        .catch(() => setShowToastAlert(true));
    }

    const addMonitor = async (monitor: any) => {
        const result = await fetch('http://localhost:8888/monitors/register',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(monitor)
          })
        return await result.json()
      }

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Inscription</IonTitle>
            <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                    <IonLabel position="floating">Nom: </IonLabel>
                    <IonInput type="text"  {...register("lastName", { required: true, pattern: RegexPattern.getPatternName() })}/>
                    { errors.lastName &&  <IonBadge color="danger">Nom invalide</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prénom: </IonLabel>
                    <IonInput type="text" {...register("firstName", { required: true, pattern: RegexPattern.getPatternName() })}/>
                    { errors.firstName &&  <IonBadge color="danger">Prénom invalide</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Nom de l'entreprise: </IonLabel>
                    <IonInput type="text" {...register("companyName", { required: true, pattern: RegexPattern.getPatternCompany() })}/>
                    { errors.companyName &&  <IonBadge color="danger">Nom de l'entreprise invalide</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Courriel: </IonLabel>
                    <IonInput type="text" {...register("email", { required: true, pattern: RegexPattern.getPatternEmail() })}/>
                    { errors.email &&  <IonBadge color="danger">Courriel invalide</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Mot de passe </IonLabel>
                    <IonInput type="password" {...register("password", { required: true, pattern: RegexPattern.getPatternPassword() })}/>
                    { errors.password &&  <IonBadge color="danger">Mot de passe invalide</IonBadge> }
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

export default MonitorAuthRegistration
