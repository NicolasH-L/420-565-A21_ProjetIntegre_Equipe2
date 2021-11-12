import React from 'react'
import { useState, useEffect } from 'react'
import RatingChoices from './RatingChoices'
import Behaviors from './Behaviors'

const StudentEvaluationForm = ({ contractProp, isModeEdit }) => {
    const [contract, setContract] = useState(null)
    const [internshipReport, setInternshipReport] = useState({})
    const [supervisor, setSupervisor] = useState({})
    const [productivity, setProductivity] = useState({})
    const [workQuality, setWorkQuality] = useState({})
    const [relationQuality, setRelationQuality] = useState({})
    const [abilities, setAbilities] = useState({})

    const isEdit = isModeEdit

    useEffect(() => {
        setContract(contractProp)
        setSupervisor(contractProp.supervisor)
    }, [])


    const onSubmit = () => {

    }


    // const get


    return (
        <div className="my-5">
            {contract !== null ?
            <form className="container-fluid" onSubmit={onSubmit} >
                <h1 className="text-center">Fiche d’évaluation du stagiaire</h1>
                <div className="mt-5">
                    <div className="form-group">
                        <label htmlFor="" className="text-secondary">Nom de l’élève: </label>
                        <input className="form-control" type="text" name="" placeholder="" disabled={!isEdit} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="text-secondary">Nom de l’entreprise: </label>
                        <input className="form-control" type="text" name="" placeholder="" disabled={!isEdit} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="text-secondary">Nom du superviseur: </label>
                        <input className="form-control" type="text" name="" placeholder="" disabled={!isEdit} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="text-secondary">Fonction: </label>
                        <input className="form-control" type="text" name="" placeholder="" disabled={!isEdit} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="text-secondary">Téléphone: </label>
                        <input className="form-control" type="text" name="" placeholder="" disabled={!isEdit} />
                    </div>
                    <Behaviors/>
                    <h2 className="mt-5">Appréciation globale du stagiaire </h2>
                    <label htmlFor=""></label>
                    <h2 className="mt-5">Veuillez retourner ce formulaire à </h2>
                    {/* <div className="mt-2">{supervisor.firstName + " " + supervisor.lastName}</div> */}
                    <div className="mt-2">{contract.internship.offer.address}</div>
                    {/* <div className="mt-2">{internship.offer}</div> */}
                    {console.log(contract.internship.offer)}
                    <div className="mt-5">Nous vous remercions de votre appui!</div>
                </div>
            </form>
            : ""}
        </div>
    )
}

export default StudentEvaluationForm
