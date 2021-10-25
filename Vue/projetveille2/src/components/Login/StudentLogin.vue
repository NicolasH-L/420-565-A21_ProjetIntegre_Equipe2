<template>
  <div>
    <form className="container-fluid" onSubmit="{onSubmit}">
      <div className="form-group">
        <label htmlFor="matriculeStudent" className="text-secondary"
          ><i className="fas fa-id-badge"></i> Matricule:
        </label>
        <input type="text" className="form-control text-center"
        id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" required />
      </div>
      <div className="form-group">
        <label htmlFor="passwordStudent" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input type="password" className="form-control text-center"
        id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" required />
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-block grad text-white ">
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "StudentLogin",
  props: {},
};
</script>

<style>
</style>