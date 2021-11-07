import { IonBadge, IonButton, IonInput, IonItem, IonLabel, IonTitle, IonToast } from '@ionic/react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const AdminAuthLogin = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});
    
    const onSubmit = (admin: any) => {
        adminLogin(admin.username, admin.password)
        .then((data: any) => data.username != null ? history.push("/admin", {admin: data}) : setShowToastAlert(true))
    }

    const adminLogin = async (username: any, password: any) => {
        const res = await fetch(`http://localhost:8888/admin/${username}/${password}`)
        return await res.json()
    }

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Connexion</IonTitle>
            <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                    <IonLabel position="floating">Nom d'utilisateur: </IonLabel>
                    <IonInput type="text" {...register("username", { required: true })}/>
                    { errors.username &&  <IonBadge color="danger">Nom d'utilsateur invalide</IonBadge> }
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

export default AdminAuthLogin
