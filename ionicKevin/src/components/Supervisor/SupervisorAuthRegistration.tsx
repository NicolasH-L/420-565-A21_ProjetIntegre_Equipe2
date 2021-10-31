import { IonBadge, IonButton, IonInput, IonItem, IonLabel, IonTitle, IonToast } from '@ionic/react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { RegexPattern } from '../RegexPattern';

const SupervisorAuthRegistration = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});

    const onSubmit = (supervisor: any) => {
        addSupervisor(supervisor)
        .then((data: any) => data.matricule !== undefined ? history.push("/authentificationPage/supervisorAuth") : setShowToastAlert(true))
        .catch(() => setShowToastAlert(true));
    }

    const addSupervisor = async (supervisor: any) => {
        const result = await fetch('http://localhost:8888/supervisors/register',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(supervisor)
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
                    <IonLabel position="floating">Matricule: </IonLabel>
                    <IonInput type="text" {...register("matricule", { required: true, pattern: RegexPattern.getPatternMatricule() })}/>
                    { errors.matricule &&  <IonBadge color="danger">Matricule doit contenir 7 chiffres</IonBadge> }
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

export default SupervisorAuthRegistration
