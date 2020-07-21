import {
    FETCH_BOOKS_PENDING,
    FETCH_BOOKS_FULFILLED,
    FETCH_BOOKS_REJECTED,
    SET_USER_PAID
} from "../actions/booksActions";

const INITIAL_STATE = {
    loading: false,
    error: "",
    books: [],
    paidUser: false
};

export default booksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BOOKS_PENDING:
            return {
                ...state,
                ...INITIAL_STATE,
                loading: true
            };

        case FETCH_BOOKS_FULFILLED:
            return {
                ...state,
                error: "",
                books: action.payload,
                loading: false
            };

        case FETCH_BOOKS_REJECTED:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case SET_USER_PAID:
            return {
                ...state,
                paidUser: action.payload
            }

        default:
            return state;
    }
}