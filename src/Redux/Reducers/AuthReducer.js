import { SESSION, POST_DATA } from "../Constants";
const initialState = {
  isLogin: "",
  postdata: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  // console.warn(payload)
  switch (type) {
    case SESSION:
      return {
        ...state,
        isLogin: payload.isLogin,
      };
    case POST_DATA:
      return {
        ...state,
        postdata: payload,
      };
    default:
      return state;
  }
};
export default authReducer;
