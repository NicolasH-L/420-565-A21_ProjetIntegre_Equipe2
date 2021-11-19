import React from 'react'
import { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'
import { useHistory } from 'react-router-dom'

const StudentNotifications = ({idStudent}) => {
    const baseUrl = "http://localhost:8888"
    const history = useHistory()
    const historyState = history.location.state
    const student = historyState.student
    const [notificationList, setNotificationList] = useState([])
    const [studentID, setStudentID] = useState(idStudent)
    
    useEffect(() => {
        if (historyState === undefined)
            return
            getNotifications()
    }, [notificationList.length])

    const getNotifications = async () => {
        const notificationFromServer = await fetchNotificationStudent(studentID)
        setNotificationList(notificationFromServer)
    }

    const fetchNotificationStudent = async (idStudent) => {
        const res = await fetch(`${baseUrl}/notification/get-notification-student/${idStudent}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList} studentId={studentID} userSession={student.actualSession}/>
            : ""}
        </div>
    )
}

export default StudentNotifications
