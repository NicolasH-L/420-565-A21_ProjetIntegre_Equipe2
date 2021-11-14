import React from 'react'
import { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'

const StudentNotifications = ({idStudent}) => {
    const [notificationList, setNotificationList] = useState([])
    const [studentID, setStudentID] = useState(
        idStudent
    )
    const baseUrl = "http://localhost:8888"
    
    useEffect(() => {
        const getNotification = async () => {
            const notificationFromServer = await fetchNotificationStudent(studentID)
            setNotificationList(notificationFromServer)
        }
        getNotification()
    }, [notificationList.length])

    const fetchNotificationStudent = async (idStudent) => {
        const res = await fetch(`${baseUrl}/notification/get-notification-student/${idStudent}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList}/>
            : ""}
        </div>
    )
}

export default StudentNotifications
