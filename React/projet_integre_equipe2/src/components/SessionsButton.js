import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const SessionsButton = () => {
    const [sessions, setSessions] = useState([])
    const history = useHistory()
    const historyState = history.location.state
    const [user, setUser] = useState()
    const location = useLocation()

    useEffect(() => {
        setUser(historyState.monitor !== undefined ? historyState.monitor
            : historyState.student !== undefined ? historyState.student
            : historyState.supervisor !== undefined ? historyState.supervisor
                : historyState.admin !== undefined ? historyState.admin : "")
        getSessions()
    }, [])

    const changeSession = (selectedSession) => {
        user.actualSession = selectedSession
        if (historyState.student !== undefined){
            historyState.student = user
        } else if (historyState.monitor !== undefined) {
            historyState.monitor = user
        } else if (historyState.supervisor !== undefined) {
            historyState.supervisor = user
        } else if (historyState.admin !== undefined) {
            historyState.admin = user
        }
        history.push(location.pathname, historyState)
    }

    const getSessions = async () => {
        const sessionsFromServer = await fetchSessions()
        setSessions(sessionsFromServer)
    }

    const fetchSessions = async () => {
        const res = await fetch('http://localhost:8888/sessions/get-all-sessions')
        return await res.json()
    }

    const sessionValueToFrench = (session) => {
        let sessionSeason = session.slice(0, -4)
        let sessionYear = session.slice(-4)
        let sessionSeasonToFrench = sessionSeason === "winter" ? "Hiver"
            : sessionSeason === "summer" ? "Été" : ""
        return sessionSeasonToFrench + " " + sessionYear
    }

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-primary btn-sm dropdown-toggle " id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                Sessions
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {sessions.map((session) => (
                    <button
                        type="button"
                        key={session.idSession}
                        className={`dropdown-item btn-sm ${session.session === user.actualSession ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); changeSession(session.session) }}>
                        {sessionValueToFrench(session.session)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SessionsButton
