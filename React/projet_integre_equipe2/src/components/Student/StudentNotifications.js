import React, { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'

const StudentNotifications = ({studentState}) => {
    const [notificationList, setNotificationList] = useState([])
    const user = "Student"

    useEffect(() => {
        getNotifications()
    }, [notificationList.length])

    const getNotifications = async () => {
        const notificationFromServer = await fetchNotificationStudent(studentState.student.id)
        setNotificationList(notificationFromServer)
    }

    const fetchNotificationStudent = async (studentId) => {
        const res = await fetch(`http://localhost:8888/notification/get-notification-student/${studentId}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList} userProp={studentState.student} userSession={studentState.student.actualSession} user={user}/>
            : ""}
        </div>
    )
}

export default StudentNotifications
