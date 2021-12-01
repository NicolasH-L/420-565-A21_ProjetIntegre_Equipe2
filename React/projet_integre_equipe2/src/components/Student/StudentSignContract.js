import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Signature } from '../Constants/Signature'
import StudentNavbar from './StudentNavbar'
import Contract from '../Contract/Contract'
import '../Form.css'
import Footer from '../Footer'
import Error from '../Constants/Error'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = history.location.state
    const [internship, setInternship] = useState(null)
    const [contract, setContract] = useState(null)
    const baseUrl = "http://localhost:8888"
    const student = historyState.student
    const emptyMesage = "Vous n'avez pas de contrat à signer"

    useEffect(() => {
        const getInternship = async () => {
            await fetchInternship()
                .then((data) => data !== null ? setInternship(data) : setInternship(null))
        }

        const getContract = async () => {
            await fetchContract()
                .then((data) => data !== null ? validateContract(data) : setContract())
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

    const validateContract = (contract) => {
        contract.studentSignature === "" ? setContract(contract) : setContract(null)
    }

    const fetchContract = async () => {
        const res = await fetch(`${baseUrl}/contract/get-contract/${student.id}/session/${student.actualSession}`)

        if (res.status > 200)
            return null
        return await res.json()
    }

    return (
        <div>
            <div className="grad">
                <StudentNavbar useStudent={student} />
                {internship !== null && contract !== null && contract !== undefined ? (
                    <div className="d-flex justify-content-center my-5 py-2">
                        <div className="jumbotron jumbotron-fluid bg-light rounded shadow reactivescreen">
                            <Contract currentStatus={Signature.getStudentSignatureStatus()} contractProp={contract}
                                signature={contract.studentSignature} />
                        </div>
                    </div>
                )
                    : Error.displayEmptyErrorMessage(emptyMesage)}
            </div>
            <Footer />
        </div>
    )
}

export default StudentSignContract
