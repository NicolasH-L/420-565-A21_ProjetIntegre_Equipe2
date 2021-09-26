import _ from 'lodash';
import React from 'react'
import { useState } from 'react'

const AdminLogin = ({ login }) => {
    const [admin, setAdmin] = useState({username: "", password: ""});
    const [error, setError] = useState({credentials:""})

    const onSubmit = (e) => {
        e.preventDefault()
        if (_.isEmpty(admin.username) || _.isEmpty(admin.password)) {
            setError({...error, credentials: "Matricule ou mot de passe incorrect"})
            return
        } else {
            console.log(admin)
        }
        login({ admin })
    }

    
    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="usernameAdmin" className="text-secondary"><i class="fas fa-user"></i> Nom d'utilisateur: </label>
                    {error.username !== "" ? error.username : ""}
                    <input type="text" className="form-control text-center" id="usernameAdmin" name="username" placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setAdmin({...admin, username: e.target.value}) } required/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordAdmin" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordAdmin" name="password" placeholder="Entrez votre mot de passe" onChange={(e) => setAdmin({...admin, password: e.target.value}) } required/>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin