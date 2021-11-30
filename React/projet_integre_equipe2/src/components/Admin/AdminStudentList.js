import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer';
import Swal from 'sweetalert2'
import '../ResponsiveTable.css'
import '../ResponsiveButtons.css'

const AdminStudentList = () => {
    const [students, setStudents] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin
    const resetAlertText =
        `Cette option permet de réinitialiser un compte étudiant lorsque celui-ci est rendu à une nouvelle session de stage.
         Il est possible également de réinitialiser un compte qui contient des erreurs.
         À noter qu'il n'efface pas les données de l'étudiant, cette option permet simplement de remettre le statut de l'étudiant à "En recherche" et d'invalider son compte.`

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

    const resetStudentAccount = async (student) => {
        console.log(student)
        const res = await fetch(`http://localhost:8888/students/reset-student-account/${student.matricule}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        const data = await res.json()
        console.log(data)

        setStudents(
            students.map(
                (student1) => student1.matricule === student.matricule ? { ...student1, isCvValid: data.isCvValid } : student1
            )
        )
    }

    const resetAccountAlert = async (student) => {
        Swal.fire({
            title: 'Réinitialiser un compte étudiant?',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Réinitialiser',
            confirmButtonColor: '#FF0000',
            html: `<p class="text-justify text-dark">${resetAlertText}</p>`,
            width: '800px',
            footer: `
            <span class="text-danger">
                <i class="fas fa-exclamation-circle mr-2"></i>Veuillez noter que cette action est irréversible
            </span>`
        }).then((result) => {
            if (result.isConfirmed) {
                resetStudentAccount(student)
            }
        })
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
                                            <div className="d-flex">
                                                <button className="btn btn-primary mx-2" onClick={e => { e.preventDefault(); viewStudentCvList(student) }}>
                                                    <span className="hideButtonText">Consulter documents</span>
                                                    <span className="hideButtonIcon"><i className="fas fa-book-open"></i></span>
                                                </button>
                                                <button className="btn btn-success mx-2" onClick={e => { e.preventDefault(); validateStudent(student) }}>
                                                    <span className="hideButtonText">Valider étudiant</span>
                                                    <span className="hideButtonIcon"><i className="fas fa-check"></i></span>
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={e => { e.preventDefault(); resetAccountAlert(student) }}
                                                >
                                                    Réinitialiser
                                                </button>
                                            </div>
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

export default AdminStudentList
