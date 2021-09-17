import React from 'react'
import {useState} from 'react'

const StudentRegistration = () => {
    const [student, setStudent] = useState({lastName:"", firstName:"", password:"", matricule:""});

    const onSubmit = (e) => {
        e.preventDefault()

        if (!student.lastName && !student.firstName && !student.password && !student.matricule){
            alert("Veuillez remplir tous les champs!")
            return
        }

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div class="form-group">
                    <label for="lastName">Nom: </label>
                    <input type="text" class="form-control" id="lastName"  onChange={(e) => setStudent({...student, lastName: e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="firstName">Prénom: </label>
                    <input type="firstName" class="form-control" id="firstName"  onChange={(e) => setStudent({...student, firstName: e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe: </label>
                    <input type="password" class="form-control" id="password"  onChange={(e) => setStudent({...student, password: e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="matricule">Matricule: </label>
                    <input type="text" class="form-control" id="matricule"  onChange={(e) => setStudent({...student, firstName: e.target.value})}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default StudentRegistration
