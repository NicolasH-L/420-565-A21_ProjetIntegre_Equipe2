import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Notifications = ({notificationList}) => {

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
            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModalCenter" >
                {list !== undefined ?
                    <i className="fas fa-bell" aria-hidden="true"> {list.length} </i>
                : ""}
            </button>
            <div className="modal fade" id="exampleModalCenter"  tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog" style={{position: "absolute", top: "10px", right: "20px"}} role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Notifications</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body list-group">
                        {list !== undefined ? list.map((elementList) => (
                            <li className="list-group-item list-group-item-action" key={elementList.idNotification}>
                                {elementList.message}
                            </li>
                        )): ""}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
