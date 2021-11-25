import React from 'react'
import NavbarRegistrationLogin from '../NavbarRegistrationLogin'
import './homePage.css'
import SvgImage from './SvgImage'

const HomePage = () => {
    return (
        <div className="grad container-fluid">
            <NavbarRegistrationLogin />
            <div className="row">
                <div className="col">
                    <h1 className="text-light home-title mt-5">Trouve le <span className="badge badge-light">meilleur</span> stage,</h1>
                    <h1 className="text-light home-title">Sur ta plateforme <span className="badge badge-light">préférée!</span></h1>
                    <button className="btn btn-lg btn-light home-register-button">Inscris-toi!</button>
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
