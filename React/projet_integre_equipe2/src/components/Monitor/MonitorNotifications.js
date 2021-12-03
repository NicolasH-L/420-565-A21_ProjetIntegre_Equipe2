import React, { useEffect, useState } from 'react'
import { Notification } from '../Notification/Notification'

const MonitorNotifications = ({monitorState}) => {
    const baseUrl = "http://10.10.68.10:8888"
    const [notificationList, setNotificationList] = useState([])
    const user = "Monitor"

    useEffect(() => {
        getNotifications()
    }, [notificationList.length])

    const getNotifications = async () => {
        const notificationFromServer = await fetchNotificationMonitor(monitorState.monitor.id)
        setNotificationList(notificationFromServer)
    }

    const fetchNotificationMonitor = async (monitorId) => {
        const res = await fetch(`${baseUrl}/notification/get-notification-monitor/${monitorId}`)
        return await res.json()
    }
    
    return (
        <div>
            {notificationList !== undefined ?
                <Notification notificationList={notificationList} userProp={monitorState.monitor} userSession={monitorState.monitor.actualSession} user={user}/>
            : ""}
        </div>
    )
}

export default MonitorNotifications
