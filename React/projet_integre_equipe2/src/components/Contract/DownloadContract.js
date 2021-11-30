import DownloadButton from '../DownloadButton';
import React, { useEffect, useState } from 'react'
import DocumentMethods from '../Document/DocumentMethods'

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
            const pdfToArrayBuffer = DocumentMethods.base64ToArrayBytes(contract.pdf)
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

    return (
        <DownloadButton byte={contractData} documentName={documentName}></DownloadButton>
    )
}

export default DownloadContract
