import React from 'react'
import {useState} from 'react'

const StudentRegistration = ({onAdd}) => {
    const [student, setStudent] = useState({lastName:"", firstName:"", password:"", matricule:""});

    const onSubmit = (e) => {
        e.preventDefault()

        if (!student.lastName || !student.firstName || !student.password || !student.matricule){
            alert("Veuillez remplir tous les champs!")
            return
        }
        onAdd({student})
    }

    return (
        <div className="container w-25">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastName">Nom: </label>
                    <input type="text" className="form-control" id="lastName"  onChange={(e) => setStudent({...student, lastName: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom: </label>
                    <input type="firstName" className="form-control" id="firstName"  onChange={(e) => setStudent({...student, firstName: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" className="form-control" id="password"  onChange={(e) => setStudent({...student, password: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="matricule">Matricule: </label>
                    <input type="text" className="form-control" id="matricule"  onChange={(e) => setStudent({...student, matricule: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default StudentRegistration
