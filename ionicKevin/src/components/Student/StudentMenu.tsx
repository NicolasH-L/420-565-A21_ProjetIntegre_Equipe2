import { IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { attach } from 'ionicons/icons';


interface StudentMenuOptions {
    url: string;
    title: string;
    iosIcon: string;
    mdIcon: string;
}

const studentMenu: StudentMenuOptions[] = [
    {
      title: 'Documents',
      url: '/student/studentDocuments',
      iosIcon: attach,
      mdIcon: attach
  
    }
  ];

const StudentMenu = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="student" type="overlay">
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>Menu de l'étudiant</IonListHeader>
              {studentMenu.map((option, index) => {
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

export default StudentMenu
