import {
    FETCH_PACKAGES_PENDING,
    FETCH_PACKAGES_FULFILLED,
    FETCH_PACKAGES_REJECTED
} from "../actions/fetchPackagesActions";

const INITIAL_STATE = {
    loading: true,
    error: "",
    packages: []
};

export default fetchPackagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PACKAGES_PENDING:
            return {
                ...state,
                ...INITIAL_STATE,
                loading: true
            };

        case FETCH_PACKAGES_FULFILLED:
            return {
                ...state,
                error: "",
                packages: action.payload,
                loading: false
            }

        case FETCH_PACKAGES_REJECTED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}