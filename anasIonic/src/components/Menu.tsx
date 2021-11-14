import React from 'react'
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonLabel, IonMenuToggle, IonIcon } from '@ionic/react';
import { accessibility, business, home, peopleCircle, person } from 'ionicons/icons';

const Menu: React.FC = () => {
    return (
        <>
            <IonMenu side="end" contentId="main">
                <IonHeader>
                    <IonToolbar color="tertiary">
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle auto-hide="false">
                            <IonItem button routerLink={"/home"} routerDirection="none">
                                <IonLabel><IonIcon icon={home} /> Home</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle auto-hide="false">
                            <IonItem button routerLink={"/studentLogin"} routerDirection="none">
                                <IonLabel><IonIcon icon={person} /> Étudiant</IonLabel>
                            </IonItem>
                            <IonItem button routerLink={"/monitorLogin"} routerDirection="none">
                                <IonLabel><IonIcon icon={business} /> Moniteur</IonLabel>
                            </IonItem>
                            <IonItem button routerLink={"/supervisorLogin"} routerDirection="none">
                                <IonLabel><IonIcon icon={accessibility} /> Superviseur</IonLabel>
                            </IonItem>
                            <IonItem button routerLink={"/adminLogin"} routerDirection="none">
                                <IonLabel><IonIcon icon={peopleCircle} /> Admin</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
        </>
    )
}

export default Menu
