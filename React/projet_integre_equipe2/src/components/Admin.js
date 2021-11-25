import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminStats from './AdminStats'
import Footer from './Footer'

const Admin = () => {

    return (
        <div>
            <div className="grad">
                <AdminNavbar />
                <AdminStats />
            </div>
            <Footer></Footer>
        </div>

    )
}

export default Admin
