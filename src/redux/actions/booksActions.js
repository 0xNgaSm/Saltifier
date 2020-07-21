export const FETCH_BOOKS_PENDING = "fetch_books_pending";
export const FETCH_BOOKS_FULFILLED = "fetch_books_fulfilled";
export const FETCH_BOOKS_REJECTED = "fetch_books_rejected";
export const SET_USER_PAID = "set_user_paid";

import firestore from "@react-native-firebase/firestore";

const fetchBooksAndPaidUserAction = (uid) => {
    return async (dispatch) => {
        console.log("-----------------------From books action------------------");
        dispatch({ type: FETCH_BOOKS_PENDING });

        try {

            const userPaymentRef = await firestore().collection("payments").where("uid", "==", uid).orderBy("subscriptionStartedAt", "desc").limit(1).get();
            const userPaymentInfos = userPaymentRef.docs;
            if (userPaymentInfos.length >= 1) {
                const userPaymentInfo = userPaymentInfos[0];
                if (userPaymentInfo.data().subscriptionValidUpto >= Date.now()) {
                    dispatch({type: SET_USER_PAID, payload: true});
                }
            }

            const booksRef = firestore().collectionGroup("books");
            const booksSnapshot = await booksRef.get();
            const temp = [];
            booksSnapshot.forEach((doc => {
                console.log("\n\n", doc.id);
                temp.unshift({id: doc.id, data: doc._data});
            }));

            dispatch({ type: FETCH_BOOKS_FULFILLED, payload: temp });
        } catch (e) {
            console.log(e);
            dispatch({ type: FETCH_BOOKS_REJECTED, payload: JSON.stringify(e) });
        }
    };
}

export { fetchBooksAndPaidUserAction };