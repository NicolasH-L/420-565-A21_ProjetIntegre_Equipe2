import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const StudentNotification = () => {

    const MySwal = withReactContent(Swal)

    const popUp = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: true,
        })

        Toast.fire({
            title: 'Notifications : ',
            //Do a list of notifications here
        })
    }

    return (
        <div className="btn-group mr-5">
            <button type="button" className="btn btn-primary" id="navbarDropdown" role="button" aria-expanded="false" onClick={popUp}>
                <i className="fas fa-bell" aria-hidden="true"></i>
            </button>
        </div>
    )
}
