import React from 'react'
import AdminNavbar from '../AdminNavbar'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Signature } from '../Constants/Signature'
import ContractModalView from '../Contract/ContractModalView'
import DownloadContract from '../DownloadContract'

const AdminContracts = () => {
    const [contracts, setContracts] = useState([])
    const [filters, setFilters] = useState({ signatureStatus: "" })
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin
    const contractCompletedStatus = "Completed"

    useEffect(() => {
        if (filters.signatureStatus === "") {
            setFilters({ ...filters, signatureStatus: "default" })
        }
        const getAllContracts = async () => {
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer)
        }
        getAllContracts()
    }, [filters.signatureStatus])

    const fetchContracts = async () => {
        const res = await fetch(`http://localhost:8888/contract/get-all-contracts/`)
        return await res.json()
    }

    const filterContractsBySession = (contract) => {
        return admin.actualSession === contract.session
    }

    const filterContractsByStatus = (contract) => {
        return filters.signatureStatus !== "default" ? filters.signatureStatus === contract.internship.status : true
    }

    const getStatusValue = (userSignature, trueValue, falseValue) => {
        return (userSignature !== null && userSignature !== undefined
            && userSignature !== "" ? trueValue : falseValue)
    }

    const isDisplayContracts = () => {
        var temp = contracts.filter(filterContractsBySession).filter(filterContractsByStatus)
        return temp.length > 0
    }

    const changeStatusFilter = (e) => {
        setFilters({ ...filters, signatureStatus: e.target.value })
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

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <div className="d-flex justify-content-end m-5">
                    <select defaultValue="default" className="btn btn-primary text-center text-light" id="status" name="status" onChange={changeStatusFilter} required>
                        <option className="bg-light text-dark" value="default">Afficher tous les contrats</option>
                        <option className="bg-light text-dark" value={Signature.getMonitorSignatureStatus()}>Afficher les contrats prêts à être signé par un moniteur</option>
                        <option className="bg-light text-dark" value={Signature.getStudentSignatureStatus()}>Afficher les contrats prêts à être signé par un étudiant</option>
                        <option className="bg-light text-dark" value={Signature.getAdminSignatureStatus()}>Afficher les contrats prêts à être signé par le gestionnaire</option>
                        <option className="bg-light text-dark" value={Signature.getCompleteSignatureStatus()}>Afficher les contrats signés par tout le monde</option>
                    </select>
                </div>
                <h2 className="text-center">Mes contrats</h2>
                <div className="container-fluid">
                    <div className="p-5 table-responsive">
                        {isDisplayContracts() ?
                            <table className="table table-hover bg-light shadow-lg">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">Position</th>
                                        <th scope="col">Début du stage</th>
                                        <th scope="col">Nom de l'étudiant</th>
                                        <th scope="col">Signé par l'étudiant</th>
                                        <th scope="col">Signé par le moniteur</th>
                                        <th scope="col">Signé par le gestionnaire</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts
                                        .filter(filterContractsBySession)
                                        .filter(filterContractsByStatus)
                                        .map((contract) => (
                                            <tr key={contract.idContract} className="text-center">
                                                <td>{contract.internship.offer.jobTitle}</td>
                                                <td>{contract.internship.offer.startInternshipDate}</td>
                                                <td>{contract.internship.student.firstName + " " + contract.internship.student.lastName}</td>
                                                <td className={getStatusValue(contract.studentSignature, "table-success", "table-warning")}>
                                                    {getStatusValue(contract.studentSignature, "Signé", "En attente de signature")}
                                                </td>
                                                <td className={getStatusValue(contract.monitorSignature, "table-success", "table-warning")}>
                                                    {getStatusValue(contract.monitorSignature, "Signé", "En attente de signature")}
                                                </td>
                                                <td className={getStatusValue(contract.adminSignature, "table-success", "table-warning")}>
                                                    {getStatusValue(contract.adminSignature, "Signé", "En attente de signature")}
                                                </td>
                                                <td className="w-25">
                                                    <ContractModalView userPasswordProp={admin.password}
                                                        currentStatusProp={Signature.getAdminSignatureStatus()} contractProp={contract} signature={contract.adminSignature} />
                                                </td>
                                                <td>
                                                    {(contract.internship.status === contractCompletedStatus) ?
                                                        <div className="d-flex justify-content-center mb-4">
                                                            <DownloadContract contract={contract}></DownloadContract>
                                                        </div>
                                                        : ""}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            : displayEmptyErrorMessage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminContracts
