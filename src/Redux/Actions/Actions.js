import {
    SESSION,
} from '../Constants'

export const SetSession = (data) => {
    return {
        type: SESSION,
        payload: data,
    }
}
