import axios from "axios"
import React from 'react'
import { useState } from 'react'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import bsCustomFileInput from 'bs-custom-file-input'
import StudentNavbar from "./StudentNavbar"
import Footer from "./Footer"
import './Form.css'
import Swal from 'sweetalert2'

const StudentUploadCV = () => {
  const typeNotification = "CV"
  const message = "Un étudiant a déposé un CV"
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
  const [notification, setNotification] = useState({
    typeNotification: typeNotification, message: message, session: student.actualSession
  })

<<<<<<< HEAD
  const fireSwalGoodCV = () => {
    Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: 'CV téléversé avec succès',
        showConfirmButton: false,
        timer: 2000
    })
  }
  
  const fireSwalError= () => {
    Swal.fire({
        title: "Une erreur est survenue \n lors du transfert de fichier",
        icon: 'error',
        position: 'top',
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        width: '400px',
    })
}
  
=======
>>>>>>> 631ca18cc1f5dee1d7e46e970f925da27475be4e
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
          fireSwalGoodCV()
        })
        .then((response) => {
          createNotificationAdmin(notification)
        })
        .catch((error) => {
          fireSwalError()
        })
    } else {
      fireSwalError()
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

  const createNotificationAdmin = async (notification) => {
    const result = await fetch('http://localhost:8888/notification/save-notification-for-admin',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(notification)
      })
    return await result.json()
  }

  return (
    <div>
      <div className="grad">
        <StudentNavbar useStudent={student} />
        <div className="d-flex justify-content-center">
          <div className="jumbotron jumbotron-fluid bg-light rounded shadow reactivescreen">
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
      <Footer/>
    </div>

  )
}
export default StudentUploadCV
