import _ from 'lodash';
import React from 'react'
import { useState } from 'react'

const SupervisorRegistration = ({ onAdd }) => {
    const [supervisor, setSupervisor] = useState({ lastName: "", firstName: "", matricule: "", password: "" })
    const [error, setError] = useState({ lastName: "", firstName: "", matricule: "", password: "" })

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password) || !_.isEmpty(error.matricule) ||
            _.isEmpty(supervisor.firstName) || _.isEmpty(supervisor.lastName) || _.isEmpty(supervisor.password) || _.isEmpty(supervisor.matricule)) {
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            console.log(supervisor)
        }
        onAdd({ supervisor })
    }

    const validateInput = (e) => {
        let pattern;
        let inputError;
        let patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/;
        let patternMatricule = /^[0-9]{7}$/;
        let patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (e.target.name === "lastName" || e.target.name === "firstName")
            pattern = new RegExp(patternName);
        else if (e.target.name === "matricule")
            pattern = new RegExp(patternMatricule)
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
            setSupervisor({ ...supervisor, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastNameSupervisor" className="text-secondary"><i className="fas fa-user"></i> Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control text-center" id="lastNameSupervisor" name="lastName" placeholder="Entrez votre nom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstNameSupervisor" className="text-secondary"><i className="fas fa-user"></i> Prénom:</label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="text" className="form-control text-center" id="firstNameSupervisor" name="firstName" placeholder="Entrez votre prénom" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="matriculeSupervisor" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    {error.matricule !== "" ? error.matricule : ""}
                    <input type="text" className="form-control text-center" id="matriculeSupervisor" name="matricule" placeholder="Entrez votre matricule" onChange={validateInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSupervisor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordSupervisor" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block grad text-white ">Soumettre</button>
                </div>
            </form>
        </div>
    )
}

export default SupervisorRegistration
