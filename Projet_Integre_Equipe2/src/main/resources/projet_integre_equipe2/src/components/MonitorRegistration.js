import React from 'react'
import { useState } from 'react'
import work from '../images/background-01.jpg'

const MonitorRegistration = () => {
    const [monitor, setMonitor] = useState({ lastName: "", firstName: "", password: "", enterpriseName: "", email: "" });

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(monitor)
        if (!monitor.lastName || !monitor.firstName || !monitor.password || !monitor.enterpriseName || !monitor.email) {
            alert("Veuillez remplir tous les champs!")
            return
        }
    }

    const [error, setError] = useState({
        lastName: "", firstName: "",
        password: "", enterpriseName: "", email: ""
    });

    const validateInput = (e) => {
        // let pattern = RegExp("[^a-zA-ZéÉèÈïÏêÊ-]");
        let pattern;
        let inputError;
        
        // changer pattern 
        if (e.target.type == "email") {
            pattern = new RegExp('^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$');
            console.log("s "+ pattern)
        }else if(e.target.id == "lastName" || e.target.id == "firstName"){
            pattern = new RegExp(/^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/);
            console.log(pattern)
        }else if(e.target.id == "enterpriseName"){
            pattern = new RegExp('^[^ ]+[ ]*[^ ]*$')
        }else if(e.target.id == "password"){
            pattern = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')
        }

        if(pattern === undefined) {
            return;
        }

        if (!pattern.test(e.target.value) || e.target.value == "") {
            e.target.style.borderColor = "red";
            e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
            inputError = <strong className="text-danger"> Erreur de {e.target.name}!</strong>;
        } else {
            e.target.style.borderColor = "#ced4da";
            e.target.style.boxShadow = "none"
            inputError = ""
            setMonitor({...monitor, [e.target.id]: e.target.value})
            console.log("nom du target: " + e.target.name)
        }
        setError({ ...error, [e.target.id]: inputError })

    }
    return (
        <>
            <div className="py-5" style={{ backgroundImage: `url(${work})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <form className="my-5 py-5 text-center col-sm-12 col-md-9 col-lg-6 col-xl-4 container-fluid bg-white rounded" onSubmit={onSubmit}>
                    <h1 className="text-center">Formulaire d'inscription du moniteur</h1>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom: </label>
                        {error.lastName !== "" ? error.lastName : ""}
                        {/* <input type="text" className="form-control" id="lastName" placeholder="Entrez votre nom de famille" onChange={(e) => setMonitor({ ...monitor, lastName: e.target.value })} /> */}
                        <input type="text" name="Nom" className="form-control text-center" id="lastName" placeholder="Entrez votre nom de famille" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom: </label>
                        {error.firstName !== "" ? error.firstName : ""}
                        {/* <input type="firstName" className="form-control" id="firstName" placeholder="Entrez votre prénom" onChange={(e) => setMonitor({ ...monitor, firstName: e.target.value })} /> */}
                        <input type="text" name="Prénom" className="form-control text-center" id="firstName" placeholder="Entrez votre prénom" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe: </label>
                        {error.password !== "" ? error.password : ""}
                        {/* <input type="password" name="Mot de passe" className="form-control text-center" id="password" placeholder="Entrez votre mot de passe" onChange={(e) => setMonitor({ ...monitor, password: e.target.value })} /> */}
                        <input type="text" name="Mot de passe" className="form-control text-center" id="password" placeholder="Entrez votre mot de passe" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="enterpriseName">Nom de l'entreprise: </label>
                        {error.enterpriseName !== "" ? error.enterpriseName : ""}
                        {/* <input type="text" name="Nom de l'entreprise" className="form-control text-center" id="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={(e) => setMonitor({ ...monitor, enterpriseName: e.target.value })} /> */}
                        <input type="text" name="Nom de l'entreprise" className="form-control text-center" id="enterpriseName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Courriel: </label>
                        {error.email !== "" ? error.email : ""}
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