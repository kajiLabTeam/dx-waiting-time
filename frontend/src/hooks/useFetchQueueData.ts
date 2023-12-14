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
      const effectedOwnerId = ownerId || localStorage.getItem("ownerId");
      console.log(effectedOwnerId);
      try {
        const positionResponse = await axios.get<PositionResponse>(
          `${baseURL}/${effectedOwnerId}/queue/position?deviceToken=${deviceToken}`
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
        const effectedOwnerId = ownerId || localStorage.getItem("ownerId");
        console.log(effectedOwnerId);
        const followingResponse = await axios.get<FollowingResponse>(
          `${baseURL}/${effectedOwnerId}/queue/following?callNumber=${positionResponseState?.callNumber}`
        );
        setFollowingResponse(followingResponse.data);
      } catch (e) {
        console.error(e);
      }
    };

    if (positionResponseState?.callNumber) {
      fetchAndSetFollowing();
    }
  }, [positionResponseState?.callNumber]); // このuseEffectはpositionResponseState.callNumberが変更された時のみ実行されます

  return { positionResponseState, followingResponse };
};
