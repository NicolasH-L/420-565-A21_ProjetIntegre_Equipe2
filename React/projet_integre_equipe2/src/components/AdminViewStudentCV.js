import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import { Document, Page, pdfjs } from '../../node_modules/react-pdf/dist/esm/entry.webpack';

const AdminViewStudentCV = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const history = useHistory()
    const document = history.location.state
    var data = document.data

    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1)
    }

    console.log(data)

    function _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    return (
        <div>
            <AdminNavbar />
            <Document
            file={{data:_base64ToArrayBuffer(data)}}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document>
        </div>
    )
}

export default AdminViewStudentCV
