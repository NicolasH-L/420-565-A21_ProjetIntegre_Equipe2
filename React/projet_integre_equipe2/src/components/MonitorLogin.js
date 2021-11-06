import _ from 'lodash'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'

const MonitorLogin = ({ onLogin }) => {
    const [monitor, setMonitor] = useState({ password: "", email: "" })
    const [error, setError] = useState({ credentials: "" })
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.credentials) || _.isEmpty(monitor.password) || _.isEmpty(monitor.email)) {
            setError({ ...error, credentials: "Email ou mot de passe incorrect" })
            return
        } else {
            monitor.email = monitor.email.toLowerCase()
            onLogin(monitor.email, monitor.password)
                .then((data) => data.email != null ? history.push("/Monitor", { monitor: data }) : alert("Email ou mot de passe incorrect"))
        }
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    {error.credentials !== "" ? error.credentials : ""}
                    <label htmlFor="emailMonitor" className="text-secondary"><i className="fas fa-at"></i> Courriel: </label>
                    <input type="email" className="form-control text-center" id="emailMonitor" name="email" placeholder="Entrez votre adresse courriel" onChange={(e) => setMonitor({ ...monitor, email: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordMonitor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    <input type="password" className="form-control text-center" id="passwordMonitor" name="password" placeholder="Entrez votre mot de passe" onChange={(e) => setMonitor({ ...monitor, password: e.target.value })} required />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-block grad text-white ">Connexion</button>
                </div>
            </form>
        </div>
    )
}

export default MonitorLogin
