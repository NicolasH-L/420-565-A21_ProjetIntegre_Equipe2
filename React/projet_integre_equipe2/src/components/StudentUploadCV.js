import axios from "axios";
import React from 'react';

const StudentUploadCV = () => {
    const [uploadFile, setUploadFile] = React.useState();
    const [uploadFileName, setUploadFileName] = React.useState()

    const submitForm = (event) => {
        event.preventDefault();
        const studentId = 1;
        var nameId = {"fileName":uploadFileName,
                      "id":studentId}
        var nameidOBJ = JSON.stringify(nameId);

        const formData = new FormData();
        formData.append("uploadFile", uploadFile, nameidOBJ);
        formData.append("id",1)
    
        axios
          .post("http://localhost:8888/uploadcv", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            console.log(nameidOBJ)
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
