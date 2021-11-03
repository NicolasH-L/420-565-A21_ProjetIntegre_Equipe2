import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MonitorNavbar from '../MonitorNavbar'
import ContractModalView from '../Contract/ContractModalView'

const MonitorContracts = () => {
    const [contracts, setContracts] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    // Todo convert to historyState.monitor
    const monitor = historyState

    useEffect(() => {
        const getAllContracts = async () =>{
            const contractsFromServer = await fetchContracts()
            setContracts(contractsFromServer)
        }
        getAllContracts()
    }, [])

    const fetchContracts = async () =>{
        const res = await fetch(`http://localhost:8888/contract/get-all-by-monitor/${monitor.id}`)
        return await res.json()
    }

    const filterContracts = (contract) => {
        return contract.isInternshipStarted === false 
            && monitor.actualSession === contract.session
    }


    return (
        <div className="grad">
            <MonitorNavbar/>
            <h2 className="text-center">Mes contrats</h2>
            <div className="container-fluid">
                <div className="p-5 table-responsive">
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
                                // .filter(filterContracts)
                                .map((contract) => (
                                    <tr key={contract.idContract} className="text-center">
                                        <td>{contract.internship.offer.jobTitle}</td>
                                        <td>{contract.internship.offer.startInternshipDate}</td>
                                        <td>{contract.internship.student.firstName + " " + contract.internship.student.lastName }</td>
                                        <td className={contract.internship.studentSignature !== null && contract.internship.studentSignature !== undefined 
                                            && contract.internship.studentSignature !==  "" ? "table-success": "table-warning"}>
                                                {contract.internship.studentSignature !== null && contract.internship.studentSignature !== undefined 
                                                    && contract.internship.studentSignature !==  "" ? "Signé" : "En attente de signature" }
                                        </td>
                                        <td className={contract.internship.monitorSignature !== null && contract.internship.monitorSignature !== undefined 
                                            && contract.internship.monitorSignature !==  "" ? "table-success": "table-warning"}>
                                                {contract.internship.monitorSignature !== null && contract.internship.monitorSignature !== undefined 
                                                    && contract.internship.monitorSignature !==  "" ? "Signé" : "En attente de signature" }
                                        </td>
                                        <td className={contract.internship.adminSignature !== null && contract.internship.adminSignature !== undefined 
                                            && contract.internship.adminSignature !==  "" ? "table-success": "table-warning"}>
                                                {contract.internship.adminSignature !== null && contract.internship.adminSignature !== undefined 
                                                    && contract.internship.adminSignature !==  "" ? "Signé" : "En attente de signature" }
                                        </td>
                                        <td className="w-25">
                                            <ContractModalView contractProp={contract} />
                                        </td> 
                                        {/* 
                                        */}
                                    </tr>
                                    ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        </div>
    )
}

export default MonitorContracts
