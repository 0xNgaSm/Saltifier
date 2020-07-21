import {
    SIGNIN_REQUEST_PENDING,
    SIGNIN_REQUEST_FULFILLED,
    SIGNIN_REQUEST_REJECTED
} from "../actions/signInActions";

const INITIAL_STATE = {
    loading: false,
    error: "",
    success: "",
    user: null
};

export default signInReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST_PENDING:
            return {
                ...state,
                ...INITIAL_STATE
            };

        case SIGNIN_REQUEST_FULFILLED:
            return {
                ...state,
            };

        case SIGNIN_REQUEST_REJECTED:
            return {
                ...state,
            };

        default:
            return state;
    }
}