import { IonBadge, IonButton, IonInput, IonItem, IonLabel, IonTitle, IonToast } from '@ionic/react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const MonitorAuthLogin = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});

    const onSubmit = (monitor: any) => {
        monitorLogin(monitor.email, monitor.password)
        .then((data: any) => data.email != null ? history.push("/Monitor", {monitor: data}) : setShowToastAlert(true))
    }

    const monitorLogin = async (email: any, password: any) => {
        const res = await fetch(`http://localhost:8888/monitors/${email}/${password}`)
        return await res.json()
    }

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Connexion</IonTitle>
            <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                    <IonLabel position="floating">Courriel: </IonLabel>
                    <IonInput type="text" {...register("email", { required: true })}/>
                    { errors.email &&  <IonBadge color="danger">Courriel invalide</IonBadge> }
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

export default MonitorAuthLogin
