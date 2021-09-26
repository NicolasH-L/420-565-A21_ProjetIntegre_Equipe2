import _ from 'lodash';
import React from 'react'
import { useState } from 'react'

const MonitorLogin = ({ login }) => {
    const [monitor, setMonitor] = useState({password: "", email: "" });
    const [error, setError] = useState({password: "", email: "" })

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.password) || !_.isEmpty(error.email) || _.isEmpty(monitor.password) || _.isEmpty(monitor.email)) {
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            console.log(monitor)
        }
        login(monitor)
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="emailMonitor" className="text-secondary"><i class="fas fa-at"></i> Courriel: </label>
                    {error.email !== "" ? error.email : ""}
                    <input type="email" className="form-control text-center" id="emailMonitor" name="email" placeholder="Entrez votre adresse courriel" onChange={validateInput} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordMonitor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordMonitor" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required/>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default MonitorLogin