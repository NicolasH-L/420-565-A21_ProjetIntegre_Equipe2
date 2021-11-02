import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import Contract from '../Contract'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const [internship, setInternship] = useState(null)
    const baseUrl = "http://localhost:8888"
    const studentSignatureStatus = "StudentSignature"

    useEffect(() => {
        if (historyState === undefined)
            return
        const getInternship = async () => {
            const internshipFromServer = await fetchInternship()
            setInternship(internshipFromServer)
        }
        getInternship()
    }, [])

    const fetchInternship = async () => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${student.id}`)
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
                <Contract internshipProp={internship} updateMethodContract={updateContract} studentState={student} passwordUser={student.password} activeStatus={studentSignatureStatus} />
            )}
        </div>
    )
}

export default StudentSignContract
