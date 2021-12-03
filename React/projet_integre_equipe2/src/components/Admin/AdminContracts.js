import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Signature } from '../Constants/Signature'
import AdminNavbar from './AdminNavbar'
import ContractModalView from '../Contract/ContractModalView'
import DownloadContract from '../Contract/DownloadContract'
import Footer from '../Footer'
import './../ResponsiveTable.css'
import './../ResponsiveButtons.css'

const AdminContracts = () => {
    const [contracts, setContracts] = useState([])
    const [filters, setFilters] = useState({ signatureStatus: "" })
    const history = useHistory()
    const historyState = history.location.state
    const admin = historyState.admin
    const contractCompletedStatus = "Completed"
    const defaultStatus = "default"

    useEffect(() => {
        if (filters.signatureStatus === "") 
            setFilters({ ...filters, signatureStatus: defaultStatus })

        const getAllContracts = async () => {
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer)
        }
        getAllContracts()
    }, [filters.signatureStatus])

    const fetchContracts = async () => {
        const res = await fetch(`http://10.10.68.10:8888/contract/get-all-contracts/`)
        return await res.json()
    }

    const filterContractsBySession = (contract) => {
        return admin.actualSession === contract.session
    }

    const filterContractsByStatus = (contract) => {
        return filters.signatureStatus !== defaultStatus ? filters.signatureStatus === contract.internship.status : true
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
                    <h4 className="text-warning">Vous n'avez pas de contrats</h4>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <div className="d-flex justify-content-end p-5">
                    <select defaultValue="default" className="btn btn-primary text-center text-light" id="status" name="status" onChange={changeStatusFilter} required>
                        <option className="bg-light text-dark" value="default">Afficher tous les contrats</option>
                        <option className="bg-light text-dark" value={Signature.getMonitorSignatureStatus()}>Afficher les contrats prêts à être signé par un moniteur</option>
                        <option className="bg-light text-dark" value={Signature.getStudentSignatureStatus()}>Afficher les contrats prêts à être signé par un étudiant</option>
                        <option className="bg-light text-dark" value={Signature.getAdminSignatureStatus()}>Afficher les contrats prêts à être signé par le gestionnaire</option>
                        <option className="bg-light text-dark" value={Signature.getCompleteSignatureStatus()}>Afficher les contrats signés par tout le monde</option>
                    </select>
                </div>
                <h2 className="text-center text-light">Mes contrats</h2>
                <div className="p-5">
                    {isDisplayContracts() ?
                        <table className="table table-hover bg-light shadow-lg" id="no-more-tables">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Position</th>
                                    <th scope="col">Début du stage</th>
                                    <th scope="col">Nom de l'étudiant</th>
                                    <th scope="col">Signé par l'étudiant</th>
                                    <th scope="col">Signé par le moniteur</th>
                                    <th scope="col">Signé par le gestionnaire</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts
                                    .filter(filterContractsBySession)
                                    .filter(filterContractsByStatus)
                                    .map((contract) => (
                                        <tr key={contract.idContract} className="text-center">
                                            <td data-title="Position" >{contract.internship.offer.jobTitle}</td>
                                            <td data-title="Début stage">{contract.internship.offer.startInternshipDate}</td>
                                            <td data-title="Nom étudiant">{contract.internship.student.firstName + " " + contract.internship.student.lastName}</td>
                                            <td data-title="Étudiant" >
                                                <h5>
                                                    <span className={`badge ${getStatusValue(contract.studentSignature, "badge-success", "badge-warning")}`}>
                                                        {getStatusValue(contract.studentSignature, "Signé", "Non signé")}
                                                    </span>
                                                </h5>
                                            </td>
                                            <td data-title="Moniteur" >
                                                <h5>
                                                    <span className={`badge ${getStatusValue(contract.monitorSignature, "badge-success", "badge-warning")}`}>
                                                        {getStatusValue(contract.monitorSignature, "Signé", "Non signé")}
                                                    </span>
                                                </h5>
                                            </td>
                                            <td data-title="Gestionnaire" >
                                                <h5>
                                                    <span className={`badge ${getStatusValue(contract.adminSignature, "badge-success", "badge-warning")}`}>
                                                        {getStatusValue(contract.adminSignature, "Signé", "Non signé")}
                                                    </span>
                                                </h5>
                                            </td>
                                            <td className="responsiveWidth">
                                                <div className="d-flex">
                                                    <ContractModalView
                                                        currentStatusProp={Signature.getAdminSignatureStatus()} contractProp={contract}
                                                        signature={contract.adminSignature}
                                                    />
                                                    {(contract.internship.status === contractCompletedStatus) ?
                                                        <DownloadContract contract={contract}></DownloadContract> : ""}
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

export default AdminContracts
