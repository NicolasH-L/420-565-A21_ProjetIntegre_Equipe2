import { IonSplitPane, IonRouterOutlet } from '@ionic/react';
import React from 'react'
import { Route, useLocation } from 'react-router-dom';
import Monitor from '../Monitor/Monitor';
import MonitorMenu from '../Monitor/MonitorMenu';

const MonitorRoutes = () => {
    const location = useLocation();

    let path = location.pathname.split("/")

    return (
        <>
            {path[1] === "monitor" ?
                <IonSplitPane contentId="monitor">
                    <MonitorMenu />
                    <IonRouterOutlet id="monitor">
                        <Route path="/monitor" component={Monitor} />
                        <Route path="/monitor/:monitorChoice" exact={true}>
                            <Monitor />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
                : ""}
        </>
    )
}

export default MonitorRoutes
