<template>
  <div>
    <form className="container-fluid" @submit.prevent="login()">
      <div className="form-group">
        <label htmlFor="lastNameSupervisor" className="text-secondary"
          ><i className="fas fa-user"></i> Nom:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="lastNameSupervisor"
          name="lastName"
          placeholder="Entrez votre nom"
          v-model="supervisor.lastName"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstNameSupervisor" className="text-secondary"
          ><i className="fas fa-user"></i> Prénom:</label
        >
        <input
          type="text"
          className="form-control text-center"
          id="firstNameSupervisor"
          name="firstName"
          placeholder="Entrez votre prénom"
          v-model="supervisor.firstName"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="matriculeSupervisor" className="text-secondary"
          ><i className="fas fa-id-badge"></i> Matricule:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="matriculeSupervisor"
          name="matricule"
          placeholder="Entrez votre matricule"
          v-model="supervisor.matricule"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordSupervisor" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordSupervisor"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="supervisor.password"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-block grad text-white ">
          Soumettre
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../../router";
import RegistrationService from "./RegistrationService";
import _ from "lodash";
import { RegexPattern } from "../RegexPattern";

export default {
  name: "SupervisorRegistration",
  data() {
    return {
      supervisor: {
        matricule: "",
        password: "",
        lastName: "",
        firstName: "",
      },
      error: {
        matricule: "",
        password: "",
        lastName: "",
        firstName: "",
      },
    };
  },
  methods: {
    validateInput(e) {
      let pattern;
      let inputError;
      let patternName = RegexPattern.getPatternName();
      let patternMatricule = RegexPattern.getPatternMatricule();
      let patternPassword = RegexPattern.getPatternPassword();

      if (e.target.name === "lastName" || e.target.name === "firstName")
        pattern = new RegExp(patternName);
      else if (e.target.name === "password")
        pattern = new RegExp(patternPassword);
      else if (e.target.name === "matricule")
        pattern = new RegExp(patternMatricule);

      if (pattern === undefined) return;

      if (!pattern.test(e.target.value) || e.target.value === "") {
        e.target.style.borderColor = "red";
        e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
        inputError = (
          <strong className="text-danger">
            {" "}
            Erreur{" "}
            <i className="fas fa-exclamation-circle text-danger fa-sm"></i>
          </strong>
        );
      } else {
        e.target.style.borderColor = "#ced4da";
        e.target.style.boxShadow = "none";
        inputError = "";
        this.setValueSupervisor(e.target.name, e.target.value);
      }
      this.setErrorValue(e.target.name, inputError);
    },

    setErrorValue(target, value) {
      if ("matricule" == target) {
        this.error.matricule = value;
      }
      if ("lastName" == target) {
        this.error.lastName = value;
      }
      if ("firstName" == target) {
        this.error.firstName = value;
      }
      if ("password" == target) {
        this.error.password = value;
      }
    },

    setValueSupervisor(target, value) {
      if ("matricule" == target) {
        this.supervisor.matricule = value;
      }
      if ("lastName" == target) {
        this.supervisor.lastName = value;
      }
      if ("firstName" == target) {
        this.supervisor.firstName = value;
      }
      if ("password" == target) {
        this.supervisor.password = value;
      }
    },

    login() {
      if (
        !_.isEmpty(this.error.lastName) ||
        !_.isEmpty(this.error.firstName) ||
        !_.isEmpty(this.error.password) ||
        !_.isEmpty(this.error.matricule) ||
        _.isEmpty(this.supervisor.lastName) ||
        _.isEmpty(this.supervisor.firstName) ||
        _.isEmpty(this.supervisor.password) ||
        _.isEmpty(this.supervisor.matricule)
      ) {
        alert("Veuillez remplir tous les champs correctement!");
        return;
      } else {
        RegistrationService.addSupervisor(this.supervisor).then((response) => {
          response.matricule != undefined
            ? router.push("/login")
            : alert("Erreur! matricule existant").catch(() =>
                alert("Erreur! matricule existant")
              );
        });
      }
    },
  },
};
</script>

<style></style>
