import React, { useState } from 'react'
import { IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonItem, IonLabel } from '@ionic/react'
import axios from "axios"
import _, { lastIndexOf } from 'lodash'
import { useHistory } from 'react-router-dom'
import StudentDocumentList from './StudentDocumentList'

const StudentDocuments = () => {
    const [uploadFile, setUploadFile] = useState()
    const [uploadFileName, setUploadFileName] = useState("")
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState === undefined ? JSON.parse(sessionStorage.getItem("student")) : historyState.student

    const uploadDocument = () => {
        let documentSession = "winter2022"

        console.log(uploadFile)
        setUploadFileName(uploadFileName.substr(0, uploadFileName.lastIndexOf(".")))

        if (typeof (uploadFile) !== 'undefined' && !_.isEmpty(uploadFileName)) {
            var fileSignature = uploadFileName + ":" + student.id + ":" + documentSession
            var fileSignatureJSON = JSON.stringify(fileSignature)
            const formData = new FormData()
            formData.append("uploadFile", uploadFile, fileSignatureJSON)

            axios
                .post("http://localhost:8888/uploadcv", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
                .then((response) => {
                    alert("Cv téléverser avec succès")
                })
                .catch((error) => {
                    console.log(error)
                    alert("Une erreur est survenue lors du transfert de fichier")
                })
        } else {
            alert("Une erreur est survenue lors du transfert de fichier")
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Documents</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                            setUploadFile(e.target.files[0]);
                            setUploadFileName(e.target.files[0].name)
                        }}
                    />
                </IonItem>
                <IonButton
                    size="block"
                    color="primary"
                    className="ion-margin-vertical"
                    onClick={e => { e.preventDefault(); uploadDocument() }}
                >
                    Envoyer
                </IonButton>
                <StudentDocumentList uploadFileName={uploadFileName}/>
            </IonContent>
        </IonPage>
    )
}

export default StudentDocuments
