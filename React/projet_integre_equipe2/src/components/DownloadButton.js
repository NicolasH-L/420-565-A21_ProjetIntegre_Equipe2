import React from 'react'

const DownloadButton = ({byte, documentName}) => {

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
        <button type="button" className="btn btn-success" onClick={e => { e.preventDefault(); saveByteArray() }}>Télécharger</button>
    )
}

export default DownloadButton
