export const SIGNIN_REQUEST_PENDING = "SIGNIN_REQUEST_PENDING";
export const SIGNIN_REQUEST_FULFILLED = "SIGNIN_REQUEST_FULFILLED";
export const SIGNIN_REQUEST_REJECTED = "SIGNIN_REQUEST_REJECTED";

import auth from "@react-native-firebase/auth";

const signInUserWithEmailAndPasswordAction = ({email, password, navigation}) => {
    return ((dispatch) => {
        dispatch({type: SIGNIN_REQUEST_PENDING});
        try {
            
        } catch (error) {
            
        }
    });
}