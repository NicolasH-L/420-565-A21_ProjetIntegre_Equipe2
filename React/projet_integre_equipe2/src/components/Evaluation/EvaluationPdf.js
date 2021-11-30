import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import DocumentMethods from '../Document/DocumentMethods'

const EvaluationPdf = ({ evaluationState }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [content, setContent] = useState(null)

    useEffect(() => {
        setContent(DocumentMethods.base64ToArrayBuffer(evaluationState.pdf))
    }, [])

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

    return (
        <>
            {content !== null ?
                <>
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
                </>
                : ""}
        </>
    )
}

export default EvaluationPdf
