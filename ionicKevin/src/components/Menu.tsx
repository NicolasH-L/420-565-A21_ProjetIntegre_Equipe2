import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import './Menu.css'
import { useLocation } from 'react-router';
import { build, business, person, school } from 'ionicons/icons';

interface ComptePage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const comptePages: ComptePage[] = [
  {
    title: 'Compte étudiant',
    url: '/authentificationPage/studentAuth',
    iosIcon: school,
    mdIcon: school

  },
  {
    title: 'Compte superviseur',
    url: '/authentificationPage/supervisorAuth',
    iosIcon: person,
    mdIcon: person
  },
  {
    title: 'Compte moniteur',
    url: '/authentificationPage/monitorAuth',
    iosIcon: business,
    mdIcon: business
  },
  {
    title: 'Compte gestionnaire',
    url: '/authentificationPage/adminAuth',
    iosIcon: build,
    mdIcon: build
  }
];

const Menu = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Comptes</IonListHeader>
          {comptePages.map((comptePage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === comptePage.url ? 'selected' : ''} routerLink={comptePage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={comptePage.iosIcon} md={comptePage.mdIcon}/>
                  <IonLabel>{comptePage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
