import React from 'react'
import StudentNavbar from "./StudentNavbar"
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'


const StudentDocuments = () => {
    const [documents, setDocuments] = useState([])
    const history = useHistory()

    function DisplayDocuments(studentId, fetchDocuments) {
        useEffect(() => {
            const getDocuments = async () => {
                const documentsFromServer = await fetchDocuments(studentId)
                setDocuments(documentsFromServer)
            }
            getDocuments()
        }, [])
    }

    const viewDocumentCv = async (document) => {
        history.push("/AdminViewStudentCV", document)
    }

    if (typeof (history.location.state) !== 'undefined') {
        const studentId = history.location.state.id

        const fetchDocuments = async (studentId) => {
            const res = await fetch(`http://localhost:8888/document/get-all-documents/${studentId}`)
            return await res.json()
        }

        DisplayDocuments(studentId, fetchDocuments)

    } else {
        alert("Erreur lors du chargement de vos documents veuillez vous reconnecter")
        return <Redirect to='/Login' />
    }

    return (
        <div className="grad">
            <StudentNavbar />
            <h2 className="text-center">Portfolio</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom du document </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document) => (
                            <tr key={document.idDocument}>
                                <th>{document.documentName}</th>
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

export default StudentDocuments
