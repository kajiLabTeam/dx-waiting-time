import { getMessaging, getToken } from "firebase/messaging";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { app } from "../utils/firebase";

export const useInitFirebase = () => {
  const [isNotification, setIsNotification] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.error("Permission not granted for Notification");
        setIsNotification(false);
        return;
      }
      const messaging = getMessaging(app);
      try {
        const currentToken = await getToken(messaging);
        if (currentToken) {
          setIsNotification(true);
          setIsToken(true);
        } else {
          console.error("No Instance ID token available. Request permission to generate one.");
          setIsToken(false);
        }
      } catch (error) {
        console.error("Error getting token:", error);
        setIsNotification(false);
        router.reload();
      }
    };

    requestNotificationPermission();
  }, [router]);

  return [isNotification, isToken];
};
