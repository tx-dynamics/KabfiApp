import { SESSION } from '../Constants'
const initialState = {
    isLogin: '',
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.warn(payload)
    switch (type) {
        case SESSION:
            return {
                ...state,
                isLogin: payload.isLogin,
            }
        default:
            return state;
    }

}
export default authReducer