import React from 'react'

const MonitorInternshipOffer = ({ onAdd }) => {

    return (
        <div className="grad">
            <MonitorNavbar />
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-secondary text-center">Déposer offre de stage</h2>
                    <form className="container-fluid" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                            {error.companyName !== "" ? error.companyName : ""}
                            <input type="text" className="form-control text-center" id="companyName" name="companyName" placeholder="Entrez le nom de l'entreprise" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                            {error.address !== "" ? error.address : ""}
                            <input type="text" className="form-control text-center" id="address" name="address" placeholder="Entrez l'adresse des bureaux" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                            {error.salary !== undefined ? error.salary : undefined}
                            <input type="text" className="form-control text-center" id="salary" name="salary" placeholder="Entrez le salaire proposé" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Position: </label>
                            {error.jobTitle !== "" ? error.jobTitle : ""}
                            <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" placeholder="Entrez le nom du position" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                            {error.description !== "" ? error.description : ""}
                            <textarea type="text" className="form-control text-center" id="description" name="description" rows="3" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            {error.skills !== "" ? error.skills : ""}
                            <textarea type="text" className="form-control text-center" id="skills" name="skills" rows="3" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobType" className="text-secondary"><i className="fas fa-briefcase"></i> Type de postes: </label>
                            {error.jobTitle !== "" ? error.jobTitle : ""}
                            <select className="form-control text-center" id="jobType" name="jobType" placeholder="Entrez le type de postes" onChange={validateInput} required >
                                <option>Temps plein</option>
                                <option>Temps partiel</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Répresentant de l'entreprise (email): </label>
                            {error.monitorEmail !== "" ? error.monitorEmail : ""}
                            <input type="email" className="form-control text-center" id="monitorEmail" name="monitorEmail" placeholder="Entrez l'email du représentant" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                            {error.workingHours !== undefined ? error.workingHours : undefined}
                            <input type="text" className="form-control text-center" id="workingHours" name="workingHours" placeholder="Entrez le nombre d'heures de travail" onChange={validateInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                            {error.jobSchedules !== "" ? error.jobSchedules : ""}
                            <input type="text" className="form-control text-center" id="jobSchedules" name="jobSchedules" placeholder="Entrez l'horaire de travail. Ex: Temps plein, jour, soir" onChange={validateInput} required />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MonitorInternshipOffer
