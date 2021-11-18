import React from 'react'

const DownloadButton = (contractParam) => {
    const internshipCompletedStatus = "Completed"
    const contract = contractParam.contract

    const displayDownloadButton = (contract) => {
        return (
            <button type="button" className="btn btn-success" onClick={e => { e.preventDefault(); getContractPdf(contract) }}>Télécharger</button>
        )
    }

    const getContractPdf = async (contract) => {
        if (contract.pdf !== null) {
            const pdfToArrayBuffer = base64ToArrayBuffer(contract.pdf)
            saveByteArray("Contract", pdfToArrayBuffer)
        } else {
            const result = await fetch('http://localhost:8888/contract/get-contract-pdf',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(contract)
                })

            const data = await result.arrayBuffer()
            saveByteArray("Contract", data)
        }
    }

    function base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    function saveByteArray(reportName, byte) {
        var blob = new Blob([byte], { type: "application/pdf" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    };

    return (
        <div>
            {(contract.internship.status === internshipCompletedStatus) ? displayDownloadButton(contract) : ""}
        </div>
    )
}

export default DownloadButton
