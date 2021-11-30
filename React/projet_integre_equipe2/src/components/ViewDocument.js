import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import DocumentMethods from './Document/DocumentMethods'

const ViewDocument = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const history = useHistory()
  const document = history.location.state
  const data = document.data

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => {
    changePage(-1);
  }

  const nextPage = () => {
    changePage(1);
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const content = DocumentMethods.base64ToArrayBuffer(data)

  return (
    <div className="grad">
      <div className="py-3">
        <div className="justify-content-start d-flex mx-5">
          <button className="btn btn-light" onClick={e => { e.preventDefault(); history.goBack() }}>
            <i className="fas fa-angle-double-left"></i> Retour
          </button>
        </div>
        <div className="justify-content-center d-flex">
          <Document file={content} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <div className="justify-content-center d-flex pt-3 text-light">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} sur {numPages || "--"}
          </p>
        </div>
        <div className="justify-content-center d-flex">
          <button className="btn btn-dark mx-3" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Précédent
          </button>
          <button className="btn btn-dark" type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            Suivant
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewDocument
