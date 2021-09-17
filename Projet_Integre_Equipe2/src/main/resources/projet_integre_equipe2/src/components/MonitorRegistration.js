import React from 'react'
import { useState } from 'react'

const MonitorRegistration = () =>{
    const [monitor, setMonitor] = useState({lastName:"", firstName:"", password:"", enterpriseName:"", email:""});
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!monitor.lastName || !monitor.firstName || !monitor.password || !monitor.enterpriseName || !monitor.email){
            alert("Veuillez remplir tous les champs!")
            return
        }
    }
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <h1 className="text-center">Formulaire d'inscription du moniteur</h1>
                <div class="form-group">
                    <label for="lastName">Nom: </label>
                    <input type="text" class="form-control" id="lastName" placeholder="Entrez votre nom de famille" onChange={(e) => setMonitor({...monitor, lastName:e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="firstName">Prénom: </label>
                    <input type="firstName" class="form-control" id="firstName" placeholder="Entrez votre prénom" onChange={(e) => setMonitor({...monitor, firstName:e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe: </label>
                    <input type="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" onChange={(e) => setMonitor({...monitor, password:e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="enterpriseName">Nom de l'entreprise: </label>
                    <input type="enterpriseName" class="form-control" id="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={(e) => setMonitor({...monitor, enterpriseName:e.target.value})}/>
                </div>
                <div class="form-group">
                    <label for="email">Courriel: </label>
                    <input type="text" class="form-control" id="email" placeholder="Entrez votre adresse courriel" onChange={(e) => setMonitor({...monitor, email:e.target.value})}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default MonitorRegistration