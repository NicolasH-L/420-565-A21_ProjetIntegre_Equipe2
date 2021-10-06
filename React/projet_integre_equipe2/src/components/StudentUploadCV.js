import axios from "axios";
import React from 'react';

const StudentUploadCV = () => {
    const [uploadFile, setUploadFile] = React.useState();

    const submitForm = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("uploadFile", uploadFile);
    
        axios
          .post("http://localhost:8888/uploadcv", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            console.log(typeof uploadFile)
            console.log(jsonBlob(uploadFile))
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
        <input type="submit" />
            </form>
        </div>
    )

    function jsonBlob(obj) {
      return new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });
    }
}
export default StudentUploadCV
