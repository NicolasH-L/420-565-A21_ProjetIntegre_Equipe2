import React from 'react'
import SupervisorNavbar from './SupervisorNavbar'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SupervisorAssignedStudentList = () => {
    const [interships, setInterships] = useState([])
    const [matriculeSuperviseur, setMatriculeSuperviseur] = useState()
    const history = useHistory()
    const historyState = history.location.state

    useEffect(() => {
        if (historyState === undefined)
            return
        setMatriculeSuperviseur(historyState.matricule)
        const getInternships = async () => {
            const internshipsFromServer = await fetchInternships(matriculeSuperviseur)
            setInterships(internshipsFromServer)
        }
        getInternships()
    }, [])


    const fetchInternships = async (matriculeSuperviseur) => {
        const res = await fetch(`http://localhost:8888/internship/get-all-internships-by-supervisor/${matriculeSuperviseur}`)
        return await res.json()
    }

    console.log(interships)

    return (
        <div>
            <div className="grad">
            <SupervisorNavbar/>
            <h2 className="text-center">Portfolio</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Entreprise</th>
                            <th scope="col">Nom du poste</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interships.map((intership) => (
                            <tr key={intership.idInternship}>
                                <th>{intership.student.lastName}</th>
                                <th>{intership.student.firstName}</th>
                                <th>{intership.offer.companyName}</th>
                                <th>{intership.offer.jobTitle}</th>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" onClick={e => { }}>Consulter</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default SupervisorAssignedStudentList
