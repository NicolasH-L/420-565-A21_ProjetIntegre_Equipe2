import { IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { addCircleOutline } from 'ionicons/icons';


interface MonitorMenuOptions {
    url: string;
    title: string;
    iosIcon: string;
    mdIcon: string;
}

const monitorMenu: MonitorMenuOptions[] = [
    {
      title: 'Déposer offre',
      url: '/monitor/monitorOffer',
      iosIcon: addCircleOutline,
      mdIcon: addCircleOutline
  
    }
  ];

const MonitorMenu = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="monitor" type="overlay">
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>Menu du moniteur</IonListHeader>
              {monitorMenu.map((option, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={location.pathname === option.url ? 'selected' : ''} routerLink={option.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" ios={option.iosIcon} md={option.mdIcon}/>
                      <IonLabel>{option.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </IonContent>
        </IonMenu>
      )
}

export default MonitorMenu
