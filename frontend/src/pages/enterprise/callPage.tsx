import { User } from "firebase/auth";
import { FC } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CallCircle } from "../../components/call/CallCricle";
import { EndButton } from "../../components/call/EndButton";
import { PassButton } from "../../components/call/PassButton";
import { MessageCricle } from "../../components/utils/MessageCricle";
import { useUserState } from "../../globalStates/firebaseUserState";
import { usePosition } from "../../hooks/usePositon";
import { baseURL } from "../../utils/api";
import { theme } from "../../utils/theme";

const CallPageContainer = styled.div`
  text-align: center;
  overflow: hidden;
`;

const PassButtonContainer = styled.div`
  margin-bottom: 1vh;
`;

const FollowingContainer = styled.div`
  margin-top: 1vh;
  font-size: 2rem;
  height: 4.8vh;
  color: ${theme.colors.red};
  @media screen and (max-height: 700px) {
    margin-top: 0.9vh;
    font-size: 1.5rem;
  }
`;

const EndButtonContainer = styled.div`
  position: sticky;
`;

const onCalling = async (user: User | null) => {
  try {
    const idToken = await user?.getIdToken();
    console.log(idToken);
    const response = await fetch(`${baseURL}/owner/queue/position/next`, {
      headers: {
        authorization: `Bearer ${idToken}`,
      },
      method: "GET",
    });
    console.log(response);

    const data = await response.json();
    return data.callNumber;
  } catch (error) {
    console.error("Pass failed: ", error);
    throw new Error("Network response was not ok");
  }
};

const CallPage: FC = () => {
  const [isCalled, setCalled] = useState(false);
  const [callNumber, setCallNumber] = useState(0); // TODO: ここはAPIから取得する
  const user = useUserState();
  const onPass = async (user: User | null) => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`${baseURL}/owner/queue/status`, {
        headers: {
          authorization: `Bearer ${idToken}`,
        },
        method: "PUT",
        body: JSON.stringify({
          callNumber: callNumber,
          waitingStatus: "pass",
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Pass failed: ", error);
    }

    setCalled(false);
  };

  const onFinish = async (user: User | null) => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`${baseURL}/owner/queue/status`, {
        headers: {
          authorization: `Bearer ${idToken}`,
        },
        method: "PUT",
        body: JSON.stringify({
          callNumber: callNumber,
          waitingStatus: "complete",
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Pass failed: ", error);
    }

    setCalled(false);
  };

  const { followingResponse } = usePosition(user);
  if (!followingResponse) return <div>読み込み中...</div>;

  if (isCalled) {
    return (
      <CallPageContainer>
        <PassButtonContainer>
          <PassButton
            $calling={isCalled}
            onClick={async () => {
              try {
                onPass(user);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </PassButtonContainer>
        <MessageCricle message={callNumber} />
        <FollowingContainer>{followingResponse?.following} 人待ち</FollowingContainer>
        <EndButtonContainer>
          <EndButton
            $calling={isCalled}
            onClick={async () => {
              try {
                onFinish(user);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </EndButtonContainer>
      </CallPageContainer>
    );
  }
  return (
    <CallPageContainer>
      <PassButtonContainer>
        <PassButton
          $calling={isCalled}
          onClick={async () => {
            try {
              onPass(user);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </PassButtonContainer>
      <CallCircle
        onClick={async () => {
          try {
            const callNumber = await onCalling(user);
            setCalled(true);
            setCallNumber(callNumber);
          } catch (error) {
            console.error(error);
          }
        }}
      />
      <FollowingContainer>{followingResponse.following}人待ち</FollowingContainer>
      <EndButtonContainer>
        <EndButton
          $calling={isCalled}
          onClick={async () => {
            try {
              onFinish(user);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </EndButtonContainer>
    </CallPageContainer>
  );
};

export default CallPage;
