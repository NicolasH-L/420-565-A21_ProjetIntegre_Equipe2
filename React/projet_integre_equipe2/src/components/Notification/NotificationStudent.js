import React from 'react'
import { useEffect, useState } from 'react'
import { Notifications } from './Notifications'

const NotificationStudent = ({idStudent}) => {
    const [notificationList, setNotificationList] = useState([])
    const [studentID, setStudentID] = useState(
        idStudent
    )
    const baseUrl = "http://localhost:8888"
    
    // const notificationMap = () => {
    //     let list = [] 
    //     notificationList.map((notification) => {
    //         list.push(notification.typeNotification, notification.message)
    //     })
    //     return list
    // }

    useEffect(() => {
        // console.log(idStudent)
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
                <Notifications notificationList={notificationList}/>
            : ""}
        </div>
    )
}

export default NotificationStudent
