import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer'
import '../ResponsiveTable.css'
import '../ResponsiveButtons.css'

const AdminStudentCvList = () => {
    const typeNotification = "CV"
    const messageValidCV = "Votre CV a été accepté"
    const messageInvalidCV = "Votre CV a été refusé"
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const admin = historyState.admin
    const [documents, setDocuments] = useState([])
    const [notification, setNotification] = useState({
        typeNotification: typeNotification, message: "", session: admin.actualSession
    })

    useEffect(() => {
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments(student)
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [])

    const fetchDocuments = async (student) => {
        const res = await fetch(`http://localhost:8888/document/get-all-documents/${student.id}`)
        return await res.json()
    }

    const viewDocumentCv = async (document) => {
        history.push("/ViewDocument", document)
    }

    const updateCvStatus = async (document, isValid) => {
        const res = await fetch(`http://localhost:8888/document/update-document/${document.idDocument}/status/${isValid}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(document)
            })
        const data = await res.json()

        setDocuments(
            documents.map(
                (document1) => document1.idDocument === document.idDocument ? { ...document1, isValid: data.isValid, isRefused: data.isRefused } : document1
            )
        )
        isDocumentValid(isValid)
    }

    const isDocumentValid = (isValid) => {
        if (!isValid)
            notification.message = messageInvalidCV
        else
            notification.message = messageValidCV
        createNotificationStudent(notification)
    }

    const createNotificationStudent = async (notification) => {
        const result = await fetch(`http://localhost:8888/notification/save-notification-for-student/${student.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(notification)
            })
        return await result.json()
    }

    const displayButtons = (document) => {
        return (
            <>
                <button className="btn btn-success mx-2" onClick={e => { e.preventDefault(); updateCvStatus(document, true) }}>
                    <span className="hideButtonText">Valider</span>
                    <span className="hideButtonIcon"><i className="fas fa-check"></i></span>
                </button>
                <button className="btn btn-danger mx-2" onClick={e => { e.preventDefault(); updateCvStatus(document, false) }}>
                    <span className="hideButtonText">Refuser</span>
                    <span className="hideButtonIcon"><i className="fas fa-times"></i></span>
                </button>
            </>
        )
    }

    const filterDocuments = (document) => {
        return document.session === admin.actualSession
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <div>
                    <h2 className="text-center text-light">Étudiant: {student.firstName + " " + student.lastName}</h2>
                </div>
                <div className="justify-content-start d-flex mx-5">
                    <button className="btn btn-light" onClick={e => { e.preventDefault(); history.goBack() }}>
                        <i className="fas fa-angle-double-left"></i> Retour
                    </button>
                </div>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Nom </th>
                                <th scope="col">Validité </th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents
                                .filter(filterDocuments)
                                .map((document) => (
                                    <tr key={document.idDocument}>
                                        <td data-title="Nom">{document.documentName}</td>
                                        <td data-title="Validité">
                                            <h5>
                                                <span className={`badge ${!document.isValid && !document.isRefused ? 'badge-warning' :
                                                    !document.isValid && document.isRefused ? 'badge-danger' : 'badge-success'}`}>
                                                    {!document.isValid && !document.isRefused ? 'En attente' :
                                                        !document.isValid && document.isRefused ? 'Refusé' : 'Valide'}
                                                </span>
                                            </h5>
                                        </td>
                                        <td className="responsiveWidth">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewDocumentCv(document) }}>
                                                <span className="hideButtonText">Consulter</span>
                                                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                            </button>
                                            {!document.isValid && !document.isRefused ? displayButtons(document) : ""}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminStudentCvList
