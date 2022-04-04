import { SESSION, POST_DATA,USER_INFO } from "../Constants";
const initialState = {
  isLogin: "",
  postdata: null,
  userInfo: "",
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
      case USER_INFO:
      return {
        ...state,
        userInfo:payload.userInfo,
      };
    default:
      return state;
  }
};
export default authReducer;


