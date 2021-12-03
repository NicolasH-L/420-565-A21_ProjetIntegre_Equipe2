import React from 'react'
import MonitorLogin from '../Monitor/MonitorLogin'
import SupervisorLogin from '../Supervisor/SupervisorLogin'
import AdminLogin from '../Admin/AdminLogin'
import StudentLogin from '../Student/StudentLogin'
import '../Form.css'
import NavbarRegistrationLogin from '../NavbarRegistrationLogin'
import Footer from '../Footer'

const Login = ({ authGuardLogin }) => {

    const studentLogin = async (matricule, password) => {
        const res = await fetch(`http://10.10.68.10:8888/students/${matricule}/${password}`)
        return await res.json()
    }

    const supervisorLogin = async (matricule, password) => {
        const res = await fetch(`http://10.10.68.10:8888/supervisors/${matricule}/${password}`)
        return await res.json()
    }

    const adminLogin = async (username, password) => {
        const res = await fetch(`http://10.10.68.10:8888/admin/${username}/${password}`)
        return await res.json()
    }

    const monitorLogin = async (email, password) => {
        const res = await fetch(`http://10.10.68.10:8888/monitors/${email}/${password}`)
        return await res.json()
    }

    return (
        <div>
            <div className="grad">
                <NavbarRegistrationLogin />
                <div className="d-flex justify-content-center">
                    <div className="jumbotron jumbotron-fluid bg-light rounded shadow reactivescreen">
                        <h2 className="text-center text-secondary">Login</h2>
                        <ul className="nav nav-tabs justify-content-center mb-3" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active text-black" id="student-tab" data-toggle="tab" href="#student" role="tab" aria-controls="student" aria-selected="false">Étudiant</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link text-black" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link text-black" id="supervisor-tab" data-toggle="tab" href="#supervisor" role="tab" aria-controls="supervisor" aria-selected="false">Superviseur</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link text-black" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Gestionnaire</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab"><StudentLogin onLogin={studentLogin} authLogin={authGuardLogin} /></div>
                            <div className="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorLogin onLogin={monitorLogin} authLogin={authGuardLogin} /></div>
                            <div className="tab-pane fade" id="supervisor" role="tabpanel" aria-labelledby="supervisor-tab"><SupervisorLogin onLogin={supervisorLogin} authLogin={authGuardLogin} /></div>
                            <div className="tab-pane fade" id="admin" role="tabpanel" aria-labelledby="admin-tab"><AdminLogin onLogin={adminLogin} authLogin={authGuardLogin} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login
