import React from 'react'
import AdminNavbar from '../AdminNavbar'
import { useState } from 'react'

const AdminContracts = () => {
    const [contracts, setContracts] = useState([])

    return (
        <div>
             <div className="grad">
            <AdminNavbar/>
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
                                            <button className="btn btn-primary mx-2" 
                                            // onClick={e => { e.preventDefault(); viewOffer(acceptedOffer.offer) }}
                                            >Consulter</button>
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
        </div>
    )
}

export default AdminContracts
