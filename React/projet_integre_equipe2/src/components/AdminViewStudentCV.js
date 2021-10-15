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

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  const content = _base64ToArrayBuffer(data)

  return (
    <div>
      <AdminNavbar />
      <div className="justify-content-center d-flex"> 
        <Document width="200em"
          file={content}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="justify-content-center d-flex">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
        </div>
      <div className="justify-content-center d-flex">
          <button className="btn btn-primary mx-3" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </button>
          <button
            className="btn btn-primary"
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
    </div>
  )
}

export default AdminViewStudentCV