<template>
  <div className="grad">
    <MonitorNavbar></MonitorNavbar>
    <div className="d-flex justify-content-center">
      <div
        className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen"
      >
        <h2 className="text-secondary text-center">Déposer offre de stage</h2>
        <form
          className="container-fluid"
          id="monitorInternshipForm"
          @submit.prevent="login()"
        >
          <div className="form-group">
            <label htmlFor="companyName" className="text-secondary"
              ><i className="fas fa-building"></i> Nom de l'entreprise:
            </label>
            <input
              type="text"
              className="form-control text-center"
              id="companyName"
              name="companyName"
              v-model="company"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="text-secondary"
              ><i className="fas fa-map-marker-alt"></i> Adresse:
            </label>
            <input
              type="text"
              className="form-control text-center"
              id="address"
              name="address"
              placeholder="Entrez l'adresse des bureaux"
              v-model="offer.address"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary" className="text-secondary"
              ><i className="fas fa-money-bill-wave"></i> Salaire:
            </label>
            <input
              type="text"
              className="form-control text-center"
              id="salary"
              name="salary"
              placeholder="Entrez le salaire proposé"
              v-model="offer.salary"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle" className="text-secondary"
              ><i className="fas fa-briefcase"></i> Position:
            </label>
            <input
              type="text"
              className="form-control text-center"
              id="jobTitle"
              name="jobTitle"
              placeholder="Entrez le nom de la position"
              v-model="offer.jobTitle"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="text-secondary"
              ><i className="fas fa-clipboard"></i> Description:
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="Entrez la description"
              v-model="offer.description"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills" className="text-secondary"
              ><i className="fas fa-book"></i> Compétences:
            </label>
            <textarea
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              rows="3"
              placeholder="Entrez les compétences"
              v-model="offer.skills"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="monitorEmail" className="text-secondary"
              ><i className="fas fa-at"></i> Représentant de l'entreprise
              (email):
            </label>
            <input
              type="email"
              className="form-control text-center"
              id="monitorEmail"
              name="monitorEmail"
              v-model="emailMonitor"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="workingHours" className="text-secondary"
              ><i className="fas fa-business-time"></i> Heures de travail:
            </label>
            <input
              type="text"
              className="form-control text-center"
              id="workingHours"
              name="workingHours"
              placeholder="Entrez le nombre d'heures de travail"
              v-model="offer.workingHours"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobSchedules" className="text-secondary"
              ><i className="fas fa-calendar-alt"></i> Horaire de travail:
            </label>
            <select
              defaultValue="DEFAULT"
              className="form-control text-center"
              id="jobSchedules"
              name="jobSchedules"
              v-model="offer.jobSchedules"
              v-on:input="validateInput"
              required
            >
              <option value="DEFAULT"
                >Veuillez choisir le type d'horaire</option
              >
              <option value="Temps plein">Temps plein</option>
              <option value="Temps partiel">Temps partiel</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="displayDate" className="text-secondary"
              ><i className="fas fa-calendar"></i> Date d'affichage:</label
            >

            <input
              type="date"
              :min="today"
              :max="findFutureDate()"
              id="displayDate"
              name="displayDate"
              className="form-control text-center"
              v-model="offer.displayDate"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadlineDate" className="text-secondary"
              ><i className="fas fa-calendar"></i> Date limite:</label
            >

            <input
              type="date"
              :min="today"
              :max="findFutureDate()"
              id="deadlineDate"
              name="deadlineDate"
              className="form-control text-center"
              v-model="offer.deadlineDate"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startInternshipDate" className="text-secondary"
              ><i className="fas fa-calendar"></i> Début stage</label
            >

            <input
              type="date"
              :min="today"
              :max="findFutureDate()"
              id="startInternshipDate"
              name="startInternshipDate"
              className="form-control text-center"
              v-model="offer.startInternshipDate"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endInternshipDate" className="text-secondary"
              ><i className="fas fa-calendar"></i> Fin stage</label
            >

            <input
              type="date"
              :min="today"
              :max="findFutureDate()"
              id="endInternshipDate"
              name="endInternshipDate"
              className="form-control text-center"
              v-model="offer.endInternshipDate"
              v-on:input="validateInput"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-block btn-primary grad text-white"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { RegexPattern } from "../RegexPattern";
import MonitorNavbar from "./MonitorNavbar.vue";
import MonitorService from "./MonitorService"
import _ from "lodash";

let company;
let emailMonitor;
const timeElapsed = Date.now();
const monitor = "historyState"


export default {
  name: "MonitorIntershipOffer",
  components: {
    MonitorNavbar,
  },
  data() {
    return {
      today: new Date(timeElapsed).toISOString().split("T")[0],
      offer: {
        companyName: company,
        address: "",
        salary: "5646656",
        jobTitle: "asdasd",
        description: "asdasda",
        skills: "asdasdasd",
        jobSchedules: "efdfs",
        workingHours: "54",
        monitorEmail: emailMonitor,
        displayDate: "2021-11-18",
        deadlineDate: "2021-12-18",
        startInternshipDate: "2021-12-19",
        endInternshipDate: "2021-12-20",
        session: "",
      },
      error: {
        address: "",
        salary: "",
        jobTitle: "",
        description: "",
        skills: "",
        jobSchedules: "",
        workingHours: "",
        displayDate: "",
        deadlineDate: "",
        startInternshipDate: "",
        endInternshipDate: "",
      },
    };
  },
  methods: {
    findFutureDate() {
      let futureDate = new Date(timeElapsed);
      futureDate.setDate(futureDate.getDate() + 220);
      let futureDateFormat = futureDate.toISOString().split("T")[0];
      return futureDateFormat;
    },
    validateInput(e) {
      let pattern;
      let inputError
      let patternGeneral = RegexPattern.getPatternGeneral();
      let patternNumber = RegexPattern.getPatternNumber();

      if (
        e.target.name === "address" ||
        e.target.name === "jobTitle" ||
        e.target.name === "description" ||
        e.target.name === "skills"
      )
        pattern = new RegExp(patternGeneral);
      else if (e.target.name === "salary" || e.target.name === "workingHours")
        pattern = new RegExp(patternNumber);

      if (
        (pattern === undefined &&
          e.target.name === "jobSchedules" &&
          e.target.value === "DEFAULT") ||
        (pattern !== undefined && !pattern.test(e.target.value)) ||
        e.target.value === ""
      ) {
        e.target.style.borderColor = "red";
        e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
        inputError = <strong className="text-danger"> Erreur <i className="fas fa-exclamation-circle text-danger fa-sm" ></i></strong>
      } else {
        e.target.style.borderColor = "#ced4da";
        e.target.style.boxShadow = "none";
        inputError = ""
        this.error[e.target.name] = e.target.value
      }
      this.error[e.target.name] = inputError
    },
    login(){
        if (!_.isEmpty(this.error.address) || !_.isEmpty(this.error.salary) || !_.isEmpty(this.error.jobTitle) ||
            !_.isEmpty(this.error.description) || !_.isEmpty(this.error.skills) || !_.isEmpty(this.error.jobSchedules) ||
            !_.isEmpty(this.error.workingHours) || !_.isEmpty(this.error.displayDate) || !_.isEmpty(this.error.deadlineDate) ||
            !_.isEmpty(this.error.startInternshipDate) || !_.isEmpty(this.error.endInternshipDate) ||
            _.isEmpty(this.offer.companyName) || _.isEmpty(this.offer.address) || _.isEmpty(this.offer.salary) ||
            _.isEmpty(this.offer.jobTitle) || _.isEmpty(this.offer.description) || _.isEmpty(this.offer.skills) ||
            _.isEmpty(this.offer.jobSchedules) || _.isEmpty(this.offer.workingHours) || _.isEmpty(this.offer.monitorEmail) ||
            _.isEmpty(this.offer.displayDate) || _.isEmpty(this.offer.deadlineDate) || _.isEmpty(this.offer.startInternshipDate) ||
            _.isEmpty(this.offer.endInternshipDate)
        ) {
            alert("Veuillez remplir tous les champs!")
            return
        } else {
            this.setOfferSession()
            this.verifyMonitorExists(this.offer.monitorEmail)
                .then((data) => data ? this.submitOffer() : alert("Aucun moniteur existant avec cet email!"))
        }
    },
    submitOfferSuccess() {
        alert("Ajout de l'offre de stage avec succès")
        document.getElementById("monitorInternshipForm").reset()
        history.push("/MonitorOfferList", { monitor })
    },
    submitOffer() {
            MonitorService.addOffer(this.offer)
                .then((data) => data.jobTitle !== null ? this.submitOfferSuccess() : alert("Impossible de créer l'offre, veuillez réessayer!"))
                .catch((err) => console.log(err))
    },
    setValue(target) {
      for (const value in this.offer){
        if(target === value){
          console.log(value)
          console.log(this.offer[value])
        }
      }
    },
  },
  
};
</script>

<style></style>
