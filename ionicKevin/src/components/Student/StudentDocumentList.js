import React, { useState, useEffect } from 'react'
import { IonItem, IonList, IonLabel } from '@ionic/react'
import { useHistory } from 'react-router-dom'

const StudentDocumentList = ({uploadFileName}) => {
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
    }, [uploadFileName.length])

    const fetchDocuments = async (studentId) => {
        const res = await fetch(`http://localhost:8888/document/get-all-documents/${studentId}`)
        return await res.json()
    }

    /*const viewDocumentCv = async (document) => {
        history.push("/ViewDocument", document)
    }*/

    return (
        <IonList className="ion-margin-vertical">
            {documents.map((document) => (
                <IonItem key={document.idDocument}>
                    <IonLabel>
                        <h4>{document.documentName}</h4>
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}

export default StudentDocumentList
