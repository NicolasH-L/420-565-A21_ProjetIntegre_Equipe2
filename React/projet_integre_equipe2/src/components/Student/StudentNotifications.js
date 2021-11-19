import React from 'react'
import { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'

const StudentNotifications = ({studentState}) => {
    const baseUrl = "http://localhost:8888"
    const [notificationList, setNotificationList] = useState([])

    useEffect(() => {
        getNotifications()
    }, [notificationList.length])

    const getNotifications = async () => {
        const notificationFromServer = await fetchNotificationStudent(studentState.student.id)
        setNotificationList(notificationFromServer)
    }

    const fetchNotificationStudent = async (studentId) => {
        const res = await fetch(`${baseUrl}/notification/get-notification-student/${studentId}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList} userProp={studentState.student} userSession={studentState.student.actualSession}/>
            : ""}
        </div>
    )
}

export default StudentNotifications
