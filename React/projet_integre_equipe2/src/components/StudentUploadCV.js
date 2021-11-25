import axios from "axios"
import React from 'react'
import { useState } from 'react'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import bsCustomFileInput from 'bs-custom-file-input'
import StudentNavbar from "./StudentNavbar"
import Footer from "./Footer"

const StudentUploadCV = () => {
  const [uploadFile, setUploadFile] = useState()
  const [uploadFileName, setUploadFileName] = useState()
  const history = useHistory()
  const historyState = history.location.state
  const student = historyState.student
  const sessionPrefix = ["winter", "summer"]
  const lastMonthOfTheYear = 11
  const winterStart = 8
  const winterDeadLine = 1
  const summerStart = 2
  const summerDeadLine = 5

  const submitForm = (event) => {
    let documentSession = ""

    event.preventDefault()

    if (typeof (uploadFile) !== 'undefined' && typeof (historyState) !== 'undefined' && !_.isEmpty(uploadFileName)) {
      setDocumentSession()
      var fileSignature = uploadFileName + ":" + student.id + ":" + documentSession
      var fileSignatureJSON = JSON.stringify(fileSignature)
      const formData = new FormData()
      formData.append("uploadFile", uploadFile, fileSignatureJSON)

      axios
        .post("http://localhost:8888/uploadcv", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        })
        .then((response) => {
          alert("Cv téléverser avec succès")
        })
        .catch((error) => {
          alert("Une erreur est survenue lors du transfert de fichier")
        })
    } else {
      alert("Une erreur est survenue lors du transfert de fichier")
    }

    function setDocumentSession() {
      let sessionDate = new Date()
      let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
      let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
      let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
        : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
      documentSession = session
    }
  }

  return (
    <div>
      <div className="grad">
        <StudentNavbar useStudent={student} />
        <div className="d-flex justify-content-center">
          <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
            <form className="container-fluid" onSubmit={submitForm}>
              <h1 className="text-center text-secondary">Téléverser CV</h1>
              <div className="form-group">
                <label htmlFor="fileName" className="text-secondary"><i className="fas fa-file-pdf"></i> Nom du fichier :</label>
                <input type='text' className="form-control form-control-lg" id="fileName" name="fileName" onChange={(e) => setUploadFileName(e.target.value)} />
              </div>
              <div className="form-group">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" accept="application/pdf" id="customFileLangHTML" onChange={(e) => { setUploadFile(e.target.files[0]); bsCustomFileInput.init() }} />
                  <label className="custom-file-label" htmlFor="customFileLangHTML" data-browse="Parcourir">Sélectionner un fichier</label>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-block btn-primary text-white ">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>

  )
}
export default StudentUploadCV
