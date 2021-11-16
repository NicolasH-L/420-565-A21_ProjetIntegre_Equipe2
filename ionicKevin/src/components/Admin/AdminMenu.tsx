import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';
import { useLocation } from 'react-router-dom'
import '../Menu.css'
import { clipboardOutline, addCircleOutline } from 'ionicons/icons';

interface AdminMenuOptions {
    url: string;
    title: string;
    iosIcon: string;
    mdIcon: string;
}

const adminMenu: AdminMenuOptions[] = [
    {
      title: 'Déposer offre',
      url: '/admin/adminOffer',
      iosIcon: addCircleOutline,
      mdIcon: addCircleOutline
    },
    {
      title: 'Offres',
      url: '/admin/adminOfferList',
      iosIcon: clipboardOutline,
      mdIcon: clipboardOutline
    }
  ];

const AdminMenu = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="admin" type="overlay">
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>Menu du gestionnaire</IonListHeader>
              {adminMenu.map((option, index) => {
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

export default AdminMenu
