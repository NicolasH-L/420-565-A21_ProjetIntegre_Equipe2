import _ from 'lodash'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const StudentLogin = ({onLogin}) => {
    const [student, setStudent] = useState({matricule: "", password: "" })
    const [error, setError] = useState({credentials:"" })
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.credentials) || _.isEmpty(student.password) || _.isEmpty(student.matricule)) {
            setError({...error, credentials: "Matricule ou mot de passe incorrect"})
            return
        } else {
            onLogin(student.matricule, student.password)
                .then((data) => data.matricule != null ? history.push("/Student", student) : alert("Erreur de matricule ou mot de passe"))
        }
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    {error.credentials !== "" ? error.credentials : ""}
                    <label htmlFor="matriculeStudent" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    <input type="text" className="form-control text-center" id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" onChange={(e) => setStudent({...student, matricule: e.target.value}) } required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordStudent" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    <input type="password" className="form-control text-center" id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" onChange={(e) => setStudent({...student, password: e.target.value}) } required />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default StudentLogin
