import React from 'react'
import { useEffect, useState } from 'react'

const AdminAssignSupervisorToStudent = () => {

    const [interships, setInterships] = useState([])
    const defaultValue = "default"
    let SelectedSupervisorJSON

    useEffect(() => {
        const getInterships = async () => {
            const intershipsFromServer = await fetchInternships()
            setInterships(intershipsFromServer)
        }
        getInterships()
    }, [])

    const fetchInternships = async () => {
        const res = await fetch('http://localhost:8888/internship/get-all-internships')
        return await res.json()
    }

    const getSelectedSupervisor = (e) => {
        if (e.target.value === "default") {


        } else {
            SelectedSupervisorJSON = JSON.parse(e.target.value)
            SelectedSupervisorJSON.isAccepted = true
        }
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="AdminAssignSupervisor" className="text-secondary"> </label>
                <select defaultValue={defaultValue} onChange={getSelectedSupervisor} className="form-control text-center" id="AdminAssignSupervisor" name="AdminAssignSupervisor" required>
                    <option value={defaultValue}>Veuillez sélectionner un Superviseur</option>
                    {interships.map((intership) => (
                        <option value={JSON.stringify(intership)} key={intership.idInternship}> {intership.student.firstName} {intership.student.lastName}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default AdminAssignSupervisorToStudent
