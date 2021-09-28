import _ from 'lodash';
import React from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";


const StudentRegistration = ({onAdd}) => {
    const [student, setStudent] = useState({lastName:"", firstName:"", password:"", matricule:""});
    const [error, setError] = useState({lastName: "", firstName: "", password: "", matricule: ""});
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password)|| !_.isEmpty(error.matricule) ||
            _.isEmpty(student.lastName) || _.isEmpty(student.firstName) || _.isEmpty(student.password )|| _.isEmpty(student.matricule)){
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            onAdd(student)
                .then((data) => data.matricule !== undefined ? history.push("/Login", {student}) : alert("Erreur matricule existante"))
                .catch(() => alert("Erreur matricule existante"))
        }
    }

    const validateInput = (e) => {
        let pattern;
        let inputError;
        let patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/;
        let patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let patternMatricule = /^[0-9]{7}$/;

        if (e.target.name === "lastName" || e.target.name === "firstName")
            pattern = new RegExp(patternName);
        else  if (e.target.name === "password")
            pattern = new RegExp(patternPassword)
        else  if (e.target.name === "matricule")
            pattern = new RegExp(patternMatricule)
        
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
            setStudent({ ...student, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: inputError })
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastName" className="text-secondary"><i className="fas fa-user"></i>  Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control text-center" id="lastNameStudent" name="lastName" placeholder="Entrez votre nom" onChange={validateInput} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="text" className="form-control text-center" id="firstNameStudent" name="firstName" placeholder="Entrez votre prénom" onChange={validateInput} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="matricule" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    {error.matricule !== "" ? error.matricule : ""}
                    <input type="text" className="form-control text-center" id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" onChange={validateInput} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control text-center" id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" onChange={validateInput} required/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                </div>
            </form>
        </div>
    )
}

export default StudentRegistration
