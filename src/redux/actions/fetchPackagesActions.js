export const FETCH_PACKAGES_PENDING = "fetch_packages_pending";
export const FETCH_PACKAGES_FULFILLED = "fetch_packages_fulfilled";
export const FETCH_PACKAGES_REJECTED = "fetch_packages_rejected";

import firestore from "@react-native-firebase/firestore";

const fetchPackagesAction = () => {
    console.log("------------------From Packages Action------------------");
    return async (dispatch) => {
        dispatch({ type: FETCH_PACKAGES_PENDING });

        try {
            let temp = [];
            const packagesRef = firestore().collectionGroup("packages");
            const packagesSnap = await packagesRef.get();
            packagesSnap.forEach((doc) => {
                // console.log("hehre", doc);
                temp.push(doc._data);
            });

            dispatch({ type: FETCH_PACKAGES_FULFILLED, payload: temp });
        } catch (e) {
            console.log(e);
            dispatch({ type: FETCH_PACKAGES_REJECTED, payload: "Unexpected error occured." })
        }
    }
}

export { fetchPackagesAction };