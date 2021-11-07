import { IonSplitPane, IonRouterOutlet } from '@ionic/react'
import React from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import Admin from '../Admin/Admin'
import AdminMenu from '../Admin/AdminMenu'

const AdminRoutes = () => {
    const location = useLocation();
    const history = useHistory();

    let path = location.pathname.split("/")

    return (
        <>
            {path[1] === "admin" ?
                <IonSplitPane contentId="admin">
                    <AdminMenu />
                    <IonRouterOutlet id="admin">
                    <Route path="/admin" exact={true}>
                            
                        </Route>
                        <Route path="/admin/:adminChoice" exact={true}>
                            <Admin />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
                : ""}
        </>
    )
}

export default AdminRoutes