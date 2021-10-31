import React from 'react'

const AdminStats = () => {

    return (
        <div>
            <h2 className="text-center mb-3">Bonjour</h2>
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-center mb-3">Statistiques <i className="fas fa-chart-line text-success"></i></h2>
                    <div className="container-fluid">
                        <ul className="list-group">
                            <a href="#" className="list-group-item list-group-item-action">Nombre d'étudiants inscrits: <span class="badge badge-primary badge-pill">5</span> </a>
                            <a href="#" className="list-group-item list-group-item-action">Nombre de CV non-valides: <span class="badge badge-danger badge-pill">5</span> </a>
                            <a href="#" className="list-group-item list-group-item-action">Nombre d'offres téléversées: <span class="badge badge-primary badge-pill">5</span> </a>
                            <a href="#" className="list-group-item list-group-item-action">Nombre d'étudiants valides: <span class="badge badge-success badge-pill">5</span> </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStats
