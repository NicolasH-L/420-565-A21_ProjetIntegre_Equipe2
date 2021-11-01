<template>
  <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="matriculeSupervisor" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    <input type="text" className="form-control text-center" id="matriculeSupervisor" name="matricule" placeholder="Entrez votre matricule" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSupervisor" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    <input type="password" className="form-control text-center" id="passwordSupervisor" name="password" placeholder="Entrez votre mot de passe" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-block btn-primary grad text-white">Connexion</button>
                </div>
            </form>
        </div>
</template>

<script>
export default {
name: "SupervisorLogin",
  props: {},
}
</script>

<style>

</style>