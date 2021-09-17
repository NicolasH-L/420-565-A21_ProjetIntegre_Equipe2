import React from 'react'
import { useState } from 'react'
import background from "../images/background-01.jpg";


const MonitorRegistration = ({onAdd}) =>{
    const [monitor, setMonitor] = useState({lastName:"", firstName:"", password:"", enterpriseName:"", email:""});
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!monitor.lastName || !monitor.firstName || !monitor.password || !monitor.enterpriseName || !monitor.email){
            alert("Veuillez remplir tous les champs!")
            return
        }
        onAdd({monitor})
    }
    
    return (
        <>
            <h1 className="text-center">Formulaire d'inscription du moniteur</h1>
            <form className="text-center col-md-3 container-fluid" style={{ backgroundImage: `url(${background})`}} onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastName">Nom: </label>
                    <input type="text" className="form-control" id="lastName" placeholder="Entrez votre nom de famille" onChange={(e) => setMonitor({...monitor, lastName:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom: </label>
                    <input type="firstName" className="form-control" id="firstName" placeholder="Entrez votre prénom" onChange={(e) => setMonitor({...monitor, firstName:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" onChange={(e) => setMonitor({...monitor, password:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="enterpriseName">Nom de l'entreprise: </label>
                    <input type="enterpriseName" className="form-control" id="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={(e) => setMonitor({...monitor, enterpriseName:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Courriel: </label>
                    <input type="text" className="form-control" id="email" placeholder="Entrez votre adresse courriel" onChange={(e) => setMonitor({...monitor, email:e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default MonitorRegistration