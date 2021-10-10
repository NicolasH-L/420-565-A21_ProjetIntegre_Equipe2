import React from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import { useState, useEffect } from 'react'

const AdmindocumentCvList = () => {
    const [documents, setDocuments] = useState([])
    const history = useHistory()
    const student = history.location.state

    useEffect(() => {
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments()
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [])

    const fetchDocuments = async () => {
        const res = await fetch('http://localhost:8888/document/get-all-documents')
        return await res.json()
    }

    return (
        <div className="grad">
            <AdminNavbar />
            <h2 className="text-center">Étudiant: {student.firstName + " " + student.lastName}</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom: </th>
                            <th scope="col">Validité du CV: </th>
                            <th scope="col">Document: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document) => (
                            <tr className={`${document.isCvValid ? 'table-success' : 'table-warning'}`} key={document.idDocument}>
                                <th>{document.documentName}</th>
                                <td>{/*document.isCvValid ? "Valide" : "En attente"*/}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); /*viewDocumentCvList(document)*/ }}>Consulter</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdmindocumentCvList
