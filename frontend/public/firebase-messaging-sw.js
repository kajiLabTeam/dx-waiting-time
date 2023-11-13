importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAQCD40J2m4b3i0WT9AvmzmZPpVKWaepXc",
  authDomain: "web-push-notification-practise.firebaseapp.com",
  projectId: "web-push-notification-practise",
  storageBucket: "web-push-notification-practise.appspot.com",
  messagingSenderId: "844132776020",
  appId: "1:844132776020:web:d9cbdeaef0ebb6b72555c1",
  measurementId: "G-B3513M6L7T",
});

const messaging = firebase.messaging(firebaseApp);

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  let notificationTitle = "簡単行列整理くん";
  let notificationOptions = {
    body: "No body",
    icon: "default_icon.png",
  };
  if (payload.notification) {
    notificationTitle = payload.notification.title;
    notificationOptions.body = payload.notification.body;
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
});