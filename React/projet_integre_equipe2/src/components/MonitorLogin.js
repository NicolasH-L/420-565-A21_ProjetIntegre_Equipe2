import _ from 'lodash';
import React from 'react'
import { useState } from 'react'

const MonitorLogin = () => {
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
    }

    const validateInput = (e) => {
        let pattern;
        let inputError;
        let patternEmail = /^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$/;
        let patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (e.target.name === "email")
            pattern = new RegExp(patternEmail);
        else if (e.target.name === "password") 
            pattern = new RegExp(patternPassword)

        if (pattern === undefined)
            return;
        
        if (!pattern.test(e.target.value) || e.target.value === "") {
            e.target.style.borderColor = "red";
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
            inputError = <strong className="text-danger"> Erreur de {e.target.name}!</strong>;
        } else {
            e.target.style.borderColor = "#ced4da";
            e.target.style.boxShadow = "none"
            inputError = ""
            setMonitor({ ...monitor, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
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