import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import Contract from '../Contract/Contract'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [internship, setInternship] = useState(null)
    const [contract, setContract] = useState(null)
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
        const getContract = async () => {
            const contractFromServer = await fetchContract(student.id)
            setContract(contractFromServer)
        }
        getInternship()
        getContract()
    }, [])

    const fetchInternship = async (idStudent) => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${idStudent}`)
        return await res.json()
    }

    const fetchContract = async (idStudent) => {
        const res = await fetch(`${baseUrl}/contract/get-contract/${idStudent}`)
        return await res.json()
    }

    return (
        <div className="grad ">
            <StudentNavbar useStudent={student} />
            {internship && contract && (
                <Contract passwordUser={student.password} 
                    currentStatus={studentSignatureStatus} contractProp={contract} />
            )}
        </div>
    )
}

export default StudentSignContract
