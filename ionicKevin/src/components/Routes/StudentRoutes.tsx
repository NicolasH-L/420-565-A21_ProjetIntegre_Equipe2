import { IonSplitPane, IonRouterOutlet } from '@ionic/react';
import React from 'react'
import { Route, useLocation } from 'react-router-dom';
import Student from '../Student/Student';
import StudentMenu from '../Student/StudentMenu';

const StudentRoutes = () => {
    const location = useLocation();

    let path = location.pathname.split("/")
    console.log(path)

    return (
        <>
            {path[1] === "student" ?
                <IonSplitPane contentId="student">
                    <StudentMenu />
                    <IonRouterOutlet id="student">
                        <Route path="/student" component={Student} />
                        <Route path="/student/:studentChoice" exact={true}>
                            <Student />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
                : ""}
        </>
    )
}

export default StudentRoutes
