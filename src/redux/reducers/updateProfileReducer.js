import {
    UPDATE_PROFILE_PENDING,
    UPDATE_PROFILE_FULFILLED,
    UPDATE_PROFILE_REJECTED,
    updateProfileAction
} from "../actions/updateProfileActions";

const INITIAL_STATE = {
    loading: false,
    error: "",
    success: ""
};

export default updateProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_PENDING:
            return {
                ...state,
                ...INITIAL_STATE,
                loading: true
            };

        case UPDATE_PROFILE_FULFILLED:
            return {
                ...state,
                error: "",
                loading: false,
                success: action.payload
            };
        
        case UPDATE_PROFILE_REJECTED:
            return {
                ...state,
                error: action.payload,
                success: "",
                loading: false
            };

        default:
            return state;
    }
};