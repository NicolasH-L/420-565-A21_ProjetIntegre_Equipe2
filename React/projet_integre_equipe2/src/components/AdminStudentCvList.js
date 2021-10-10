import React from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import { useState, useEffect } from 'react'

const AdminStudentCvList = () => {
    const [documents, setDocuments] = useState([])
    const history = useHistory()
    const student = history.location.state

    useEffect(() => {
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments(student)
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [])

    const fetchDocuments = async (student) => {
        console.log(student)
        const res = await fetch(`http://localhost:8888/document/get-all-documents/${student.id}`)
        return await res.json()
    }

    const viewDocumentCv = async (document) => {
        history.push("/AdminViewStudentCV", document)
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
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document) => (
                            <tr className={`${document.isCvValid ? 'table-success' : 'table-warning'}`} key={document.idDocument}>
                                <th>{document.documentName}</th>
                                <td>{/*document.isCvValid ? "Valide" : "En attente"*/}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewDocumentCv(document) }}>Consulter</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminStudentCvList
