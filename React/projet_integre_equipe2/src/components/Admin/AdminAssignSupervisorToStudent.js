import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer'
import '../Form.css'
import Swal from 'sweetalert2'

const AdminAssignSupervisorToStudent = () => {
    const [internships, setInterships] = useState([])
    const [supervisors, setSupervisors] = useState([])
    const history = useHistory();
    const historyState = history.location.state
    const admin = historyState.admin
    const defaultValue = "default"
    let selectedSupervisorJSON = defaultValue
    let selectedStudentIntershipJSON = defaultValue

    const fireSwalInfo = () => {
        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'info',
            title: 'Veuillez sélectionner un superviseur et un élève',
            showConfirmButton: false,
            timer: 2000,
            width: '500px'
        })
    }

    useEffect(() => {
        const getInterships = async () => {
            const intershipsFromServer = await fetchInternships()
            setInterships(intershipsFromServer)
        }
        const getSupervisors = async () => {
            const supervisorsFromServer = await fetchSupervisors()
            setSupervisors(supervisorsFromServer)
        }
        getInterships()
        getSupervisors()
    }, [])

    const addSupervisorToIntership = async (internship) => {
        const result = await fetch('http://localhost:8888/internship/save-internship',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(internship)
            })
        const data = await result.json()

        setInterships(
            internships.map(
                (internship1) => internship1.idInternship === internship.idInternship ? { ...internship1, supervisor: data.supervisor } : internship1
            )
        )
    }

    const fetchInternships = async () => {
        const res = await fetch('http://localhost:8888/internship/get-all-internships')
        return await res.json()
    }

    const fetchSupervisors = async () => {
        const res = await fetch('http://localhost:8888/supervisors/get-all-supervisors')
        return await res.json()
    }

    const getSelectedSupervisor = (e) => {
        e.preventDefault()
        if (e.target.value !== "default") {
            selectedSupervisorJSON = JSON.parse(e.target.value)
        }
    }

    const getSelectedStudentIntership = (e) => {
        e.preventDefault()
        if (e.target.value !== "default") {
            selectedStudentIntershipJSON = JSON.parse(e.target.value)
        }
    }

    const assignSupervisorToStudent = (e) => {
        e.preventDefault()
        if (selectedStudentIntershipJSON !== defaultValue && selectedSupervisorJSON !== defaultValue) {
            selectedStudentIntershipJSON.supervisor = selectedSupervisorJSON
            addSupervisorToIntership(selectedStudentIntershipJSON)
        } else {
            fireSwalInfo()
        }
    }

    const filterInterships = (internship) => {
        return (internship.supervisor === null
            && internship.status === "Completed"
            && admin.actualSession === internship.session)
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <div className="d-flex justify-content-center">
                    <div className="jumbotron jumbotron-fluid bg-light rounded shadow reactivescreen">
                        <form className="container-fluid" onSubmit={assignSupervisorToStudent}>
                            <h1 className="text-center text-secondary">Assigner un superviseur à un étudiant</h1>
                            <div className="form-group">
                                <label htmlFor="AdminAssignSupervisor" className="text-secondary"> </label>
                                <select defaultValue={defaultValue} onChange={getSelectedSupervisor} className="form-control text-center" id="AdminAssignSupervisor" name="AdminAssignSupervisor" required>
                                    <option value={defaultValue}>Sélectionner un superviseur</option>
                                    {supervisors.map((supervisor) => (
                                        <option value={JSON.stringify(supervisor)} key={supervisor.matricule}> {supervisor.firstName} {supervisor.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="AdminAssignStudent" className="text-secondary"> </label>
                                <select defaultValue={defaultValue} onChange={getSelectedStudentIntership} className="form-control text-center" id="AdminAssignStudent" name="AdminAssignStudent" required>
                                    <option value={defaultValue}>Sélectionner un étudiant</option>
                                    {internships
                                        .filter(filterInterships)
                                        .map((intership) => (
                                            <option value={JSON.stringify(intership)} key={intership.idInternship}> {intership.offer.companyName} {intership.offer.jobTitle} - {intership.student.firstName} {intership.student.lastName}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <button className="btn btn-block btn-primary text-white">Assigner <i className="fas fa-link"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminAssignSupervisorToStudent
