importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
	apiKey: "AIzaSyDQsbvmpqbk5dZNX5194DZI-SGv6Xosz_Y",
	authDomain: "dish-duty-app.firebaseapp.com",
	projectId: "dish-duty-app",
	storageBucket: "dish-duty-app.firebasestorage.app",
	messagingSenderId: "470030550949",
	appId: "1:470030550949:web:5e3611bf56d9f6e307ca4c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); 