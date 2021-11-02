<template>
  <div className="grad">
            <MonitorNavbar></MonitorNavbar>
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-secondary text-center">Déposer offre de stage</h2>
                    <form className="container-fluid" id="monitorInternshipForm" >
                        <div className="form-group">
                            <label htmlFor="companyName" className="text-secondary"><i className="fas fa-building"></i> Nom de l'entreprise: </label>
                            <input type="text" className="form-control text-center" id="companyName" name="companyName" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="text-secondary"><i className="fas fa-map-marker-alt"></i> Adresse: </label>
                            <input type="text" className="form-control text-center" id="address" name="address" placeholder="Entrez l'adresse des bureaux"  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary" className="text-secondary"><i className="fas fa-money-bill-wave"></i> Salaire: </label>
                            <input type="text" className="form-control text-center" id="salary" name="salary" placeholder="Entrez le salaire proposé"  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobTitle" className="text-secondary"><i className="fas fa-briefcase"></i> Position: </label>
                            <input type="text" className="form-control text-center" id="jobTitle" name="jobTitle" placeholder="Entrez le nom de la position"  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="text-secondary"><i className="fas fa-clipboard"></i> Description: </label>
                            <textarea type="text" className="form-control" id="description" name="description" rows="3" placeholder="Entrez la description"  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills" className="text-secondary"><i className="fas fa-book"></i> Compétences: </label>
                            <textarea type="text" className="form-control" id="skills" name="skills" rows="3" placeholder="Entrez les compétences"  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monitorEmail" className="text-secondary"><i className="fas fa-at"></i> Représentant de l'entreprise (email): </label>
                            <input type="email" className="form-control text-center" id="monitorEmail" name="monitorEmail" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="workingHours" className="text-secondary"><i className="fas fa-business-time"></i> Heures de travail: </label>
                            <input type="text" className="form-control text-center" id="workingHours" name="workingHours" placeholder="Entrez le nombre d'heures de travail"  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobSchedules" className="text-secondary"><i className="fas fa-calendar-alt"></i> Horaire de travail: </label>
                            <select defaultValue='DEFAULT' className="form-control text-center" id="jobSchedules" name="jobSchedules"  required>
                                <option value="DEFAULT">Veuillez choisir le type d'horaire</option>
                                <option value="Temps plein">Temps plein</option>
                                <option value="Temps partiel">Temps partiel</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="displayDate" className="text-secondary"><i className="fas fa-calendar"></i> Date d'affichage:</label>
                            
                            <input type="date" min={today} max={findFutureDate()} id="displayDate" name="displayDate" className="form-control text-center"  required>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadlineDate" className="text-secondary"><i className="fas fa-calendar"></i> Date limite:</label>
                            
                            <input type="date" min={today} max={findFutureDate()} id="deadlineDate" name="deadlineDate" className="form-control text-center"  required>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Début stage</label>
                            
                            <input type="date" min={today} max={findFutureDate()} id="startInternshipDate" name="startInternshipDate" className="form-control text-center"  required>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endInternshipDate" className="text-secondary"><i className="fas fa-calendar"></i> Fin stage</label>
                            
                            <input type="date" min={today} max={findFutureDate()} id="endInternshipDate" name="endInternshipDate" className="form-control text-center"  required>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-block btn-primary grad text-white">Soumettre</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import MonitorNavbar from "./MonitorNavbar.vue"

export default {
    name:"MonitorIntershipOffer",
    components:{
        MonitorNavbar,
    }

}
</script>

<style>

</style>