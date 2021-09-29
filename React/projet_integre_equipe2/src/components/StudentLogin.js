import _ from 'lodash';
import React from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";

const StudentLogin = ({onlogin}) => {
    const [student, setStudent] = useState({matricule: "", password: "" })
    const [error, setError] = useState({credentials:"" })
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.credentials) ||_.isEmpty(student.password) || _.isEmpty(student.matricule)) {
            setError({...error, credentials: "Matricule ou mot de passe incorrect"})
            return
        } else {
            console.log(student)
            onlogin(student)
            /*    .then((data) => data.matricule !== undefined ? history.push("/OffresStudent", {student}) : alert("Erreur matricule existante"))
                .catch(() => alert("Erreur matricule existante"))*/
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
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default StudentLogin
