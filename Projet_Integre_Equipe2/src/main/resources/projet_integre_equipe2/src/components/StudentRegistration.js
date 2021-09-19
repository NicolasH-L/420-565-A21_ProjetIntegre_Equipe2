import _ from 'lodash';
import React from 'react'
import { useState } from 'react'
import work from '../images/background-01.jpg'

const StudentRegistration = ({onAdd}) => {
    const [student, setStudent] = useState({lastName:"", firstName:"", password:"", matricule:""});

    const onSubmit = (e) => {
        e.preventDefault()
        if (!_.isEmpty(error.lastName) || !_.isEmpty(error.firstName) || !_.isEmpty(error.password)|| !_.isEmpty(error.matricule) ||
            _.isEmpty(student.lastName) || _.isEmpty(student.firstName) || _.isEmpty(student.password )|| _.isEmpty(student.matricule)){
            console.log(student)
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            console.log(student)
        }
        onAdd({student})
    }

    const [error, setError] = useState({
        lastName: "", firstName: "",
        password: "", matricule: ""
    });

    const validateInput = (e) => {
        let pattern;
        let inputError;
        let patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/;
        let patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let patternMatricule = /^[0-9]{7}$/;

        if (e.target.id === "lastName" || e.target.id === "firstName")
            pattern = new RegExp(patternName);
        else  if (e.target.id === "password")
            pattern = new RegExp(patternPassword)
        else  if (e.target.id === "matricule")
            pattern = new RegExp(patternMatricule)
        
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
            setStudent({ ...student, [e.target.id]: e.target.value })
        }
        setError({ ...error, [e.target.id]: inputError })
    }

    return (
        <div className="py-5" style={{ backgroundImage: `url(${work})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <form className="my-5 py-5 text-center col-sm-12 col-md-9 col-lg-6 col-xl-4 container-fluid bg-white rounded" onSubmit={onSubmit}>
                <h1 className="text-center">Formulaire d'inscription élève</h1>
                <div className="form-group">
                    <label htmlFor="lastName">Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control" id="lastName" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom: </label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="firstName" className="form-control" id="firstName" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control" id="password" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="matricule">Matricule: </label>
                    {error.matricule !== "" ? error.matricule : ""}
                    <input type="text" className="form-control" id="matricule" onChange={validateInput} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default StudentRegistration
