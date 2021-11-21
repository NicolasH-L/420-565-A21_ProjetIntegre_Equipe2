import { IonTitle, IonButton, IonInput, IonItem, IonLabel, IonToast, IonBadge } from '@ionic/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const StudentAuthLogin = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange"
	});
    
    const onSubmit = (student: any) => {
        studentLogin(student.matricule, student.password)
        .then((data: any) => data.matricule != null ? onSignIn(data) : setShowToastAlert(true))
    }

    const onSignIn = (student: any) => {
        sessionStorage.setItem("student", JSON.stringify(student))
        history.push("/student", {student})
    }

    const studentLogin = async (matricule: any, password: any) => {
        const res = await fetch(`http://localhost:8888/students/${matricule}/${password}`)
        return await res.json()
    }

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Connexion</IonTitle>
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

export default StudentAuthLogin
