import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import { app } from "../utils/firebase";

export const useInitFirebaseNotify = () => {
  const [isNotification, setIsNotification] = useState(false);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.error("Permission not granted for Notification");
          setIsNotification(false);
          return;
        }
      });
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
      })
        .then((currentToken) => {
          if (currentToken) {
            setIsNotification(true);
            setIsToken(true);
          } else {
            console.error("No registration token available. Request permission to generate one.");
            setIsToken(false);
          }
        })
        .catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
          setIsToken(false);
        });
    };
    requestNotificationPermission();
  }, []);

  return [isNotification, isToken];
};
