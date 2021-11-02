import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import Contract from '../Contract'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [internship, setInternship] = useState(null)
    const baseUrl = "http://localhost:8888"
    const studentSignatureStatus = "StudentSignature"
    let studentId

    useEffect(() => {
        if (historyState === undefined)
            return
        studentId = historyState.id
        const getInternship = async () => {
            const internshipFromServer = await fetchInternship(studentId)
            setInternship(internshipFromServer)
        }
        getInternship()
    }, [])

    const fetchInternship = async (idStudent) => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${idStudent}`)
        return await res.json()
    }

    const updateContract = async (contract) => {
        const result = await fetch(`${baseUrl}/contract/save-contract`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contract)
            })
        return await result.json()
    }

    return (
        <div className="grad ">
            <StudentNavbar useStudent={historyState} />
            {internship && (
                <Contract internshipProp={internship} updateMethodContract={updateContract}
                    passwordUser={historyState.password} currentStatus={studentSignatureStatus} />
            )}
        </div>
    )
}

export default StudentSignContract
