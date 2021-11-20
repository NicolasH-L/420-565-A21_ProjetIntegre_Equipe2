import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Signature } from '../Constants/Signature'
import StudentNavbar from '../StudentNavbar'
import Contract from '../Contract/Contract'
import DownloadContract from '../DownloadContract'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [internship, setInternship] = useState(null)
    const [contract, setContract] = useState(null)
    const baseUrl = "http://localhost:8888"
    const student = historyState.student
    const contractCompletedStatus = "Completed"

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
        <div className="grad">
            <StudentNavbar useStudent={student} />
            {internship && contract && (
                <div className="d-flex justify-content-center my-5 py-2">
                    <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                        {(contract.internship.status === contractCompletedStatus) ? 
                        <div className="d-flex justify-content-center mb-4">
                            <DownloadContract contract={contract}></DownloadContract>
                        </div>
                        : ""}
                        <Contract passwordUser={student.password}
                            currentStatus={Signature.getStudentSignatureStatus()} contractProp={contract}
                            signature={contract.studentSignature} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentSignContract
