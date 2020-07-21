import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import updateProfileReducer from "./updateProfileReducer";
import fetchPackagesReducer from "./fetchPackagesReducer";

const reducers = combineReducers({
    // signIn: signInReducer,
    books: booksReducer,
    updateProfile: updateProfileReducer,
    fetchPackages: fetchPackagesReducer
});

export default reducers;