import React from 'react'
import { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'

const StudentNotifications = ({idStudent}) => {
    const baseUrl = "http://localhost:8888"
    const [notificationList, setNotificationList] = useState([])
    const [studentID, setStudentID] = useState(idStudent)
    
    useEffect(() => {
        const getNotifications = async () => {
            const notificationFromServer = await fetchNotificationStudent(studentID)
            setNotificationList(notificationFromServer)
        }
        getNotifications()
    }, [notificationList.length])

    const fetchNotificationStudent = async (idStudent) => {
        const res = await fetch(`${baseUrl}/notification/get-notification-student/${idStudent}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList} studentId={studentID} />
            : ""}
        </div>
    )
}

export default StudentNotifications
