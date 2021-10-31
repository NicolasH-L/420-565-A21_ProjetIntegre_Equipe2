import React from 'react'
import { useState, useEffect } from 'react'

const AdminStats = () => {
    const [students, setStudents] = useState([])
    const [offers, setOffers] = useState([])
    const [documents, setDocuments] = useState([])
    const [validStudentsCount, setValidStudentsCount] = useState(0)

    useEffect(() => {
        const getAllStudents = async () => {
            const studentsFromServer = await fetchAllStudents()
            setStudents(studentsFromServer)
        }
        const getAllOffers = async () => {
            const offersFromServer = await fetchAllOffers()
            setOffers(offersFromServer)
        }
        const getAllValidStudents = async () => {
            let validStudents = students.filter((student) => student.isCvValid === true)
            setValidStudentsCount(validStudents.length)
        }
        const getAllInvalidDocuments = async () => {
            const documentsFromServer = await fetchAllDocuments()
            setDocuments(documentsFromServer.filter((document) => document.isValid === false))
        }
        getAllStudents()
        getAllOffers()
        getAllValidStudents()
        getAllInvalidDocuments()
    }, [offers.length])

    const fetchAllStudents = async () => {
        const res = await fetch("http://localhost:8888/students/get-all-students")
        return await res.json()
    }

    const fetchAllOffers = async () => {
        const res = await fetch("http://localhost:8888/offer/get-all-offers")
        return await res.json()
    }

    const fetchAllDocuments = async () => {
        const res = await fetch("http://localhost:8888/document/get-all-documents")
        return await res.json()
    }

    return (
        <div>
            <h2 className="text-center mb-3">Bonjour</h2>
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-center mb-3">Statistiques <i className="fas fa-chart-line text-success"></i></h2>
                    <div className="container-fluid">
                        <ul className="list-group">
                            <a href="#" className="list-group-item list-group-item-action">Nombre d'étudiants inscrits: <span className="badge badge-primary badge-pill">{students.length}</span> </a>
                            <a href="#" className="list-group-item list-group-item-action">Nombre de CV non-valides: <span className="badge badge-danger badge-pill">{documents.length}</span> </a>
                            <a href="#" className="list-group-item list-group-item-action">Nombre d'offres téléversées: <span className="badge badge-primary badge-pill">{offers.length}</span> </a>
                            <a href="#" className="list-group-item list-group-item-action">Nombre d'étudiants valides: <span className="badge badge-success badge-pill">{validStudentsCount}</span> </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStats
