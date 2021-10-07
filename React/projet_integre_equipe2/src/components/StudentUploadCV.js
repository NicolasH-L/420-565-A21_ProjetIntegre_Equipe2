import axios from "axios";
import React from 'react';
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const StudentUploadCV = () => {
    const [uploadFile, setUploadFile] = useState();
    const [uploadFileName, setUploadFileName] = useState()
    const history = useHistory()

    const submitForm = (event) => {
        event.preventDefault();
        var nameId = uploadFileName+ ":" + 1
        var nameidOBJ = JSON.stringify(nameId);

        console.log(history.location.state.id)

        const formData = new FormData();
        formData.append("uploadFile", uploadFile, nameidOBJ);
    
        axios
          .post("http://localhost:8888/uploadcv", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log("Erreur de transfert de fichier")
          });
        };


    return (
        <div>
            <form onSubmit={submitForm}>
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <br />
        <h1>Nom du fichier</h1>
        <input type='text' onChange={(e) => setUploadFileName(e.target.value)} />
        <input type="submit" />
            </form>
        </div>
    )
}
export default StudentUploadCV
