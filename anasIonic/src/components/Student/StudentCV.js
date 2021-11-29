import { IonPage, IonCardSubtitle, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonToast, IonCardTitle, IonText } from "@ionic/react";
import { alertCircleOutline, arrowUp, home } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const StudentCV = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [uploadFile, setUploadFile] = useState()
    const [uploadFileName, setUploadFileName] = useState('')
    const [showToastAlert1, setShowToastAlert1] = useState(false)
    const [showToastAlert2, setShowToastAlert2] = useState(false)

    const uploadCV = () => {
        let fileNamePrefix = uploadFileName.substr(0, uploadFileName.lastIndexOf('.'))
        let documentSession ='winter2022'

        if (typeof (uploadFile) !== 'undefined' && fileNamePrefix.length > 0) {
            let fileSignature = `${fileNamePrefix}:${historyState.student.id}:${documentSession}`
            let fileSignatureJSON = JSON.stringify(fileSignature)
            const formData = new FormData()

            formData.append("uploadFile", uploadFile, fileSignatureJSON)

            axios
                .post("http://192.168.50.154:8888/uploadcv", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
                .then((response) => {
                    setShowToastAlert2(true)
                })
                .catch((error) => {
                    console.log(error)
                    setShowToastAlert1(true)
                })
        } else {
            setShowToastAlert1(true)
        }
    }

    const setFile = (data) => {
        if (data.files.length < 1) {
            console.log('pas de fichier choisi')
            setUploadFile(undefined)
            setUploadFileName('')
            return
        }
        setUploadFileName(data.files[0].name)
        setUploadFile(data.files[0])
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Étudiant</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={(e) => history.push('/studentDash', historyState)} ><IonIcon icon={home} /></IonButton>
                        <IonButton disabled onClick={(e) => history.push('/home', {})} >Offres</IonButton>
                        <IonButton onClick={(e) => history.push('/home', historyState)} >log out</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle className="">Téléverser CV</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem className='ion-margin-vertical'>
                            <input type='file' accept='application/pdf' onChange={(e) => setFile(e.target)} ></input>
                        </IonItem>
                        <IonButton color="success" type="submit" className="ion-margin" onClick={(e) => { e.preventDefault(); uploadCV() }}>Téléverser<IonIcon icon={arrowUp} style={{ marginLeft: 5 }}></IonIcon></IonButton>
                    </IonCardContent>
                </IonCard>
                <IonToast
                    color="danger"
                    isOpen={showToastAlert1}
                    onDidDismiss={() => setShowToastAlert1(false)}
                    message="Erreur: Une erreur est survenue lors du transfert du fichier"
                    duration={3000}
                />
                <IonToast
                    color="success"
                    isOpen={showToastAlert2}
                    onDidDismiss={() => setShowToastAlert2(false)}
                    message="Cv televerse avec succes!"
                    duration={3000}
                />
            </IonContent>
        </IonPage>
    )
}

export default StudentCV
