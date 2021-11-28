import React from 'react'
import './Footer.css'
import logo from '../images/logo-projet2.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div>
                            <img className="my-4" width="20" src={logo} />
                            <div>
                                <i className="fab fa-instagram mx-2" style={{color:"orange"}}></i>
                                <i className="fab fa-twitter mx-2" style={{color:"cyan"}}></i>
                                <i className="fab fa-facebook-square mx-2" style={{color:"blue"}}></i>
                                <i className="fab fa-youtube mx-2" style={{color:"red"}}></i> 
                            </div>
                            <p className="py-4 m-0">Alterna Stage &copy; Copyright 2021 - 420-565-AL -
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
