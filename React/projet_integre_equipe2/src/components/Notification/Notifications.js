import React, { useEffect, useState } from 'react'


export const Notifications = ({ notificationList }) => {

    const [list, setList] = useState()

    useEffect(() => {
        setList(notificationList)
    }, [notificationList.length])

    // const MySwal = withReactContent(Swal)
    // const message = "hello"
    // const popUp = () => {
    //     const Toast = Swal.mixin({
    //         toast: true,
    //         position: 'top-right',
    //         showConfirmButton: true,
    //     })
    //     console.log(list)
    //     Toast.fire({
    //         title: 'Notifications : ',
    //         html: `${list.map((elementList) => {
    //             elementList.idNotification
    //         })}`,
    //     })
    // }

    return (
        <div className="btn-group mr-5">
            <button type="button" className="btn btn-primary rounded" data-toggle="modal" data-target="#notificationsModal" >
                {list !== undefined ?
                    <i className="fas fa-bell" aria-hidden="true"> {list.length} </i>
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
                            {list !== undefined ? list.map((notification) => (
                                <li className="list-group-item list-group-item-action justify-content-between d-flex list-group-item-light text-dark" style={{ fontFamily: "Arial", fontSize: "17px" }} key={notification.idNotification}>
                                    {notification.message} <button className="btn btn-danger round btn-sm btn-icon mx-3" style={{ borderRadius: "100px", fontSize: "12px" }}><i className="fas fa-trash-alt fa-lg"></i></button>
                                </li>
                            )) : ""}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
