import React from 'react'
import { useState } from 'react'

const MonitorRegistration = () =>{
    const [monitor, setMonitor] = useState({lastName:"", firstName:"", password:"", enterpriseName:"", email:""});
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!monitor.lastName && !monitor.firstName && !monitor.password && !monitor.enterpriseName && !monitor.email){
            alert("Veuillez remplir tous les champs!")
            return
        }
    }
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <h1 className="text-center">Formulaire d'inscription</h1>
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
                    <label for="enterpriseName">Nom de l'entreprise: </label>
                    <input type="enterpriseName" class="form-control" id="enterpriseName" value={enterpriseName} onChange={(e) => setEnterpriseName(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="email">Courriel: </label>
                    <input type="text" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default MonitorRegistration