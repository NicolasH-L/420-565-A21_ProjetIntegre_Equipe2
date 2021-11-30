import _ from 'lodash';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

const SupervisorLogin = ({ onLogin, authLogin }) => {
    const [supervisor, setSupervisor] = useState({ lastName: "", firstName: "", matricule: "", password: "" })
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
        if (!_.isEmpty(error.credentials) || _.isEmpty(supervisor.password) || _.isEmpty(supervisor.matricule)) {
            setError({ ...error, credentials: "Matricule ou mot de passe incorrect" })
            return
        } else {
            onLogin(supervisor.matricule, supervisor.password)
                .then((data) => data.matricule != null ? signIn(data) : fireSwalError())
                .catch((err) => console.log(err))
        }

        function signIn(supervisor) {
            authLogin("supervisor")
            history.push("/Supervisor", { supervisor })
        }
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    {error.credentials !== "" ? error.credentials : ""}
                    <label htmlFor="matriculeSupervisor" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    <input type="text" className="form-control text-center" id="matriculeSupervisor" name="matricule" placeholder="Entrez votre matricule" onChange={(e) => setSupervisor({ ...supervisor, matricule: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSupervisor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    <input type="password" className="form-control text-center" id="passwordSupervisor" name="password" placeholder="Entrez votre mot de passe" onChange={(e) => setSupervisor({ ...supervisor, password: e.target.value })} required />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default SupervisorLogin
