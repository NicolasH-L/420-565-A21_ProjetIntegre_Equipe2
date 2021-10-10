import React from 'react'
import { useHistory } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { useState, useEffect } from 'react'

const AdminStudentList = () => {
    const [students, setStudents] = useState([])
    const history = useHistory()

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
        history.push("/AdminStudentCvList", student)
    }

    return (
        <div className="grad">
            <AdminNavbar/>
            <h2 className="text-center">Liste des étudiants</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom: </th>
                            <th scope="col">Matricule: </th>
                            <th scope="col">Validité du CV: </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr className={`${student.isCvValid ? 'table-success' : 'table-warning'}`} key={student.idStudent}>
                                <th>{student.firstName + " " + student.lastName}</th>
                                <td>{student.matricule}</td>
                                <td>{student.isCvValid ? "Valide" : "En attente"}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewStudentCvList(student) }}>Consulter documents</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminStudentList
