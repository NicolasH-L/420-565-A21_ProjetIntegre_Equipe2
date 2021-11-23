import React from 'react'
import './ResponsiveButtons.css'

const DownloadButton = ({ byte, documentName }) => {

    function saveByteArray() {
        console.log(byte)
        var blob = new Blob([byte], { type: "application/pdf" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = documentName;
        link.download = fileName;
        link.click();
    };

    return (
        <button type="button" className="btn btn-success mx-2" onClick={e => { e.preventDefault(); saveByteArray() }}>
            <span className="hideButtonText">Télécharger</span>
            <span className="hideButtonIcon"><i className="fas fa-download"></i></span>
        </button>
    )
}

export default DownloadButton
