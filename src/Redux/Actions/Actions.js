import { SESSION, POST_DATA } from "../Constants";

export const SetSession = (data) => {
  return {
    type: SESSION,
    payload: data,
  };
};
