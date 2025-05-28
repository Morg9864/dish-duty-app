import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

export const TestNotificationButton = () => {
  const { isTokenFound } = useNotifications();

  const sendTestNotification = async () => {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test de notification',
          body: 'Ceci est une notification de test !',
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la notification');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!isTokenFound) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={sendTestNotification}
    >
      Tester les notifications
    </Button>
  );
}; 