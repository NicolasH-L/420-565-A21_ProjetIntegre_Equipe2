import StudentNavbar from './StudentNavbar'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import '../ResponsiveTable.css'
import '../ResponsiveButtons.css'
import Footer from '../Footer'

const StudentDocuments = () => {
    const [documents, setDocuments] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student

    useEffect(() => {
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments(student.id)
            setDocuments(documentsFromServer)
        }
        getDocuments()
    }, [])

    const fetchDocuments = async (studentId) => {
        const res = await fetch(`http://10.10.68.10:8888/document/get-all-documents/${studentId}`)
        return await res.json()
    }

    const viewDocumentCv = async (document) => {
        history.push("/ViewDocument", document)
    }

    const filterDocuments = (document) => {
        return document.session === student.actualSession
    }

    return (
        <div>
            <div className="grad">
                <StudentNavbar useStudent={student} />
                <h2 className="text-center text-light">Portfolio</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Nom du document </th>
                                <th scope="col">Validité</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents
                                .filter(filterDocuments)
                                .map((document) => (
                                    <tr key={document.idDocument}>
                                        <td data-title="Nom document">{document.documentName}</td>
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

export default StudentDocuments
