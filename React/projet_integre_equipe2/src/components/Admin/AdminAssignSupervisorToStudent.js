import React from 'react'
import { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar'

const AdminAssignSupervisorToStudent = () => {

    const [interships, setInterships] = useState([])
    const [supervisors, setSupervisors] = useState([])
    const defaultValue = "default"
    let selectedSupervisorJSON = undefined
    let selectedStudentIntershipJSON = undefined

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

    const addSupervisorToIntership = async (intership) => {
        const result = await fetch('http://localhost:8888/internship/save-internship',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(intership)
            })
        return await result.json()
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
        if (e.target.value === "default") {


        } else {
            selectedSupervisorJSON = JSON.parse(e.target.value)
            console.log(selectedSupervisorJSON)
        }
    }

    const getSelectedStudentIntership = (e) => {
        if (e.target.value === "default") {


        } else {
            selectedStudentIntershipJSON = JSON.parse(e.target.value)
            console.log(selectedStudentIntershipJSON)
        }
    }

    const assignSupervisorToStudent = () => {
        selectedStudentIntershipJSON.supervisor = selectedSupervisorJSON
        addSupervisorToIntership(selectedStudentIntershipJSON)
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <h2 className="text-center">Assigner un superviseur</h2>
                <div className="d-flex justify-content-center">
                     <div className="form-group w-50 p-4">
                    <label htmlFor="AdminAssignStudent" className="text-secondary"> </label>
                    <select defaultValue={defaultValue} onChange={getSelectedStudentIntership} className="form-control text-center" id="AdminAssignStudent" name="AdminAssignStudent" required>
                        <option value={defaultValue}>Sélectionner un élève</option>
                        {interships.map((intership) => (
                            <option value={JSON.stringify(intership)} key={intership.idInternship}> {intership.student.firstName} {intership.student.lastName}</option>
                        ))}
                    </select>

                    <label htmlFor="AdminAssignSupervisor" className="text-secondary"> </label>
                    <select defaultValue={defaultValue} onChange={getSelectedSupervisor} className="form-control text-center" id="AdminAssignSupervisor" name="AdminAssignSupervisor" required>
                        <option value={defaultValue}>Sélectionner un superviseur</option>
                        {supervisors.map((supervisor) => (
                            <option value={JSON.stringify(supervisor)} key={supervisor.matricule}> {supervisor.firstName} {supervisor.lastName}</option>
                        ))}
                    </select>
                    <div className="d-flex justify-content-center p-4">
                        <button className="btn btn-light mx-2 " onClick={() => { assignSupervisorToStudent() }} >Ajouter <i className="fas fa-plus"></i></button>
                    </div>
                </div>
                </div>
               
            </div>
        </div>
    )
}

export default AdminAssignSupervisorToStudent
