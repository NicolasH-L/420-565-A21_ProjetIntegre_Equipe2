import React from 'react'
import { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'

const AdminNotifications = ({adminState}) => {
    const baseUrl = "http://localhost:8888"
    const [notificationList, setNotificationList] = useState([])
    const user = "Admin"

    useEffect(() => {
        getNotifications()
    }, [notificationList.length])

    const getNotifications = async () => {
        const notificationFromServer = await fetchNotificationAdmin(adminState.admin.id)
        setNotificationList(notificationFromServer)
    }

    const fetchNotificationAdmin = async (adminId) => {
        const res = await fetch(`${baseUrl}/notification/get-notification-admin/${adminId}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList} userProp={adminState.admin} userSession={adminState.admin.actualSession} user={user}/>
            : ""}
        </div>
    )
}

export default AdminNotifications
