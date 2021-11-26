import DownloadButton from '../DownloadButton';
import React, { useEffect, useState } from 'react'

const DownloadContract = ({ contract }) => {
    const documentName = "Contract"
    const [contractData, setcontractData] = useState(null)

    useEffect(() => {
        const getContract = async () => {
            const contractFromServer = await getContractPdf()
            setcontractData(contractFromServer)
            
        }
        getContract()
    }, [])

    const getContractPdf = () => {
        if (contract.pdf !== null) {
            const pdfToArrayBuffer = base64ToArrayBuffer(contract.pdf)
            return pdfToArrayBuffer
        } else {
            return getContractData(contract)
        } 
    }

    const getContractData = async (contract) => {
        const result = await fetch('http://localhost:8888/contract/get-contract-pdf',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contract)
            })

        const data = await result.arrayBuffer()
        return data
    }

    const base64ToArrayBuffer = (base64) => {
        var binaryString = window.atob(base64)
        var binaryLen = binaryString.length
        var bytes = new Uint8Array(binaryLen)
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i)
            bytes[i] = ascii
        }
        return bytes
    }

    return (
        <DownloadButton byte={contractData} documentName={documentName}></DownloadButton>
    )
}

export default DownloadContract
