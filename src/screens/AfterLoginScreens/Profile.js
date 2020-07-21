import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import "text-encoding-polyfill";
const Joi = require("@hapi/joi");
const _ = require("lodash");
import auth from "@react-native-firebase/auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";

import { Input, Button, ActivityIndicator, HeaderRightIcons, BackButton, showMessage } from "../../components/common";
import { updateProfileAction } from "../../redux/actions/updateProfileActions";

const Profile = ({ navigation, loading, error, success, updateProfileAction }) => {

    const curUser = auth().currentUser;
    console.log(curUser);
    const [username, setUsername] = useState(curUser.displayName);
    const [email, setEmail] = useState(curUser.email);
    const [password, setPassword] = useState("222222");
    const [confirmPassword, setConfirmPassword] = useState("222222");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [profileImageLoading, setProfileImageLoading] = useState(false);

    const validatePassword = () => {
        const result = Joi.object({
            password: Joi.string().min(6).max(20).required()
        }).validate({ password });

        if (result.error) {
            setPasswordError(true);
            return false;
        }

        setPasswordError("");
        return true;
    }

    const validateConfirmPassword = () => {
        const result = Joi.object({
            confirmPassword: Joi.string().min(6).max(20).required()
        }).validate({ confirmPassword });

        if (result.error || password != confirmPassword) {
            setConfirmPasswordError(true);
            return false;
        }

        setConfirmPasswordError("");
        return true;
    }

    const UploadProfileImage = async () => {
        setProfileImageLoading(true);

        try {
            const image = await ImagePicker.openPicker({
                width: 80,
                height: 80,
                cropping: true,
                multiple: false,
                mediaType: "photo"
            });
            // console.log(image);

            const imageName = image.path.substring(image.path.lastIndexOf("/") + 1);
            // console.log("\n\n\n\n\n\n1", imageName);
            const imageRef = storage().ref(`profileImages/${curUser.uid}/${imageName}`);
            // console.log("2", imageRef)
            const task = imageRef.putFile(image.path);

            // task.on('state_changed', taskSnapshot => {
            //     (`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            // });

            await task;
            // console.log("3", task);

            const url = await imageRef.getDownloadURL();
            // console.log("4", url);
            await curUser.updateProfile({
                photoURL: url
            });

            try {
                await ImagePicker.clean()
            } catch (e) { console.log(e); }
            // console.log(curUser);
            // // curUser.reload();
            // console.log(curUser);
            // setImageSuccess("Profile Photo Updated");
            showMessage("Profile Photo Updated");
            setProfileImageLoading(false);
        } catch (e) {
            console.log(e.code);
            // setImageError(e.code);
            // if (e.code === "E_PICKER_CANCELLED") setImageError("Profile Upload Cancelled");
            // else if (e.code === "storage/object-not-found") setImageError("Image not found on device.");
            // else if (e.code === "storage/network-request-failed") setImageError("Please check your connection");
            // else setImageError("Unexpected Error Occured");
            if (e.code === "E_PICKER_CANCELLED") showMessage("Profile Upload Cancelled");
            else if (e.code === "storage/object-not-found") showMessage("Image not found on device.");
            else if (e.code === "storage/network-request-failed") showMessage("Please check your connection");
            else showMessage("Unexpected Error Occured");

            setProfileImageLoading(false);
        }
    }

    const DeleteProfileImage = async () => {
        setProfileImageLoading(true);
        // setImageError("");
        // setImageSuccess("");

        try {
            if (curUser.photoURL != null) {
                await curUser.updateProfile({
                    photoURL: null
                });

                const exists = await storage().ref(`profileImages/${curUser.uid}`).listAll();
                exists.items.forEach(async (item) => {
                    await storage().ref(item.path).delete();
                });

                // setImageSuccess("Profile Photo Deleted");
                showMessage("Profile Photo Deleted");
            }
            else {
                // setImageError("No Profile Image Found");
                showMessage("No Profile Image Found");
            }

        } catch (e) {
            console.log(e);
            // setImageError("Error");
            if (e.code === "auth/network-request-failed") showMessage("Please check your connection");
            else if (e.code === "storage/network-request-failed") showMessage("Please check your connection");
            else showMessage("Error occured");
        }
        setProfileImageLoading(false);
    }

    const renderModal = () => {
        return (
            <Modal
                isVisible={modalVisible}
                backdropColor="black"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutDown"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <View style={styles.modalViewStyle}>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.modalHeaderStyle}>
                            Change Profile Image
                        </Text>
                        <Entypo
                            name="cross"
                            size={30}
                            color="rgb(15, 151, 142)"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ paddingBottom: 10 }}
                        onPress={() => {
                            UploadProfileImage();
                            setModalVisible(false);
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "gray", paddingBottom: 12 }}>
                            <Entypo
                                name="upload"
                                size={28}
                                style={{ marginRight: 10 }}
                            />
                            <Text>
                                Upload Profile Image
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ paddingBottom: 10 }}
                        onPress={() => {
                            DeleteProfileImage();
                            setModalVisible(false);
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Entypo
                                name="circle-with-cross"
                                size={28}
                                style={{ marginRight: 10 }}
                            />
                            <Text>
                                Delete Profile Image
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{ alignSelf: "center", color: "rgb(15, 151, 142)", fontWeight: "bold", fontSize: 18 }}>
                            Close
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </Modal>
        );
    }

    const renderTopImageView = () => {

        const imageSource = curUser.photoURL
            ? { uri: curUser.photoURL }
            : require("../../../assets/images/userImageEmpty.png");

        // console.log(imageSource);

        return (
            <View style={styles.mainImageViewStyle}>

                {renderModal()}

                {
                    profileImageLoading ?
                        <ActivityIndicator />
                        : <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                        >

                            <Image
                                source={imageSource}
                                style={styles.profileImageStyle}
                                width={15}
                                height={15}
                            />

                        </TouchableOpacity>
                }

                {/* <View style={styles.imageTextViewStyle}>

                    {
                        profileImageLoading
                            ? <ActivityIndicator size={40} />
                            : <>
                                <TouchableOpacity
                                    onPress={UploadProfileImage}
                                >
                                    <Text style={styles.imageTextStyle}>Upload profile picture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={DeleteProfileImage}
                                >
                                    <Text style={styles.imageTextStyle}>Delete profile picture</Text>
                                </TouchableOpacity>
                            </>
                    }
                </View> */}
            </View>
        );
    }

    return (
        <View style={styles.mainViewStyle}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 20 }}
            >
                <View style={{ marginTop: "4%", marginHorizontal: "5%", flex: 1 }}>

                    {renderTopImageView()}

                    {/* {
                        imageError
                            ? <Text style={styles.errorText}>
                                {imageError}
                            </Text>
                            : <Text></Text>
                    }

                    {
                        imageSuccess
                            ? <Text style={styles.successText}>
                                {imageSuccess}
                            </Text>
                            : <Text></Text>
                    } */}

                    <Input
                        labelText="Username"
                        placeholder="Your name"
                        editable={false}
                        errorText={usernameError ? "Must be between 4 to 20 characters" : null}
                        autoCapitalize={"words"}
                        secureTextEntry={false}
                        autoCorrect={true}
                        autoFocus={false}
                        viewStyle={{ marginBottom: 10, marginTop: 20 }}
                        value={username}
                        onChangeText={(username) => {
                            if (usernameError) setUsernameError(false);
                            setUsername(username);
                        }}
                    />

                    <Input
                        labelText="Email"
                        placeholder="Email"
                        editable={false}
                        errorText={emailError ? "Must be a valid email address" : null}
                        autoCapitalize={"none"}
                        secureTextEntry={false}
                        autocorrect={false}
                        autoFocus={false}
                        viewStyle={{ marginBottom: 10 }}
                        value={email}
                        onChangeText={(email) => {
                            if (emailError) setEmailError(false);
                            setEmail(email);
                        }}
                    />

                    <Input
                        labelText="New Password"
                        placeholder="New Password"
                        errorText={passwordError ? "Password must be between 6 to 20 characters" : null}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        autocorrect={false}
                        autoFocus={false}
                        viewStyle={{ marginBottom: 10 }}
                        value={password}
                        onChangeText={(password) => {
                            if (passwordError) setPasswordError(false);
                            setPassword(password);
                        }}
                    />

                    <Input
                        labelText="Confirm New Password"
                        placeholder="Confirm New Password"
                        errorText={confirmPasswordError ? "Field not same as Password" : null}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        autocorrect={false}
                        autoFocus={false}
                        // viewStyle={{ marginBottom: 10 }}
                        value={confirmPassword}
                        onChangeText={(confirmPassword) => {
                            if (confirmPassword) setConfirmPasswordError(false);
                            setConfirmPassword(confirmPassword);
                        }}
                    />
                </View>

                {
                    error
                        ? <Text style={styles.errorText}>{error}</Text>
                        : <Text></Text>
                }

                {
                    success
                        ? <Text style={styles.successText}>{success}</Text>
                        : <Text></Text>
                }

                <View style={{ height: 150 }}>
                    {
                        loading
                            ? <ActivityIndicator size={40} />
                            : <>
                                <Button
                                    title="Update Profile"
                                    buttonStyle={{ paddingHorizontal: 50 }}
                                    onPress={() => {
                                        let result = true;//validateUsername();
                                        result = validatePassword() && result;
                                        result = validateConfirmPassword() && result;
                                        console.log(result)
                                        if (result == true) {
                                            updateProfileAction(password);
                                        }
                                    }}
                                />

                                <Button
                                    title="Logout"
                                    buttonStyle={{ paddingHorizontal: 80 }}
                                    onPress={async () => {
                                        try {
                                            console.log(navigation);
                                            navigation.navigate("SignIn");
                                            const x = await auth().signOut();
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }}
                                />
                            </>
                    }
                </View>
            </ScrollView>
        </View >
    );
}

Profile.navigationOptions = ({ navigation }) => {
    return {
        title: "Profile",
        headerLeft: () => <BackButton navigation={navigation} onPress={() => navigation.navigate("TabNavigator")} />,
        // headerRight: () => <HeaderRightIcons navigation={navigation} />
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        // flex: 1,
        backgroundColor: "white",
        // marginBottom: 20
    },
    mainImageViewStyle: {
        // flexDirection: "row",
        // justifyContent: "center",
        // alignContent: "center",
        alignItems: "center",
        marginBottom: 8,
        height: 100
        // borderWidth: 1
    },
    imageTextViewStyle: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 20,
        width: 180,
    },
    imageTextStyle: {
        fontSize: 16,
        color: "rgb(15, 151, 142)",
        fontWeight: "bold",
    },
    bottomViewStyle: {
        flexDirection: "row",
        alignSelf: "center"
    },
    profileImageStyle: {
        borderRadius: 100,
        width: 100,
        height: 100,
        borderColor: "black",
        borderWidth: 0.5
    },
    textStyle: {
        fontSize: 16
    },
    touchTextStyle: {
        fontSize: 16,
        fontWeight: "700",
        color: "rgb(15, 151, 142)"
    },
    errorText: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 16,
        color: "red"
    },
    successText: {
        alignSelf: "center",
        fontSize: 16,
        color: "rgb(15, 151, 142)"
    },
    headerStyle: {
        fontWeight: "700",
        fontSize: 40,
        color: "rgb(15, 151, 142)",
        marginBottom: "8%"
    },
    modalViewStyle: {
        backgroundColor: "white",
        height: 200,
        justifyContent: "center",
        paddingHorizontal: 25
    },
    modalHeaderStyle: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        flex: 1,
        color: "rgb(15, 151, 142)",
        // borderBottomColor: "rgb(15, 151, 142)",
        // borderBottomWidth: 1,
        textDecorationLine: "underline",
        textDecorationStyle: "dotted"
    }
});

const mapStateToProps = (state, props) => {
    console.log(state.updateProfile);
    return state.updateProfile;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateProfileAction: updateProfileAction
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



// import React, { useState, useEffect } from "react";
// import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
// import "text-encoding-polyfill";
// const Joi = require("@hapi/joi");
// const _ = require("lodash");
// import auth from "@react-native-firebase/auth";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import ImagePicker from "react-native-image-crop-picker";
// import storage from "@react-native-firebase/storage";

// import { Input, Button, ActivityIndicator, HeaderRightIcons, BackButton, showMessage } from "../../components/common";
// import { updateProfileAction } from "../../redux/actions/updateProfileActions";

// const Profile = ({ navigation, loading, error, success, updateProfileAction }) => {

//     const curUser = auth().currentUser;
//     console.log(curUser);
//     const [username, setUsername] = useState(curUser.displayName);
//     const [email, setEmail] = useState(curUser.email);
//     const [password, setPassword] = useState("222222");
//     const [confirmPassword, setConfirmPassword] = useState("222222");
//     const [emailError, setEmailError] = useState(false);
//     const [passwordError, setPasswordError] = useState(false);
//     const [usernameError, setUsernameError] = useState(false);
//     const [confirmPasswordError, setConfirmPasswordError] = useState(false);

//     const [profileImageLoading, setProfileImageLoading] = useState(false);
//     // const [imageError, setImageError] = useState(false);
//     // const [imageSuccess, setImageSuccess] = useState(false);

//     // const validateUsername = () => {
//     //     const result = Joi.object({
//     //         username: Joi.string().min(4).max(20).required()
//     //     }).validate({ username });

//     //     if (result.error) {
//     //         setUsernameError(true);
//     //         return false;
//     //     }

//     //     setUsernameError("");
//     //     return true;
//     // }

//     // const validateEmail = () => {
//     //     const result = Joi.object({
//     //         email: Joi.string().email({ tlds: { allow: false } }).required()
//     //     }).validate({ email });

//     //     if (result.error) {
//     //         setEmailError(true);
//     //         return false;
//     //     }

//     //     setEmailError("");
//     //     return true;
//     // }

//     const validatePassword = () => {
//         const result = Joi.object({
//             password: Joi.string().min(6).max(20).required()
//         }).validate({ password });

//         if (result.error) {
//             setPasswordError(true);
//             return false;
//         }

//         setPasswordError("");
//         return true;
//     }

//     const validateConfirmPassword = () => {
//         const result = Joi.object({
//             confirmPassword: Joi.string().min(6).max(20).required()
//         }).validate({ confirmPassword });

//         if (result.error || password != confirmPassword) {
//             setConfirmPasswordError(true);
//             return false;
//         }

//         setConfirmPasswordError("");
//         return true;
//     }

//     const UploadProfileImage = async () => {
//         setProfileImageLoading(true);
//         // setImageError("");
//         // setImageSuccess("");

//         try {
//             const image = await ImagePicker.openPicker({
//                 width: 80,
//                 height: 80,
//                 cropping: true,
//                 multiple: false,
//                 mediaType: "photo"
//             });
//             // console.log(image);

//             const imageName = image.path.substring(image.path.lastIndexOf("/") + 1);
//             // console.log("\n\n\n\n\n\n1", imageName);
//             const imageRef = storage().ref(`profileImages/${curUser.uid}/${imageName}`);
//             // console.log("2", imageRef)
//             const task = imageRef.putFile(image.path);

//             // task.on('state_changed', taskSnapshot => {
//             //     (`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
//             // });

//             await task;
//             // console.log("3", task);

//             const url = await imageRef.getDownloadURL();
//             // console.log("4", url);
//             await curUser.updateProfile({
//                 photoURL: url
//             });

//             try {
//                 await ImagePicker.clean()
//             } catch (e) { console.log(e); }
//             // console.log(curUser);
//             // // curUser.reload();
//             // console.log(curUser);
//             // setImageSuccess("Profile Photo Updated");
//             showMessage("Profile Photo Updated");
//             setProfileImageLoading(false);
//         } catch (e) {
//             console.log(e.code);
//             // setImageError(e.code);
//             // if (e.code === "E_PICKER_CANCELLED") setImageError("Profile Upload Cancelled");
//             // else if (e.code === "storage/object-not-found") setImageError("Image not found on device.");
//             // else if (e.code === "storage/network-request-failed") setImageError("Please check your connection");
//             // else setImageError("Unexpected Error Occured");
//             if (e.code === "E_PICKER_CANCELLED") showMessage("Profile Upload Cancelled");
//             else if (e.code === "storage/object-not-found") showMessage("Image not found on device.");
//             else if (e.code === "storage/network-request-failed") showMessage("Please check your connection");
//             else showMessage("Unexpected Error Occured");

//             setProfileImageLoading(false);
//         }
//     }

//     const DeleteProfileImage = async () => {
//         setProfileImageLoading(true);
//         // setImageError("");
//         // setImageSuccess("");

//         try {
//             if (curUser.photoURL != null) {
//                 await curUser.updateProfile({
//                     photoURL: null
//                 });

//                 const exists = await storage().ref(`profileImages/${curUser.uid}`).listAll();
//                 exists.items.forEach(async (item) => {
//                     await storage().ref(item.path).delete();
//                 });

//                 // setImageSuccess("Profile Photo Deleted");
//                 showMessage("Profile Photo Deleted");
//             }
//             else {
//                 // setImageError("No Profile Image Found");
//                 showMessage("No Profile Image Found");
//             }

//         } catch (e) {
//             console.log(e);
//             // setImageError("Error");
//             if (e.code === "auth/network-request-failed") showMessage("Please check your connection");
//             else if (e.code === "storage/network-request-failed") showMessage("Please check your connection");
//             else showMessage("Error occured");
//         }
//         setProfileImageLoading(false);
//     }

//     const renderTopImageView = () => {

//         const imageSource = curUser.photoURL
//             ? { uri: curUser.photoURL }
//             : require("../../../assets/images/userImageEmpty.png");

//         // console.log(imageSource);

//         return (
//             <View style={styles.mainImageViewStyle}>

//                 <Image
//                     source={imageSource}
//                     style={styles.profileImageStyle}
//                     width={10}
//                     height={10}
//                 />

//                 <View style={styles.imageTextViewStyle}>

//                     {
//                         profileImageLoading
//                             ? <ActivityIndicator size={40} />
//                             : <>
//                                 <TouchableOpacity
//                                     onPress={UploadProfileImage}
//                                 >
//                                     <Text style={styles.imageTextStyle}>Upload profile picture</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={DeleteProfileImage}
//                                 >
//                                     <Text style={styles.imageTextStyle}>Delete profile picture</Text>
//                                 </TouchableOpacity>
//                             </>
//                     }
//                 </View>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.mainViewStyle}>
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{marginBottom: 20}}
//             >
//                 <View style={{ marginTop: "4%", marginHorizontal: "5%", flex: 1 }}>
//                     {renderTopImageView()}

//                     {/* {
//                         imageError
//                             ? <Text style={styles.errorText}>
//                                 {imageError}
//                             </Text>
//                             : <Text></Text>
//                     }

//                     {
//                         imageSuccess
//                             ? <Text style={styles.successText}>
//                                 {imageSuccess}
//                             </Text>
//                             : <Text></Text>
//                     } */}

//                     <Input
//                         labelText="Username"
//                         placeholder="Your name"
//                         editable={false}
//                         errorText={usernameError ? "Must be between 4 to 20 characters" : null}
//                         autoCapitalize={"words"}
//                         secureTextEntry={false}
//                         autoCorrect={true}
//                         autoFocus={false}
//                         viewStyle={{ marginBottom: 10, marginTop: 20 }}
//                         value={username}
//                         onChangeText={(username) => {
//                             if (usernameError) setUsernameError(false);
//                             setUsername(username);
//                         }}
//                     />

//                     <Input
//                         labelText="Email"
//                         placeholder="Email"
//                         editable={false}
//                         errorText={emailError ? "Must be a valid email address" : null}
//                         autoCapitalize={"none"}
//                         secureTextEntry={false}
//                         autocorrect={false}
//                         autoFocus={false}
//                         viewStyle={{ marginBottom: 10 }}
//                         value={email}
//                         onChangeText={(email) => {
//                             if (emailError) setEmailError(false);
//                             setEmail(email);
//                         }}
//                     />

//                     <Input
//                         labelText="New Password"
//                         placeholder="New Password"
//                         errorText={passwordError ? "Password must be between 6 to 20 characters" : null}
//                         autoCapitalize={"none"}
//                         secureTextEntry={true}
//                         autocorrect={false}
//                         autoFocus={false}
//                         viewStyle={{ marginBottom: 10 }}
//                         value={password}
//                         onChangeText={(password) => {
//                             if (passwordError) setPasswordError(false);
//                             setPassword(password);
//                         }}
//                     />

//                     <Input
//                         labelText="Confirm New Password"
//                         placeholder="Confirm New Password"
//                         errorText={confirmPasswordError ? "Field not same as Password" : null}
//                         autoCapitalize={"none"}
//                         secureTextEntry={true}
//                         autocorrect={false}
//                         autoFocus={false}
//                         // viewStyle={{ marginBottom: 10 }}
//                         value={confirmPassword}
//                         onChangeText={(confirmPassword) => {
//                             if (confirmPassword) setConfirmPasswordError(false);
//                             setConfirmPassword(confirmPassword);
//                         }}
//                     />
//                 </View>

//                 {
//                     error
//                         ? <Text style={styles.errorText}>{error}</Text>
//                         : <Text></Text>
//                 }

//                 {
//                     success
//                         ? <Text style={styles.successText}>{success}</Text>
//                         : <Text></Text>
//                 }

//                 <View style={{ height: 150 }}>
//                     {
//                         loading
//                             ? <ActivityIndicator size={40} />
//                             : <>
//                                 <Button
//                                     title="Update Profile"
//                                     buttonStyle={{ paddingHorizontal: 50 }}
//                                     onPress={() => {
//                                         let result = true;//validateUsername();
//                                         result = validatePassword() && result;
//                                         result = validateConfirmPassword() && result;
//                                         console.log(result)
//                                         if (result == true) {
//                                             updateProfileAction(password);
//                                         }
//                                     }}
//                                 />

//                                 <Button
//                                     title="Logout"
//                                     buttonStyle={{ paddingHorizontal: 80 }}
//                                     onPress={async () => {
//                                         try {
//                                             navigation.navigate("SignIn");
//                                             const x = await auth().signOut();
//                                         } catch (e) {
//                                             console.log(e);
//                                         }
//                                     }}
//                                 />
//                             </>
//                     }
//                 </View>
//             </ScrollView>
//         </View >
//     );
// }

// Profile.navigationOptions = ({ navigation }) => {
//     return {
//         title: "Profile",
//         headerLeft: () => <BackButton navigation={navigation} onPress={() => navigation.navigate("TabNavigator")} />,
//         // headerRight: () => <HeaderRightIcons navigation={navigation} />
//     }
// }

// const styles = StyleSheet.create({
//     mainViewStyle: {
//         // flex: 1,
//         backgroundColor: "white",
//         // marginBottom: 20
//     },
//     mainImageViewStyle: {
//         flexDirection: "row",
//         justifyContent: "center",
//         marginBottom: 8
//     },
//     imageTextViewStyle: {
//         flexDirection: "column",
//         justifyContent: "center",
//         marginLeft: 20,
//         width: 180,
//    },
//     imageTextStyle: {
//         fontSize: 16,
//         color: "rgb(15, 151, 142)",
//         fontWeight: "bold",
//     },
//     bottomViewStyle: {
//         flexDirection: "row",
//         alignSelf: "center"
//     },
//     profileImageStyle: {
//         borderRadius: 100,
//         width: 80,
//         height: 80,
//         borderColor: "black",
//         borderWidth: 0.5
//     },
//     textStyle: {
//         fontSize: 16
//     },
//     touchTextStyle: {
//         fontSize: 16,
//         fontWeight: "700",
//         color: "rgb(15, 151, 142)"
//     },
//     errorText: {
//         alignSelf: "center",
//         textAlign: "center",
//         fontSize: 16,
//         color: "red"
//     },
//     successText: {
//         alignSelf: "center",
//         fontSize: 16,
//         color: "rgb(15, 151, 142)"
//     },
//     headerStyle: {
//         fontWeight: "700",
//         fontSize: 40,
//         color: "rgb(15, 151, 142)",
//         marginBottom: "8%"
//     }
// });

// const mapStateToProps = (state, props) => {
//     console.log(state.updateProfile);
//     return state.updateProfile;
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(
//         {
//             updateProfileAction: updateProfileAction
//         },
//         dispatch
//     );
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);