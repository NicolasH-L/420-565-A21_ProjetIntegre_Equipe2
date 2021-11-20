import React, { useEffect, useState } from 'react'

export const Notification = ({ notificationList, userProp, userSession }) => {
    const baseUrl = "http://localhost:8888/notification"
    const [list, setList] = useState([])

    useEffect(() => {
        setList(notificationList)
    }, [notificationList.length])

    const deleteNotification = async (idNotification) => {
        const result = await fetch(`${baseUrl}/delete-notification/${idNotification}/${userProp.id}`,
            {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            })
        return await result
    }

    const modificationlistNotification = async (idNotification) => {
        setList(list.filter((notification1) => notification1.id !== idNotification))
    }

    const deleteAllNotifications = async () => {
        const result = await fetch(`${baseUrl}/delete-notification/${userProp.id}`,
            {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            })
        return await result
    }

    const filterNotification = (notification) => {
        return notification.session === userSession
    }

    return (
        <div className="btn-group mr-5">
            <button type="button" className="btn btn-primary rounded" data-toggle="modal" data-target="#notificationsModal" >
                {list !== undefined || list !== null || list !== "" ?
                    <i className="fas fa-bell" aria-hidden="true"> {list.filter(filterNotification).length} </i>
                    : ""}
            </button>
            <div className="modal fade" id="notificationsModal" tabIndex="-1" role="dialog" aria-labelledby="notificationModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" style={{ position: "absolute", top: "10px", right: "20px" }} role="document">
                    <div className="modal-content" style={{ backgroundColor: "#f2f2f2" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="notificationModalLongTitle">Notifications <i className="far fa-bell"></i></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body list-group">
                            {list !== undefined || list !== null || list.length !== 0 || list !== "" ? list.filter(filterNotification).map((notification) => (
                                <li className="list-group-item list-group-item-action justify-content-between d-flex list-group-item-light text-dark" style={{ fontFamily: "Arial", fontSize: "17px" }} key={notification.id}>
                                    {notification.message} <button className="btn btn-danger round btn-sm btn-icon mx-3" style={{ borderRadius: "100px", fontSize: "12px" }} onClick={() => deleteNotification(notification.id).then((data) => data ? modificationlistNotification(notification.id) : "")}><i className="fas fa-times fa-lg align-middle"></i></button>
                                </li>
                            )) : ""}
                        </div>
                        <div className="modal-footer">
                            {list !== undefined || list !== null || list.length !== 0 || list !== "" ? list.filter(filterNotification).length !== 0 ? <>
                                <button type="button" className="btn btn-info" onClick={() => deleteAllNotifications().then((data) => data ? setList([]) : "")}>Tout supprimer</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            </> : "" : "" }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
