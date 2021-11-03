import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from '../MonitorNavbar'
import ContractModalView from '../Contract/ContractModalView'

const MonitorContracts = () => {
    const [contracts, setContracts] = useState([])
    const [filters, setfilters] = useState({ session: "", signatureStatus: "" })
    const history = useHistory()
    const historyState = history.location.state
    // Todo convert to historyState.monitor
    const monitor = historyState
    const monitorSignatureStatus = "MonitorSignature"

    useEffect(() => {
        filters.session = monitor.actualSession
        filters.signatureStatus = monitorSignatureStatus

        const getAllContracts = async () => {
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer)
        }
        getAllContracts()
    }, [])

    const fetchContracts = async () => {
        const res = await fetch(`http://localhost:8888/contract/get-all-by-monitor/${monitor.id}`)
        return await res.json()
    }

    //TODO 
    const filterContractsBySession = (contract) => {
        return filters.session === contract.session
    }

    const filterContractsByStatus = (contract) => {
        return filters.signatureStatus === contract.internship.status
    }

    const getStatusValue = (userSignature, trueValue, falseValue) => {
        return (userSignature !== null && userSignature !== undefined
            && userSignature !== "" ? trueValue : falseValue)
    }

    const isDisplayContracts = () => {
        var temp = contracts.filter(filterContractsBySession).filter(filterContractsByStatus)
        return temp.length > 0
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
    
    // TODO Bouton filtre pour sessions + Bouton filtre de status ex: signature Etudiant, signature Monitor, signature Admin, etc.
    return (
        <div className="grad">
            <MonitorNavbar />
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
                                    <th scope="col">Signer par l'étudiant</th>
                                    <th scope="col">Signer par le moniteur</th>
                                    <th scope="col">Signer par le gestionnaire</th>
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
                                                <ContractModalView userPasswordProp={monitor.password}
                                                    currentStatusProp={monitorSignatureStatus} contractProp={contract}
                                                    viewerStatus={monitorSignatureStatus} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        : displayEmptyErrorMessage()}
                </div>
            </div>
        </div>
    )
}

export default MonitorContracts
