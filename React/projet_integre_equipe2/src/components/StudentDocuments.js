import React from 'react'
import StudentNavbar from './StudentNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const StudentDocuments = () => {
    const [documents, setDocuments] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student

    useEffect(() => {
        if (historyState === undefined)
            return
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments(student.id)
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [])

    const fetchDocuments = async (studentId) => {
        const res = await fetch(`http://localhost:8888/document/get-all-documents/${studentId}`)
        return await res.json()
    }

    const viewDocumentCv = async (document) => {
        history.push("/ViewDocument", document)
    }

    const filterDocuments = (document) => {
        return document.session === student.actualSession
    }

    return (
        <div className="grad">
            <StudentNavbar useStudent={student} />
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
                        {documents
                        .filter(filterDocuments)
                        .map((document) => (
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
