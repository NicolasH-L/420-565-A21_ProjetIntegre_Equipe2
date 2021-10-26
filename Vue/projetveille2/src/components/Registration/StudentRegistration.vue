<template>
  <div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="lastNameStudent" className="text-secondary"><i className="fas fa-user"></i>  Nom: </label>
                    <input type="text" className="form-control text-center" id="lastNameStudent" name="lastName" placeholder="Entrez votre nom" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstNameStudent" className="text-secondary"><i className="fas fa-user"></i> Prénom: </label>
                    <input type="text" className="form-control text-center" id="firstNameStudent" name="firstName" placeholder="Entrez votre prénom" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="matriculeStudent" className="text-secondary"><i className="fas fa-id-badge"></i> Matricule: </label>
                    <input type="text" className="form-control text-center" id="matriculeStudent" name="matricule" placeholder="Entrez votre matricule" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordStudent" className="text-secondary"><i className="fas fa-lock"></i> Mot de passe: </label>
                    <input type="password" className="form-control text-center" id="passwordStudent" name="password" placeholder="Entrez votre mot de passe" required/>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-block grad text-white">Soumettre</button>
                </div>
            </form>
        </div>
</template>

<script>
export default {
name: "StudentRegistration",
  props: {},
}
</script>

<style>

</style>