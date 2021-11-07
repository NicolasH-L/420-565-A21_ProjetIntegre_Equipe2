import { IonSplitPane, IonRouterOutlet } from '@ionic/react'
import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import AuthentificationPage from '../AuthentificationPage'
import Menu from '../Menu'

const AccountRoutes = () => {
    const location = useLocation();
    let path = location.pathname.split("/")

    return (
        <>
            {path[0] === "" || path[1] === "authentificationPage" ?
                <IonSplitPane contentId="main">
                    <Menu />
                    <IonRouterOutlet id="main">
                        <Route path="/" exact={true}>
                            <Redirect to="/authentificationPage/studentAuth" />
                        </Route>
                        <Route path="/authentificationPage/:userAuth" exact={true}>
                            <AuthentificationPage />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
                : ""}
        </>
    )
}

export default AccountRoutes
