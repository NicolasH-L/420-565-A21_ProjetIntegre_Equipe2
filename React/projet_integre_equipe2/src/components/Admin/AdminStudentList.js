import React from 'react'
import { useHistory } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { useState, useEffect } from 'react'
import '../ResponsiveTable.css'
import '../ResponsiveButtons.css'
import Footer from '../Footer';

const AdminStudentList = () => {
    const [students, setStudents] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin

    useEffect(() => {
        const getStudents = async () => {
            const studentsFromServer = await fetchStudents()
            setStudents(studentsFromServer)
        }
        getStudents()
    }, [])

    const fetchStudents = async () => {
        const res = await fetch('http://localhost:8888/students/get-all-students')
        return await res.json()
    }

    const viewStudentCvList = async (student) => {
        history.push("/AdminStudentCvList", { student, admin })
    }

    const validateStudent = async (student) => {
        const res = await fetch(`http://localhost:8888/students/validate-student/${student.matricule}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        const data = await res.json()

        setStudents(
            students.map(
                (student1) => student1.matricule === student.matricule ? { ...student1, isCvValid: data.isCvValid } : student1
            )
        )
    }

    const filterStudents = (student) => {
        return student.actualSession === admin.actualSession
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center text-light">Liste des étudiants</h2>
                <div className="p-5">
                    <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                        <thead>
                            <tr>
                                <th scope="col">Nom: </th>
                                <th scope="col">Matricule: </th>
                                <th scope="col">Validité: </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students
                                .filter(filterStudents)
                                .map((student) => (
                                    <tr key={student.id}>
                                        <td data-title="Nom">{student.firstName + " " + student.lastName}</td>
                                        <td data-title="Matricule">{student.matricule}</td>
                                        <td data-title="Validité">
                                            <h5>
                                                <span className={`badge ${student.isCvValid ? 'badge-success' : 'badge-warning'}`}>
                                                    {student.isCvValid ? "Valide" : "En attente"}
                                                </span>
                                            </h5>
                                        </td>
                                        <td className="responsiveWidth">
                                            <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewStudentCvList(student) }}>
                                                <span className="hideButtonText">Consulter documents</span>
                                                <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                            </button>
                                            <button className="btn btn-success mx-2" onClick={e => { e.preventDefault(); validateStudent(student) }}>
                                                <span className="hideButtonText">Valider étudiant</span>
                                                <span className="hideButtonIcon"><i className="fas fa-check"></i></span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AdminStudentList
