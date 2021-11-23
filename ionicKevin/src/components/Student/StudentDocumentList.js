import React, { useState, useEffect } from 'react'
import { IonItem, IonList, IonLabel, IonButton } from '@ionic/react'
import { useHistory } from 'react-router-dom'

const StudentDocumentList = (reloadDocumentList) => {
    const [documents, setDocuments] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState === undefined ? JSON.parse(sessionStorage.getItem("student")) : historyState.student

    useEffect(() => {
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments(student.id)
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [])

    useEffect(() => {
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments(student.id)
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [reloadDocumentList])

    const fetchDocuments = async (studentId) => {
        const res = await fetch(`http://localhost:8888/document/get-all-documents/${studentId}`)
        return await res.json()
    }

    /*const viewDocumentCv = async (document) => {
          let blob = new Blob([base64ToArrayBuffer(document.data)], {type: 'application/pdf'});
          let blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
    }*/

    /*function base64ToArrayBuffer(base64) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
      }*/

    return (
        <IonList className="ion-margin-vertical">
            {documents.map((document) => (
                <IonItem key={document.idDocument}>
                    <IonLabel>
                        <h4>{document.documentName}</h4>
                    </IonLabel>
                    <IonButton
                        color="primary"
                        slot="end"
                        onClick={e => { e.preventDefault(); /*viewDocumentCv(document)*/ }}
                    >
                        Consulter
                    </IonButton>
                </IonItem>
            ))}
        </IonList>
    )
}

export default StudentDocumentList
