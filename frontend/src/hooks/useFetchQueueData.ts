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
  // 最初のデータ取得
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

    if (ownerId && deviceToken) {
      fetchAndSetPosition();
    }
  }, [ownerId, deviceToken]); // このuseEffectはownerIdとdeviceTokenが変更された時のみ実行されます

  // positionResponseStateが更新されたときに追加のデータを取得
  useEffect(() => {
    const fetchAndSetFollowing = async () => {
      try {
        const followingResponse = await axios.get<FollowingResponse>(
          `${baseURL}/${ownerId}/queue/following?deviceToken=${deviceToken}`
        );
        setFollowingResponse(followingResponse.data);
      } catch (e) {
        console.error(e);
      }
    };

    if (positionResponseState?.callNumber && deviceToken) {
      fetchAndSetFollowing();
    }
  }, [positionResponseState?.callNumber]); // このuseEffectはpositionResponseState.callNumberが変更された時のみ実行されます

  return { positionResponseState, followingResponse };
};
