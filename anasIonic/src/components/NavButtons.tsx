import { IonButton, IonIcon, IonMenuButton } from '@ionic/react'
import { home, homeOutline, homeSharp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'

const NavButtons: React.FC = () => {
    const [mQuery, setMQuery] = useState({ matches: window.innerWidth > 768 ? true : false })

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 768px)");
        mediaQuery.addEventListener("change", setMQuery)
        return () => {
            mediaQuery.removeEventListener("change", setMQuery)
        }
    }, [])

    return (
        <div>
            {mQuery && !mQuery.matches ? (
                <IonMenuButton />
            ) : (
                <>
                    <IonButton routerLink={"/studentLogin"} >Étudiant</IonButton>
                    <IonButton routerLink={"/monitorLogin"} >Moniteur</IonButton>
                    <IonButton routerLink={"/supervisorLogin"} >Superviseur</IonButton>
                    <IonButton routerLink={"/adminLogin"} >Admin</IonButton>
                </>
            )}
        </div>
    )
}

export default NavButtons
