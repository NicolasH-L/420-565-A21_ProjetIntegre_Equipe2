import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonMenuButton } from "@ionic/react";
import { home, business, alertCircleOutline, cash, briefcase, mail, hourglass, timeOutline, calendar, arrowDown, location } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';


const AdminOfferForm: React.FC = () => {
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const [showToastAlert2, setShowToastAlert2] = useState(false)
    const [monitors, setMonitors] = useState([])
    const patternGeneral = /^[^ ]+([ ]{0,1}[^ ]+)+$/
    const patternNumber = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/
    const history = useHistory();
    const historyState: any = history.location.state

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]
    const initialValues = {
        monitorEmail: '',
        companyName: '',
        address: '',
        salary: '',
        jobTitle: '',
        description: '',
        skills: '',
        jobSchedules: '',
        workingHours: '',
        isValid: false,
        state: '',
        displayDate: '',
        deadlineDate: '',
        startInternshipDate: '',
        endInternshipDate: '',
        weeksBetweenDates: '',
        session: '',
    };

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    useEffect(() => {
        if (historyState !== undefined) {
            const admin: any = historyState.admin
        }
        const getMonitors = async () => {
            const monitorsFromServer = await fetchMonitors()
            setMonitors(monitorsFromServer)
        }
        getMonitors()
    }, [])

    const fetchMonitors = async () => {
        const res = await fetch('http://192.168.50.154:8888/monitors/get-all-monitors')
        return await res.json()
    }


    const onSubmit = (offer: any) => {
        offer.monitor =
            postOffer(offer)
                .then((data: any) => data.monitorEmail !== undefined ? setShowToastAlert2(true) : setShowToastAlert1(true))
                .catch(() => setShowToastAlert1(true))
    }

    const postOffer = async (offer: any) => {
        const result = await fetch('http://192.168.50.154:8888/offer/saveOffer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await result.json();
    }

    const findFutureDate = () => {
        let futureDate = new Date(timeElapsed)
        futureDate.setDate(futureDate.getDate() + 220)
        let futureDateFormat = futureDate.toISOString().split('T')[0]
        return futureDateFormat
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonTitle size="large" className="ion-text-center"></IonTitle>
                        <IonButton onClick={(e) => history.push('/home', {})} ><IonIcon icon={home} /></IonButton>
                        <IonButton onClick={(e) => history.push("/adminOfferList")} >liste offres</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        Déposer offre de stage
                    </IonCardHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
                        <IonCardContent>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={business} style={{ marginRight: 5 }}></IonIcon>Nom de l'entreprise</IonLabel>
                                <IonInput type="text" {...register("companyName", { required: true, pattern: patternGeneral })}></IonInput>
                                {errors.companyName && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Nom d'entreprise invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={location} style={{ marginRight: 5 }}></IonIcon>Adresse</IonLabel>
                                <IonInput type="text"{...register("address", { required: true, pattern: patternGeneral })}></IonInput>
                                {errors.address && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Adresse invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={cash} style={{ marginRight: 5 }}></IonIcon>Salaire</IonLabel>
                                <IonInput type="text" {...register("salary", { required: true, pattern: patternNumber })}></IonInput>
                                {errors.salary && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Salaire invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={briefcase} style={{ marginRight: 5 }}></IonIcon>Position</IonLabel>
                                <IonTextarea {...register("jobTitle", { required: true, pattern: patternGeneral })}></IonTextarea>
                                {errors.jobTitle && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Position invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={briefcase} style={{ marginRight: 5 }}></IonIcon>Description</IonLabel>
                                <IonTextarea {...register("description", { required: true, pattern: patternGeneral })}></IonTextarea>
                                {errors.description && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Description invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={briefcase} style={{ marginRight: 5 }}></IonIcon>Compétences</IonLabel>
                                <IonInput type="text" {...register("skills", { required: true, pattern: patternGeneral })}></IonInput>
                                {errors.skills && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Compétences invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={mail} style={{ marginRight: 5 }}></IonIcon>Courriel du représentant</IonLabel>
                                <IonSelect interface="popover" {...register("monitorEmail", { required: true })}>
                                    {monitors.map((monitor: any) => (
                                        <IonSelectOption value={monitor.email} key={monitor.id}>{monitor.email}</IonSelectOption>
                                    ))}
                                </IonSelect>
                                {errors.monitorEmail && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Courriel invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={hourglass} style={{ marginRight: 5 }}></IonIcon>Heures de travail</IonLabel>
                                <IonInput type="number" {...register("workingHours", { required: true, pattern: patternNumber })}></IonInput>
                                {errors.workingHours && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Heures de travail invalides</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={timeOutline} style={{ marginRight: 5 }}></IonIcon>Horaire de travail</IonLabel>
                                <IonSelect interface="popover" {...register("jobSchedules", { required: true, pattern: patternGeneral })}>
                                    <IonSelectOption value="Temps plein">Temps plein</IonSelectOption>
                                    <IonSelectOption value="Temps partiel">Temps partiel</IonSelectOption>
                                </IonSelect>
                                {errors.jobSchedules && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Horaire de travail invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Date d'affichage</IonLabel>
                                <IonDatetime displayFormat="YYYY-MM-DD" {...register("displayDate", { required: true })} min={today} max={findFutureDate()} />
                                {errors.displayDate && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Date d'affichage invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Date limite</IonLabel>
                                <IonDatetime displayFormat="YYYY-MM-DD" {...register("deadlineDate", { required: true })} min={today} max={findFutureDate()} />
                                {errors.deadlineDate && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Date limite invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Début Stage</IonLabel>
                                <IonDatetime displayFormat="YYYY-MM-DD" {...register("startInternshipDate", { required: true })} min={today} max={findFutureDate()} />
                                {errors.startInternshipDate && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Début Stage invalide</p>}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"><IonIcon icon={calendar} style={{ marginRight: 5 }}></IonIcon>Fin Stage</IonLabel>
                                <IonDatetime displayFormat="YYYY-MM-DD" {...register("endInternshipDate", { required: true })} min={today} max={findFutureDate()} />
                                {errors.endInternshipDate && <p style={{ color: "red", fontWeight: 600 }}><IonIcon icon={alertCircleOutline}></IonIcon> Fin Stage invalide</p>}
                            </IonItem>
                            <IonButton color="success" type="submit" className="ion-margin">Déposer<IonIcon icon={arrowDown} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                        </IonCardContent>
                    </form>
                </IonCard>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Erreur: Veuillez réessayer!"
                    duration={3000}
                />
                <IonToast
                    color="success"
                    isOpen={showToastAlert2}
                    onDidDismiss={() => setShowToastAlert2(false)}
                    message="Offre de stage ajoutée avec succès!"
                    duration={3000}
                />
            </IonContent>
        </IonPage >
    )
}

export default AdminOfferForm
