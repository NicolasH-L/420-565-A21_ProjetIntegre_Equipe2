import React from 'react'
import { Link } from 'react-router-dom'

const ErrorRoute = () => {
    return (
        <div>
            <div className="alert alert-danger m-5" role="alert">
                <h4 className="alert-heading text-center">Erreur 404</h4>
                <p className="text-center mb-5" >Oops! Cette page n'existe pas, retournez à la page de connexion pour plus d'options.</p>
                <div className="d-flex justify-content-center">
                    <Link className="btn btn-light" to="/">Retourner à la page de connexion</Link>
                </div>

            </div>
        </div>
    )
}

export default ErrorRoute
