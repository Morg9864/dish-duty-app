import { useEffect, useState } from 'react';
import { requestNotificationPermission, onMessageListener } from '@/lib/firebase';

export const useNotifications = () => {
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          setTokenFound(true);
          console.log('Token de notification:', token);
          // Ici, vous pouvez envoyer le token à votre backend
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des notifications:', error);
      }
    };

    initializeNotifications();

    // Écouter les messages en premier plan
    onMessageListener()
      .then((payload: any) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.log('Erreur lors de la réception du message:', err));
  }, []);

  return { notification, isTokenFound };
}; 