export const UPDATE_PROFILE_PENDING = "update_profile_pending";
export const UPDATE_PROFILE_FULFILLED = "update_profile_fulfilled";
export const UPDATE_PROFILE_REJECTED = "update_profile_rejected";

import auth from "@react-native-firebase/auth";

const updateProfileAction = (password,) => {
    return async (dispatch) => {
        console.log("-----------------From Update Profile Action-----------------");
        console.log(password);
        dispatch({ type: UPDATE_PROFILE_PENDING });

        try {
            const curUser = auth().currentUser;
            console.log(curUser);
            const pass = await curUser.updatePassword(password);
            console.log("pass", pass);

            dispatch({type: UPDATE_PROFILE_FULFILLED, payload: "Profile Update Successful"})
        } catch (e) {
            console.log(e);
            if (e.code == "auth/weak-password") dispatch({type: UPDATE_PROFILE_REJECTED, payload: "Weak Password"});
            else if (e.code == "auth/requires-recent-login") dispatch({type: UPDATE_PROFILE_REJECTED, payload: "Please login again to update profile"});
            else if (e.code == "auth/network-request-failed") dispatch({type: UPDATE_PROFILE_REJECTED, payload: "Please check your internet connection."})
            else dispatch({type: UPDATE_PROFILE_REJECTED, payload: "Unexpected error occured."})
        }
    }
}

export { updateProfileAction };