import { User } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { FollowingResponse } from "../components/types";
import { baseURL } from "../utils/api";

export const usePosition = (user: User | null) => {
  const [idToken, setIdToken] = useState<string | null>();
  const [followingResponse, setFollowingResponse] = useState<FollowingResponse | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
      }
    };
    fetchToken();
  }, [user]);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (idToken) {
        const response = await fetch(`${baseURL}/owner/queue/following`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        const data = await response.json();
        setFollowingResponse(data);
      }
    };
    if (idToken) {
      fetchFollowing();
    }
  }, [idToken]);

  return { followingResponse };
};
