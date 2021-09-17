import React from 'react'
import { useState } from 'react'

const MonitorRegistration = () => {
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password, setPassword] = useState("")
    const [company, SetCompany] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

    }


    return (
        <>
            <form onSubmit={onSubmit}>
                <div class="form-group">
                    <label>Nom:</label>
                    <input type="text" className="form-control" placeholder="Nom" />
                </div>
                <div class="form-group">
                    <label>Prénom:</label>
                    <input type="text" className="form-control" placeholder="Prénom" />
                </div>
                <div class="form-group">
                    <label>Mot de Passe:</label>
                    <input type="password" className="form-control" placeholder="Mot de Passe" />
                </div>
                <div class="form-group">
                    <label>Nom de l'entreprise:</label>
                    <input type="text" className="form-control" placeholder="Nom de l'entreprise" />
                </div>
                <div class="form-group">
                    <label>Courriel:</label>
                    <input type="email" className="form-control" placeholder="Courriel" />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default MonitorRegistration