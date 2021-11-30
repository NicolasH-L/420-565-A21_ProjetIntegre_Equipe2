import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

const StudentApplyToOffer = ({ newOffer, displayMessageBoolean }) => {
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const [offer, setOffer] = useState({
        companyName: "", address: "", salary: "",
        jobTitle: "", description: "", skills: "",
        jobSchedules: "", workingHours: "", monitorEmail: "",
        displayDate: "", deadlineDate: "", startInternshipDate: "", endInternshipDate: ""
    })
    const [studentOfferApplication, setStudentOfferApplication] = useState({
        offer: "", document: "", student: "", session: ""
    })
    const [documents, setDocuments] = useState([])
    const [applyOfferButton, setApplyOfferButton] = useState({ buttonDisable: true, message: "" })
    const baseUrl = "http://localhost:8888/offers-list"
    const sessionPrefix = ["winter", "summer"]
    const lastMonthOfTheYear = 11
    const winterStart = 8
    const winterDeadLine = 1
    const summerStart = 2
    const summerDeadLine = 5

    let offerId

    useEffect(() => {
        setOffer(newOffer)
        const getDocuments = async () => {
            const documentsFromServer = await fetchDocuments()
            setDocuments(documentsFromServer)
        }
        setStudentOfferApplication({ ...studentOfferApplication, student: student, offer: newOffer })
        offerId = newOffer.idOffer
        setApplyMessage()
        getDocuments()
    }, [])

    const fetchDocuments = async () => {
        const res = await fetch(`http://localhost:8888/document/get-all-documents-valid/${student.id}`)
        return await res.json()
    }

    const addStudentOffer = async () => {
        setStudentOfferSession()
        const result = await fetch(baseUrl + '/save-student-offer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentOfferApplication)
            })
        return await result.json()

        function setStudentOfferSession() {
            let sessionDate = new Date()
            let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
            let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
            let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
                : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
            studentOfferApplication.session = session
        }
    }

    const checkDocumentChosen = (e) => {
        if (e.target.name === "document" && e.target.value != "DEFAULT") {
            setApplyOfferButton({ ...applyOfferButton, buttonDisable: false })
            for (let index = 0; index < documents.length; index++) {
                const element = documents[index];
                if (element.documentName === e.target.value) {
                    setStudentOfferApplication({ ...studentOfferApplication, offer: offer, document: element })
                    break
                }
            }
        }
    }

    const applyToOffer = () => {
        addStudentOffer()
        setApplyMessage()
    }

    const verifyAppliedToOfferStatus = async () => {
        const res = await fetch(`${baseUrl}/offer-applied/${offerId}/${student.id}`)
        return await res.json()
    }

    const setApplyMessage = () => {
        verifyAppliedToOfferStatus()
            .then((data) => data ? setApplyOfferButton({ ...applyOfferButton, message: appliedMessage() }) : "")
    }

    const showSelectDocuments = () => {
        return (
            <div className="input-group">
                <select defaultValue="DEFAULT" className="custom-select" id={"document" + offer.idOffer} name="document" onChange={checkDocumentChosen}>
                    <option value="DEFAULT" disabled>Choisissez un document</option>
                    {documents.map((document) => (
                        <option value={document.documentName} key={document.idDocument}>{document.documentName}</option>
                    ))}
                </select>
                <div className="input-group-append">
                    {showApplyButton()}
                </div>
            </div>
        )
    }

    const showApplyButton = () => {
        return (
            <button
                className="btn btn-success "
                id="applicationButton"
                name="button"
                disabled={applyOfferButton.buttonDisable} onClick={() => applyToOffer()}
            >
                <span className="hideButtonText">Postuler</span>
                <span className="hideButtonIcon"><i className="fas fa-paper-plane"></i></span>
            </button>
        )
    }

    const appliedMessage = () => {
        return (
            <div>
                <span></span>
                <span className="text-success ml-5 font-weight-bold">
                    Demande envoyée <i className="fas fa-exclamation-circle text-success fa-sm"></i>
                </span>
            </div>
        )
    }

    return (
        <div>
            {applyOfferButton.message !== "" ? "" : showSelectDocuments()}
            {displayMessageBoolean === true || displayMessageBoolean === undefined ? applyOfferButton.message : ""}
        </div>
    )
}

export default StudentApplyToOffer
