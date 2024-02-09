import axios from 'axios';

const APPLICATION_SERVER_URL =
  import.meta.env.VITE_NODE_ENV === 'develop' ? import.meta.env.VITE_OPENVIDU_URL : 'https://demos.openvidu.io/';

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

// export const getTokenFunc = async (mySessionId: string) => {
//   const response = await axios.post(
//     APPLICATION_SERVER_URL + 'get-token',
//     { customSessionId: mySessionId },
//     {
//       headers: { 'Content-Type': 'application/json' },
//     },
//   );
//   return response.data; //  세션 Id
// };
