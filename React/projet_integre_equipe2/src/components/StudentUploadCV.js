import axios from "axios";
import React from 'react';
import { useState } from 'react'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import bsCustomFileInput from 'bs-custom-file-input'
import StudentNavbar from "./StudentNavbar";

const StudentUploadCV = () => {
  const [uploadFile, setUploadFile] = useState();
  const [uploadFileName, setUploadFileName] = useState()
  const history = useHistory()

  const submitForm = (event) => {
    event.preventDefault();

    if (typeof (uploadFile) !== 'undefined' && typeof (history.location.state) !== 'undefined' && !_.isEmpty(uploadFileName)) {
      var fileSignature = uploadFileName + ":" + history.location.state.id
      var fileSinatureJSON = JSON.stringify(fileSignature);
      const formData = new FormData();
      formData.append("uploadFile", uploadFile, fileSinatureJSON);

      axios
        .post("http://localhost:8888/uploadcv", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        })
        .then((response) => {
          alert("Cv téléverser avec succes")
        })
        .catch((error) => {
          alert("Une erreur est survenue lors du transfert de fichier")
        });
    } else {
      alert("Une erreur est survenue lors du transfert de fichier")
    }
  };


  return (
    <div className="grad">
      <StudentNavbar/>
      <div className="d-flex justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
          <form className="container-fluid" onSubmit={submitForm}>
            <h1 className="text-center text-secondary">Téléverser CV</h1>
            <div className="form-group">
              <label htmlFor="fileName" className="text-secondary"><i className="fas fa-file-pdf"></i> Nom du fichier :</label>
              <input type='text' className="form-control form-control-lg" id="fileName" name="fileName" onChange={(e) => setUploadFileName(e.target.value)} />
            </div>
            <div className="form-group">
              <div class="custom-file">
                <input type="file" className="custom-file-input" accept="application/pdf" id="customFileLangHTML" onChange={(e) => { setUploadFile(e.target.files[0]); bsCustomFileInput.init() }} />
                <label class="custom-file-label" for="customFileLangHTML" data-browse="Parcourir">Sélectionner un fichier</label>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-block btn-primary text-white ">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default StudentUploadCV
