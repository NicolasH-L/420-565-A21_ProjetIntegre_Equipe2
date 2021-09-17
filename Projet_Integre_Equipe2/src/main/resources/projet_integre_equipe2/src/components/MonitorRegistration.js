import React from 'react'
import { useState } from 'react'
import work from '../images/background-01.jpg'

const MonitorRegistration = () => {
    const [monitor, setMonitor] = useState({ lastName: "", firstName: "", password: "", enterpriseName: "", email: "" });

    const onSubmit = (e) => {
        e.preventDefault()
        if (!monitor.lastName || !monitor.firstName || !monitor.password || !monitor.enterpriseName || !monitor.email) {
            alert("Veuillez remplir tous les champs!")
            return
        }
        onAdd({monitor})
    }

    const [error, setError] = useState({
        errLastName: "", errFirstName: "",
        errPassword: "", errEnterpriseName: "", errEmail: ""
    });

    const validateInput = (e) => {
        // let pattern = RegExp("[^a-zA-ZéÉèÈïÏêÊ-]");
        let pattern;
        
        // changer pattern 
        if (e.target.type == "email") {
            pattern = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');
            console.log("s "+ pattern)
        }else{
            pattern = new RegExp("[^a-zA-ZéÉèÈïÏêÊ-]");
        }

        if (!pattern.test(e.target.value) || e.target.value == "") {
            e.target.style.borderColor = "red";
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
            let inputError = <strong className="text-danger"> Erreur de {e.target.name}!</strong>;
            if (e.target.name === "Nom de courriel") {
                setError({ ...error, errEmail: inputError })
            }
        } else {
            e.target.style.borderColor = "#ced4da";
            e.target.style.boxShadow = "none"
            setError({ ...error, errEmail: "" })
            console.log("nom du target: " + e.target.name)
        }
    }
    return (
        <>
            <div className="py-5" style={{ backgroundImage: `url(${work})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <form className="my-5 py-5 text-center col-md-3 container-fluid bg-white rounded" onSubmit={onSubmit}>
                    <h1 className="text-center">Formulaire d'inscription du moniteur</h1>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom: </label>
                        {error.errLastName !== "" ? error.errLastName : ""}
                        {/* <input type="text" className="form-control" id="lastName" placeholder="Entrez votre nom de famille" onChange={(e) => setMonitor({ ...monitor, lastName: e.target.value })} /> */}
                        <input type="text" name="Nom" className="form-control text-center" id="lastName" placeholder="Entrez votre nom de famille" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom: </label>
                        {error.errFirstName !== "" ? error.errFirstName : ""}
                        {/* <input type="firstName" className="form-control" id="firstName" placeholder="Entrez votre prénom" onChange={(e) => setMonitor({ ...monitor, firstName: e.target.value })} /> */}
                        <input type="text" name="Prénom" className="form-control text-center" id="firstName" placeholder="Entrez votre prénom" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe: </label>
                        {error.errPassword !== "" ? error.errPassword : ""}
                        {/* <input type="password" name="Mot de passe" className="form-control text-center" id="password" placeholder="Entrez votre mot de passe" onChange={(e) => setMonitor({ ...monitor, password: e.target.value })} /> */}
                        <input type="password" name="Mot de passe" className="form-control text-center" id="password" placeholder="Entrez votre mot de passe" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="enterpriseName">Nom de l'entreprise: </label>
                        {error.enterpriseName !== "" ? error.errEnterpriseName : ""}
                        {/* <input type="text" name="Nom de l'entreprise" className="form-control text-center" id="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={(e) => setMonitor({ ...monitor, enterpriseName: e.target.value })} /> */}
                        <input type="text" name="Nom de l'entreprise" className="form-control text-center" id="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Courriel: </label>
                        {error.errEmail !== "" ? error.errEmail : ""}
                        {/* <input type="email" name="Nom de courriel" className="form-control" id="email" placeholder="Entrez votre adresse courriel" onChange={(e) => setMonitor({ ...monitor, email: e.target.value })} /> */}
                        <input type="email" name="Nom de courriel" className="form-control text-center" id="email" placeholder="Entrez votre adresse courriel" onChange={validateInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default MonitorRegistration