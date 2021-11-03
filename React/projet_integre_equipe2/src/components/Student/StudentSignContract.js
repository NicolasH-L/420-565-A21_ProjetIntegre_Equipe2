import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import Contract from '../Contract/Contract'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [internship, setInternship] = useState(null)
    const baseUrl = "http://localhost:8888"
    const studentSignatureStatus = "StudentSignature"
    const student = historyState.student

    useEffect(() => {
        if (historyState === undefined)
            return
        const getInternship = async () => {
            const internshipFromServer = await fetchInternship(student.id)
            setInternship(internshipFromServer)
        }
        getInternship()
    }, [])

    const fetchInternship = async (idStudent) => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${idStudent}`)
        return await res.json()
    }

    return (
        <div className="grad ">
            <StudentNavbar useStudent={student} />
            {internship && (
                <Contract internshipProp={internship} passwordUser={student.password} currentStatus={studentSignatureStatus} />
            )}
        </div>
    )
}

export default StudentSignContract
