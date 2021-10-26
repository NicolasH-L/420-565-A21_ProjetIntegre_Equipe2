<template>
  <div>
    <form className="container-fluid" onSubmit="{onSubmit}">
      <div className="form-group">
        <label htmlFor="usernameAdmin" className="text-secondary"
          ><i className="fas fa-user"></i> Nom d'utilisateur:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="usernameAdmin"
          name="username"
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordAdmin" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordAdmin"
          name="password"
          placeholder="Entrez votre mot de passe"
        />
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
  name: "AdminLogin",
  props: {},
};
</script>

<style></style>
