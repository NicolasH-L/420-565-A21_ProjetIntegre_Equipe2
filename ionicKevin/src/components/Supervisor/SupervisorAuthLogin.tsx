import { IonBadge, IonButton, IonInput, IonItem, IonLabel, IonTitle, IonToast } from '@ionic/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const SupervisorAuthLogin = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});
    
    const onSubmit = (supervisor: any) => {
        supervisorLogin(supervisor.matricule, supervisor.password)
        .then((data: any) => data.matricule != null ? history.push("/Supervisor", {supervisor: data}) : setShowToastAlert(true))
    }

    const supervisorLogin = async (matricule: any, password: any) => {
        const res = await fetch(`http://localhost:8888/supervisors/${matricule}/${password}`)
        return await res.json()
    }

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Inscription</IonTitle>
            <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                    <IonLabel position="floating">Matricule: </IonLabel>
                    <IonInput type="text" {...register("matricule", { required: true })}/>
                    { errors.matricule &&  <IonBadge color="danger">Matricule invalide</IonBadge> }
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Mot de passe </IonLabel>
                    <IonInput type="password" {...register("password", { required: true })}/>
                    { errors.password &&  <IonBadge color="danger">Mot de passe invalide</IonBadge> }
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">Se connecter</IonButton>
            </form>
            <IonToast 
                isOpen={showToastAlert}
                onDidDismiss={() => setShowToastAlert(false)}
                message="Erreur dans les identifiants!"
                duration={2000}
            />
        </div>
    )
}

export default SupervisorAuthLogin
