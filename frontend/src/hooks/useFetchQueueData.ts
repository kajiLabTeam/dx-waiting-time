import axios from "axios";
import { useState, useEffect } from "react";

import { FollowingResponse, PositionResponse } from "../components/types";
import { baseURL } from "../utils/api";
export const useFetchQueueData = (
  ownerId: string | string[] | undefined,
  deviceToken: string | null
) => {
  const [positionResponseState, setPositionResponseState] = useState<PositionResponse>();
  const [followingResponse, setFollowingResponse] = useState<FollowingResponse>();

  useEffect(() => {
    const fetchAndSetPosition = async () => {
      try {
        const positionResponse = await axios.get<PositionResponse>(
          `${baseURL}/${ownerId}/queue/position?deviceToken=${deviceToken}`
        );
        setPositionResponseState(positionResponse.data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchAndSetFollowing = async () => {
      try {
        const followingResponse = await axios.get<FollowingResponse>(
          `${baseURL}/${ownerId}/queue/following?callNumber=${positionResponseState?.callNumber}`
        );
        setFollowingResponse(followingResponse.data);
      } catch (e) {
        console.error(e);
      }
    };

    if (ownerId && deviceToken) {
      fetchAndSetPosition();
    }

    if (positionResponseState?.callNumber && ownerId && deviceToken) {
      fetchAndSetFollowing();
    }
  }, [ownerId, deviceToken, positionResponseState?.callNumber]);

  return { positionResponseState, followingResponse };
};
