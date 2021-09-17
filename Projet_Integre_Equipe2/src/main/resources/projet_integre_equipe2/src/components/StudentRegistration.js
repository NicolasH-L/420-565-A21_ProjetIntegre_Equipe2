import React from 'react'
import {useState} from 'react'

const StudentRegistration = () => {
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password, setPassword] = useState("")
    const [matricule, setMatricule] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if (!lastName && !firstName && !password && !matricule){
            alert("Veuillez remplir tous les champs!")
            return
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div class="form-group">
                    <label for="lastName">Nom: </label>
                    <input type="text" class="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="firstName">Prénom: </label>
                    <input type="firstName" class="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe: </label>
                    <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="matricule">Matricule: </label>
                    <input type="text" class="form-control" id="matricule" value={matricule} onChange={(e) => setMatricule(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default StudentRegistration
