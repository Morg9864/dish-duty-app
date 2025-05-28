import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// Initialiser Firebase Admin si ce n'est pas déjà fait
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { title, body } = await request.json();

    // Ici, vous devriez récupérer le token FCM de l'utilisateur depuis votre base de données
    // Pour ce test, nous utilisons un token statique
    const token = process.env.TEST_FCM_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'Token FCM non trouvé' },
        { status: 400 }
      );
    }

    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    const response = await getMessaging().send(message);
    
    return NextResponse.json({ success: true, messageId: response });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la notification' },
      { status: 500 }
    );
  }
} 