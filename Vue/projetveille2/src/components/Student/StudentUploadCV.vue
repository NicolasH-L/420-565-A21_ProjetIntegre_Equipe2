<template>
  <div className="grad">
    <StudentNavbar></StudentNavbar>
    <div className="d-flex justify-content-center">
      <div
        className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen"
      >
        <form className="container-fluid" @submit.prevent="uploadCV()">
          <h1 className="text-center text-secondary">Téléverser CV</h1>
          <div className="form-group">
            <label htmlFor="fileName" className="text-secondary"
              ><i className="fas fa-file-pdf"></i> Nom du fichier :</label
            >
            <input
              type="text"
              className="form-control form-control-lg"
              id="fileName"
              name="fileName"
              v-model="uploadFileName"
            />
          </div>
          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                id="customFileLangHTML"
                v-on:input="setValues"
              />
              <label
                className="custom-file-label"
                htmlFor="customFileLangHTML"
                data-browse="Parcourir"
                >Sélectionner un fichier</label
              >
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-block btn-primary text-white "
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import StudentNavbar from "./StudentNavbar.vue";
import axios from "axios";
import _ from "lodash";
import bsCustomFileInput from "bs-custom-file-input";

export default {
  name: "StudentUploadCV",
  components: {
    StudentNavbar,
  },
  data() {
    return {
      uploadFile: "",
      uploadFileName: "",
      student: this.$route.params,
    };
  },
  methods: {
    beforeMount() {
      this.student = this.$route.params;
    },
    uploadCV() {
      console.log(this.uploadFileName)
      if (
        typeof this.uploadFile !== "undefined" &&
        !_.isEmpty(this.uploadFileName)
      ) {
        var fileSignature = this.uploadFileName + ":" + this.student.id + ":" +"winter";
        var fileSignatureJSON = JSON.stringify(fileSignature);
        const formData = new FormData();
        formData.append("uploadFile", this.uploadFile, fileSignatureJSON);
        axios
          .post("http://localhost:8888/uploadcv", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            alert("Cv téléverser avec succès");
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            alert("Une erreur est survenue lors du transfert de fichier");
          });
      } else {
        alert("Veuillez remplir les champs");
      }
    },
    setValues(e) {
    this.uploadFile = e.target.files[0];
    bsCustomFileInput.init();
  },
  },
};
</script>

<style></style>
