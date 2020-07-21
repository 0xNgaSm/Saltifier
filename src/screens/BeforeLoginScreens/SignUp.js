import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import "text-encoding-polyfill";
import functions from "@react-native-firebase/functions";
const Joi = require("@hapi/joi");
const _ = require("lodash");

import { Input, Button, Background, ActivityIndicator } from "../../components/common";

//https://firebase.google.com/docs/auth/admin/errors
// functions().useFunctionsEmulator('http://localhost:5001');

const SignUp = ({ navigation }) => {

    const [username, setUsername] = useState("netan");
    const [email, setEmail] = useState("imnetanm@gmail.com");
    const [password, setPassword] = useState("111111");
    const [confirmPassword, setConfirmPassword] = useState("111111");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateUsername = () => {
        const result = Joi.object({
            username: Joi.string().min(4).max(20).required()
        }).validate({ username });

        if (result.error) {
            setUsernameError(true);
            return false;
        }

        setUsernameError("");
        return true;
    }

    const validateEmail = () => {
        const result = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required()
        }).validate({ email });

        if (result.error) {
            setEmailError(true);
            return false;
        }

        setEmailError("");
        return true;
    }

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

    return (
        <View style={styles.viewStyle}>
            <ScrollView
                contentContainerStyle={{paddingBottom: 20}}
            >
                <Background />
                <View style={{ marginTop: "28%", marginHorizontal: "5%", flex: 1 }}>
                    <Text style={styles.headerStyle}>
                        Create Account
                    </Text>
                    <Input
                        labelText="Username"
                        placeholder="Your name"
                        errorText={usernameError ? "Must be between 4 to 20 characters" : null}
                        autoCapitalize={"words"}
                        secureTextEntry={false}
                        autocorrect={true}
                        autoFocus={false}
                        viewStyle={{ marginBottom: 10 }}
                        value={username}
                        onChangeText={(username) => {
                            if (usernameError) setUsernameError(false);
                            setUsername(username);
                        }}
                    />

                    <Input
                        labelText="Email"
                        placeholder="Email"
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
                        labelText="Password"
                        placeholder="Password"
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
                        labelText="Confirm Password"
                        placeholder="Confirm Password"
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

                {
                    loading
                        ? <ActivityIndicator size={40} />
                        : <>
                            <Button
                                title="Sign Up"
                                buttonStyle={{ paddingHorizontal: 50 }}
                                onPress={async () => {
                                    setLoading(true);
                                    setError("");
                                    setSuccess("");
                                    let result = validateUsername();
                                    result = validateEmail() && result;
                                    result = validatePassword() && result;
                                    result = validateConfirmPassword() && result;
                                    console.log(result)
                                    if (result == false)
                                        return setLoading(false);
                                    else {
                                        try {
                                            // user is logged in automatically with createUserWithEmailAndPassword
                                            // user is not logged in when we call createUser function
                                            //so dont navigate user to AfterLoginScreens
                                            const registerUserCF = functions().httpsCallable("registerUser");
                                            const user = await registerUserCF({ username, email, password });
                                            console.log(user);
                                            setSuccess("Registration Successful");
                                            setLoading(false);
                                            _.delay(() => navigation.navigate("SignIn"), 400);
                                        } catch (e) {
                                            //e.code not working yet
                                            console.log(e);
                                            console.log("logged error ", e.message);
                                            console.log(e.code);

                                            if (e.code === "auth/network-request-failed") setError("Please check internet connection");
                                            else if (e.code === "deadline-exceeded") setError("Please check internet connection");
                                            else setError(e.message || "Unexpected Error Occured");

                                            // if (e.code === "auth/email-already-exists") setError("Email is already in use.");
                                            // else if (e.code === "auth/invalid-email") setError("Email address is not valid.");
                                            // else if (e.code === "auth/operation-not-allowed") setError("Operation not allowed. Please contact administrator.");
                                            // else if (e.code === "auth/invalid-password") setError("Weak Password");
                                            // else setError("Unexpected error occured.");
                                            setLoading(false);
                                        }
                                    }
                                }}
                            />

                            <View style={styles.bottomViewStyle}>
                                <Text style={styles.textStyle}>Already have an account! </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignIn")}
                                >
                                    <Text style={styles.touchTextStyle}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: "white",
        // paddingBottom: "5%"
    },
    bottomViewStyle: {
        flexDirection: "row",
        alignSelf: "center"
    },
    textStyle: {
        fontSize: 16
    },
    touchTextStyle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#720D5D"
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
        color: "#720D5D",
        marginBottom: "8%"
    }
});

export default SignUp;