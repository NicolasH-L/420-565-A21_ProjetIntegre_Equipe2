import _ from 'lodash';
import React from 'react'
import { useState } from 'react'


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

         if (e.target.id === "lastName" || e.target.id === "firstName") {
            pattern = new RegExp(patternName);
        } else  if (e.target.id === "password") {
            pattern = new RegExp(patternPassword)
        } else  if (e.target.id === "matricule") {
            pattern = new RegExp(patternMatricule)
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
            setStudent({ ...student, [e.target.id]: e.target.value })
        }
        setError({ ...error, [e.target.id]: inputError })
    }

    return (
        <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastName" className="text-secondary"><i className="fas fa-user"></i>  Nom: </label>
                    {error.lastName !== "" ? error.lastName : ""}
                    <input type="text" className="form-control" id="lastName" onChange={validateInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                    {error.firstName !== "" ? error.firstName : ""}
                    <input type="firstName" className="form-control" id="firstName" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    {error.password !== "" ? error.password : ""}
                    <input type="password" className="form-control" id="password" onChange={validateInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="matricule" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    {error.matricule !== "" ? error.matricule : ""}
                    <input type="text" className="form-control" id="matricule" onChange={validateInput} />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn grad text-white ">Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default StudentRegistration
