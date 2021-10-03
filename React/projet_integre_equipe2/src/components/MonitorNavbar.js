import React from 'react'
import {Link} from 'react-router-dom'

const MonitorNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light shadow mb-5">
                <a className="navbar-brand text-secondary"><h3>Stage Équipe 2</h3></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-outline-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-light" to="/">Déposer offre</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default MonitorNavbar
