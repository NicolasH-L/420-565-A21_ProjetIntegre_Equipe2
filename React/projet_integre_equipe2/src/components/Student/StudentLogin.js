import _ from 'lodash'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const StudentLogin = ({ onLogin, authLogin }) => {
    const [student, setStudent] = useState({ matricule: "", password: "" })
    const [error, setError] = useState({ credentials: "" })
    const history = useHistory()

    const fireSwalError = () => {
        Swal.fire({
            title: 'Matricule ou mot de passe incorrect',
            icon: 'error',
            position: 'top',
            toast: true,
            timer: 1500,
            showConfirmButton: false,
            width: '400px'
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.credentials) || _.isEmpty(student.password) || _.isEmpty(student.matricule)) {
            setError({ ...error, credentials: "Matricule ou mot de passe incorrect" })
            return
        } else {
            onLogin(student.matricule, student.password)
                .then((data) => data.matricule != null ? signIn(data) : fireSwalError())
        }

        function signIn(student) {
            authLogin("student")
            history.push("/Student", { student })
        }
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    {error.credentials !== "" ? error.credentials : ""}
                    <label htmlFor="matriculeStudent" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    <input type="text" className="form-control text-center" id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" onChange={(e) => setStudent({ ...student, matricule: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordStudent" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    <input type="password" className="form-control text-center" id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" onChange={(e) => setStudent({ ...student, password: e.target.value })} required />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default StudentLogin
