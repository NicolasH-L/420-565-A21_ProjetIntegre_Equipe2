import _ from 'lodash';
import React from 'react'
import { useState } from 'react'
import work from '../images/background-01.jpg'

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


        if (e.target.id === "lastName" || e.target.id === "firstName") {
            pattern = new RegExp(patternName);
        } else if (e.target.id === "matricule") {
            pattern = new RegExp(patternMatricule)
        } else if (e.target.id === "password") {
            pattern = new RegExp(patternPassword)
        }

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
            setSupervisor({ ...supervisor, [e.target.id]: e.target.value })
        }

        setError({ ...error, [e.target.id]: inputError })
    }

    return (
        <>
            <div className="py-5" style={{ backgroundImage: `url(${work})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <form className="my-5 py-5 text-center col-sm-12 col-md-9 col-lg-6 col-xl-4 container-fluid bg-white rounded" onSubmit={onSubmit}>
                    <h1 className="text-center">Formulaire d'inscription du superviseur</h1>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom: </label>
                        {error.lastName !== "" ? error.lastName : ""}
                        <input type="text" className="form-control text-center" id="lastName" placeholder="Entrez votre nom" onChange={validateInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom:</label>
                        {error.firstName !== "" ? error.firstName : ""}
                        <input type="text" id="firstName" name="firstName" className="form-control text-center" required placeholder="Entrez votre prénom" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="matricule">Matricule: </label>
                        {error.matricule !== "" ? error.matricule : ""}
                        <input type="text" name="matricule" className="form-control text-center" id="matricule" required placeholder="Entrez votre mot de passe" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe: </label>
                        {error.password !== "" ? error.password : ""}
                        <input type="password" name="password" className="form-control text-center" id="password" required placeholder="Entrez votre mot de passe" onChange={validateInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SupervisorRegistration
