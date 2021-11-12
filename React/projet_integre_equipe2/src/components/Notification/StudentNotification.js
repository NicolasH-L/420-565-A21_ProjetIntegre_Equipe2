import React from 'react'

export const StudentNotification = () => {
    
    
    
    
    
    return (
        <div >
            <button type="button" className="btn btn-primary dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-bell" aria-hidden="true"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* {sessions.map((session) => (
                    <button
                        type="button"
                        key={session.idSession}
                        className={`dropdown-item ${session.session === user.actualSession ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); changeSession(session.session) }}>
                        {sessionValueToFrench(session.session)}
                    </button>
                ))} */}
            </div>
        </div>
    )
}
