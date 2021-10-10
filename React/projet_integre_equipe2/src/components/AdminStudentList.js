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

    return (
        <div className="grad">
            <AdminNavbar/>
            <h2 className="text-center">Offres de stage</h2>
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
                            <tr className={`${student.valid ? 'table-success' : student.state == null ? 'table-warning' : 'table-danger'}`} key={student.idstudent}>
                                <th>{student.firstName + " " + student.lastName}</th>
                                <td>{student.matricule}</td>
                                <td>{student.cvState == null ? "En attente" : student.cvState}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); /*viewStudent(student) */}}>Afficher</button>
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
