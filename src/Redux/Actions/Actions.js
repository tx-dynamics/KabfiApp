import { SESSION, POST_DATA,USERDATA,USER_INFO } from "../Constants";

export const SetSession = (data) => {
  return {
    type: SESSION,
    payload: data,
  };
};

export const setUserInfo = (data) => {
  return {
    type: USER_INFO,
    payload: data,
  };
};