import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ContractModalView from '../Contract/ContractModalView'
import DownloadContract from '../Contract/DownloadContract'
import Footer from '../Footer'
import StudentNavbar from './StudentNavbar'

const StudentContractList = () => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const [contracts, setContracts] = useState([])
    const contractCompletedStatus = "Completed"

    useEffect(() => {
        const getAllStudentContracts = async () => {
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer.filter(byContractCompleted))
        }
        getAllStudentContracts()
    }, [])

    const fetchContracts = async () => {
        const res = await fetch(`http://localhost:8888/contract/get-all-by-student/${student.id}`)
        return await res.json()
    }

    const byContractCompleted = (contract) => {
        return contract.studentSignature !== ""
    }

    const isDisplayContracts = () => {
        return contracts.length !== 0
    }

    const displayEmptyErrorMessage = () => {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h2 className="text-dark">Vous n'avez pas de contrats</h2>
                </div>
            </div>
        )
    }

    const sessionValueToFrench = (session) => {
        let sessionSeason = session.slice(0, -4)
        let sessionYear = session.slice(-4)
        let sessionSeasonToFrench = sessionSeason === "winter" ? "Hiver"
            : sessionSeason === "summer" ? "Été" : ""
        return sessionSeasonToFrench + " " + sessionYear
    }

    return (
        <div>
            <div className="grad">
                <StudentNavbar useStudent={student} />
                <h2 className="text-center text-light">Mes contrats</h2>
                <div className="p-5 table-responsive">
                    {isDisplayContracts() ?
                        <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Compagnie</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Session du stage</th>
                                    <th scope="col">Début du stage</th>
                                    <th scope="col">Fin du stage</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts
                                    .map((contract) => (
                                        <tr key={contract.idContract} className="text-center">
                                            <td data-title="Compagnie">{contract.internship.offer.companyName}</td>
                                            <td data-title="Position">{contract.internship.offer.jobTitle}</td>
                                            <td data-title="Session du stage">{sessionValueToFrench(contract.session)}</td>
                                            <td data-title="Début">{contract.internship.offer.startInternshipDate}</td>
                                            <td data-title="Date limite">{contract.internship.offer.endInternshipDate}</td>
                                            <td className="responsiveWidth">
                                                <div className="d-flex">
                                                    <ContractModalView userPasswordProp={student.password}
                                                        contractProp={contract} signature={contract.studentSignature} />
                                                    {(contract.internship.status === contractCompletedStatus) ?
                                                        <div className="d-flex justify-content-center mb-4">
                                                            <DownloadContract contract={contract} />
                                                        </div>
                                                        : ""}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        : displayEmptyErrorMessage()}
                </div>
            </div>
            <Footer />
        </div>


    )
}

export default StudentContractList
