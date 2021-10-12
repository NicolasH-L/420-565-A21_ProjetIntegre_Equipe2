import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Document } from 'react-pdf'
import { pdfjs } from 'react-pdf';

const AdminViewStudentCV = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
    const history = useHistory()
    const document = history.location.state.data

    return (
        <div>
            <Document
                file={{

                }}
            ></Document>
        </div>
    )
}

export default AdminViewStudentCV
