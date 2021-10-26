<template>
  <div>
    <form className="container-fluid" onSubmit="{onSubmit}">
      <div className="form-group">
        <label htmlFor="emailMonitor" className="text-secondary"
          ><i className="fas fa-at"></i> Courriel:
        </label>
        <input
          type="email"
          className="form-control text-center"
          id="emailMonitor"
          name="email"
          placeholder="Entrez votre adresse courriel"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordMonitor" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordMonitor"
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
  name: "MonitorLogin",
  props: {},
};
</script>

<style></style>
