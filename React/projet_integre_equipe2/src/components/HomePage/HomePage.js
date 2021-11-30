import React from 'react'
import NavbarRegistrationLogin from '../NavbarRegistrationLogin'
import './homePage.css'
import SvgImage from './SvgImage'
import logo from '../../images/logo-projet1.png'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className="grad container-fluid">
            <NavbarRegistrationLogin />
            <div className="row">
                <div className="col text-center">
                    <a className="navbar-brand text-center"><img className="home-logo" src={logo}/> </a>
                    <h3 className="text-light text-center">Alterna Stage</h3>
                    <h1 className="text-light home-title mt-5">Trouve le <span className="badge badge-light">meilleur</span> stage,</h1>
                    <h1 className="text-light home-title">Sur ta plateforme <span className="badge badge-light">préférée!</span></h1>
                        <Link className="btn btn-lg btn-light home-register-button shadow" to="/Registration">Inscris-toi !</Link>
                    <div className="col-svg-small">
                        <SvgImage />
                    </div>
                </div>
                <div className="col col-svg-hide">
                    <SvgImage />
                </div>
            </div>
        </div>
    )
}

export default HomePage
