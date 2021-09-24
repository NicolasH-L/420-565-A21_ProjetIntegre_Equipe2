import _ from 'lodash';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import MonitorLogin from './MonitorLogin';
// to use router hook we will need to npm i hookrouter
const MonitorRegistration = ({ onAdd }) => {
    const [monitor, setMonitor] = useState({ lastName: "", firstName: "", password: "", enterpriseName: "", email: "" });
    const [error, setError] = useState({ lastName: "", firstName: "", password: "", enterpriseName: "", email: "" })

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password) || !_.isEmpty(error.enterpriseName) || !_.isEmpty(error.email) ||
            _.isEmpty(monitor.firstName) || _.isEmpty(monitor.lastName) || _.isEmpty(monitor.password) || _.isEmpty(monitor.enterpriseName) || _.isEmpty(monitor.email)) {
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            console.log(monitor)
        }
        onAdd({ monitor })
    }

    // const routes = {
    //     "/monitorLogin": () => <MonitorLogin />
    // }

    const validateInput = (e) => {
        let pattern;
        let inputError;
        let patternEmail = /^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$/;
        let patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/;
        let patternEnterprise = /^[^ ]+([ ]{0,1}[^ ]+)+$/;
        let patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (e.target.name === "email")
            pattern = new RegExp(patternEmail);
        else if (e.target.name === "lastName" || e.target.name === "firstName")
            pattern = new RegExp(patternName);
        else if (e.target.name === "enterpriseName")
            pattern = new RegExp(patternEnterprise)
        else if (e.target.name === "password")
            pattern = new RegExp(patternPassword)

        if (pattern === undefined)
            return;

        if (!pattern.test(e.target.value) || e.target.value === "") {
            e.target.style.borderColor = "red";
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
            inputError = <strong className="text-danger"> <i className="fas fa-exclamation-circle text-danger fa-sm" ></i> Erreur de {e.target.name}!</strong>;
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
            <form className="container-fluid col-sm-6 col-md-12" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastName" className="text-secondary"><i className="fas fa-user"></i> Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control text-center" id="lastNameMonitor" name="lastName" placeholder="Entrez votre nom de famille" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="text" className="form-control text-center" id="firstNameMonitor" name="firstName" placeholder="Entrez votre prénom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordMonitor" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="enterpriseName" className="text-secondary"><i class="fas fa-building"></i> Nom de l'entreprise: </label>
                    {error.enterpriseName !== "" ? error.enterpriseName : ""}
                    <input type="text" className="form-control text-center" id="enterpriseNameMonitor" name="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="text-secondary"><i class="fas fa-at"></i> Courriel: </label>
                    {error.email !== "" ? error.email : ""}
                    <input type="email" className="form-control text-center" id="emailMonitor" name="email" placeholder="Entrez votre adresse courriel" onChange={validateInput} required />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <Link className="btn btn-block grad text-white" to='/Login'>Se connecter</Link>
                </div>
            </form>
        </div>
    )
}

export default MonitorRegistration