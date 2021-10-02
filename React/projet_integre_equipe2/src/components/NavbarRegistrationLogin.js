import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarRegistrationLogin.css'

const NavbarRegistrationLogin = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-inverse bg-inverse">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars btn btn-outline-light"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav my-3">
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn rounded-pill loginButton" to="/Login">Connexion</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link btn btn-outline-light rounded-pill" to="/Registration">S'inscrire</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavbarRegistrationLogin
