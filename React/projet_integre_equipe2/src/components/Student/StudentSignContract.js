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
            await fetchInternship()
                .then((data) => data !== null ? setInternship(data) : setInternship(null))
        }

        const getContract = async () => {
            await fetchContract()
                .then((data) => data !== null ? setContract(data) : setContract(null))
        }
        getInternship()
        getContract()
    }, [student.actualSession])

    const fetchInternship = async () => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${student.id}/session/${student.actualSession}`)
        
        if (res.status > 200)
            return null

        return await res.json()
    }

    const fetchContract = async () => {
        const res = await fetch(`${baseUrl}/contract/get-contract/${student.id}/session/${student.actualSession}`)
        
        if (res.status > 200)
            return null

        return await res.json()
    }

    const displayEmptyErrorMessage = () => {
        return (
            <div className="container">
                <div className="d-flex justify-content-center py-5">
                    <h2 className="text-dark">Vous n'avez pas de contrats</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="grad">
            <StudentNavbar useStudent={student} />
            {internship !== null && contract !== null ? (
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
            )
                : displayEmptyErrorMessage()}
        </div>
    )
}

export default StudentSignContract
