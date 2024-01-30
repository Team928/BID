import axios from 'axios';

const APPLICATION_SERVER_URL =
  import.meta.env.VITE_NODE_ENV === 'develop' ? 'http://localhost:5001/' : 'https://demos.openvidu.io/';

export const getToken = async (mySessionId: string) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

export const createSession = async (mySessionId: string) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + 'api/sessions',
    { customSessionId: mySessionId },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return response.data; //  세션 Id
};

export const createToken = async (sessionId: string) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
    {},
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return response.data; // 토큰
};
