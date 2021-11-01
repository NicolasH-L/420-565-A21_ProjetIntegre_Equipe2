<template>
  <div>
    <form @submit.prevent="login()" className="container-fluid" >
      <div className="form-group">
        <label htmlFor="matriculeStudent" className="text-secondary"
          ><i className="fas fa-id-badge"></i> Matricule:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="matriculeStudent"
          name="matricule"
          placeholder="Entrez votre matricule"
          v-model="student.matricule"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordStudent" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordStudent"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="student.password"
          required
        />
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-block btn-primary grad text-white">
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from '../../router'
import LoginService from './LoginService'

export default {
  name: "StudentLogin",
  data(){
    return {
      student: {
        matricule: "",
        password: ""
      }
    }
  },
  methods: {
    login(){
      LoginService.loginStudent(this.student.matricule,this.student.password).then((response) => {
        console.log(response)
        router.push("/succes", response)
      })
    }
  },
}
</script>

<style></style>
