import { IonBadge, IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToast } from '@ionic/react';
import { result } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { RegexPattern } from '../RegexPattern';

const AdminOffer = () => {
    const [showToastAlert, setShowToastAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
    });

    const [monitors, setMonitors] = useState([])
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString().split('T')[0]

    useEffect(() => {
        const getMonitors = async () => {
            const monitorsFromServer = await fetchMonitors()
            setMonitors(monitorsFromServer)
        }
        getMonitors()
    }, [])

    const fetchMonitors = async () => {
        const res = await fetch('http://localhost:8888/monitors/get-all-monitors')
        return await res.json()
    }

    const onSubmit = (offer: any) => {
        offer.displayDate = offer.displayDate.split('T')[0]
        offer.deadlineDate = offer.deadlineDate.split('T')[0]
        offer.startInternshipDate = offer.startInternshipDate.split('T')[0]
        offer.endInternshipDate = offer.endInternshipDate.split('T')[0]
        verifyMonitorExists(offer.monitorEmail)
            .then((data) => data ? submitOffer() : setShowToastAlert(true))
            .catch(() => showAlert("Aucun compte moniteur existant avec ce email!"));

        function submitOffer() {
            addOffer(offer)
                .then((data) => data.jobTitle != null ? submitOfferSuccess() : showAlert("Impossible de créer l'offre, veuillez réessayer!"))
        }

        function submitOfferSuccess() {
            showAlert("Offre déposée avec succès");
        }
    }

    const showAlert = async (message: string) => {
        setAlertMessage(message);
        setShowToastAlert(true)
    }

    const addOffer = async (offer: any) => {
        const result = await fetch('http://localhost:8888/offer/saveOffer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(offer)
            })
        return await result.json()
    }

    const verifyMonitorExists = async (email: any) => {
        const res = await fetch(`http://localhost:8888/monitors/monitorEmailExists/${email}`)
        return await res.json()
    }

    const findFutureDate = () => {
        let futureDate = new Date(timeElapsed)
        futureDate.setDate(futureDate.getDate() + 220)
        let futureDateFormat = futureDate.toISOString().split('T')[0]
        return futureDateFormat
    }

    return (
        <div>
            <IonTitle className="ion-text-center ion-margin-vertical">Déposer une offre de stage</IonTitle>
            <form className="ion-padding" id="AdminOfferForm" onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                    <IonLabel position="floating">Nom de l'entreprise: </IonLabel>
                    <IonInput type="text"  {...register("companyName", { required: true, pattern: RegexPattern.getPatternCompany() })} />
                    {errors.companyName && <IonBadge color="danger">Nom invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Poste: </IonLabel>
                    <IonInput type="text"  {...register("jobTitle", { required: true, pattern: RegexPattern.getPatternGeneral() })} />
                    {errors.jobTitle && <IonBadge color="danger">Poste invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Courriel du représentant de l'entreprise: </IonLabel>
                    <IonSelect placeholder="Veuillez choisir un représentant" {...register("monitorEmail", { required: true, pattern: RegexPattern.getPatternEmail() })}>
                        {monitors.map((monitor: any) => (
                            <IonSelectOption key={monitor.id} value={monitor.email}>{monitor.email}</IonSelectOption>
                        ))}
                    </IonSelect>
                    {errors.monitorEmail && <IonBadge color="danger">Email invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Adresse: </IonLabel>
                    <IonInput type="text"  {...register("address", { required: true, pattern: RegexPattern.getPatternGeneral() })} />
                    {errors.address && <IonBadge color="danger">Adresse invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Horaire de travail: </IonLabel>
                    <IonInput type="text"  {...register("jobSchedules", { required: true, pattern: RegexPattern.getPatternGeneral() })} />
                    {errors.jobSchedules && <IonBadge color="danger">Hoaraire de travail invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Heures de travail: </IonLabel>
                    <IonInput type="text"  {...register("workingHours", { required: true, pattern: RegexPattern.getPatternNumber() })} />
                    {errors.workingHours && <IonBadge color="danger">Heures de travail invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Salaire: </IonLabel>
                    <IonInput type="text"  {...register("salary", { required: true, pattern: RegexPattern.getPatternNumber() })} />
                    {errors.salary && <IonBadge color="danger">Salaire invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Compétences: </IonLabel>
                    <IonTextarea defaultValue="" {...register("skills", { required: true, pattern: RegexPattern.getPatternGeneral() })} />
                    {errors.skills && <IonBadge color="danger">Compétences invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description: </IonLabel>
                    <IonTextarea {...register("description", { required: true, pattern: RegexPattern.getPatternGeneral() })} />
                    {errors.description && <IonBadge color="danger">Description invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Date d'affichage: </IonLabel>
                    <IonDatetime
                        displayFormat="DD/MM/YYYY"
                        min={today} max={findFutureDate()}
                        {...register("displayDate", { required: true, pattern: RegexPattern.getPatternGeneral() })}
                    />
                    {errors.displayDate && <IonBadge color="danger">Date invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Date limite: </IonLabel>
                    <IonDatetime
                        displayFormat="DD/MM/YYYY"
                        min={today} max={findFutureDate()}
                        {...register("deadlineDate", { required: true, pattern: RegexPattern.getPatternGeneral() })}
                    />
                    {errors.deadlineDate && <IonBadge color="danger">Date invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Début de stage: </IonLabel>
                    <IonDatetime
                        displayFormat="DD/MM/YYYY"
                        min={today} max={findFutureDate()}
                        {...register("startInternshipDate", { required: true, pattern: RegexPattern.getPatternGeneral() })}
                    />
                    {errors.startInternshipDate && <IonBadge color="danger">Date invalide</IonBadge>}
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Fin de stage: </IonLabel>
                    <IonDatetime
                        displayFormat="DD/MM/YYYY"
                        min={today} max={findFutureDate()}
                        {...register("endInternshipDate", { required: true, pattern: RegexPattern.getPatternGeneral() })}
                    />
                    {errors.endInternshipDate && <IonBadge color="danger">Date invalide</IonBadge>}
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">Soumettre</IonButton>
            </form>
            <IonToast
                isOpen={showToastAlert}
                onDidDismiss={() => setShowToastAlert(false)}
                message={alertMessage}
                duration={3000}
            />
        </div>
    )
}

export default AdminOffer
