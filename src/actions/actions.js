// actions.js
export const SET_SESSION_ID = 'SET_SESSION_ID';

export const setSessionId = (sessionId) => {
  return {
    type: SET_SESSION_ID,
    payload: sessionId,
  };
};
