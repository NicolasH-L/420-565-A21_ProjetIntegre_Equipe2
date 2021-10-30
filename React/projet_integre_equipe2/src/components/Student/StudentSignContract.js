import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import Contract from '../Contract'

const StudentSignContract = () => {
    const history = useHistory()
    const historyState = useHistory().location.state
    const [internship, setInternship] = useState(null)
    const baseUrl = "http://localhost:8888"
    let student 

    useEffect(() => {
        if (history !== undefined) {
            student = historyState
        }
        const getInternship = async () => {
            const internshipFromServer = await fetchInternship()
            setInternship(internshipFromServer)
        }
        getInternship()
    }, [])

    const fetchInternship = async () => {
        const res = await fetch(`${baseUrl}/internship/get-internship/${student.id}`)
        return await res.json()
    }

    const updateContract = async (contract) => {
        const result = await fetch(`${baseUrl}/contract/update-contract`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contract)
            })
        return await result.json()
    }

    return (
        <div className="grad ">
            <StudentNavbar useStudent={historyState} />
            {internship && (
                <Contract internshipProp={internship} updateMethodContract={updateContract} studentState={historyState} passwordUser={historyState.password}/>
            )}
        </div>
    )
}

export default StudentSignContract
