import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import "text-encoding-polyfill";
import auth from "@react-native-firebase/auth";
const Joi = require("@hapi/joi");
const _ = require("lodash");

import { Input, Button, Background, ActivityIndicator } from "../../components/common"

const SignIn = ({ navigation }) => {

    const [email, setEmail] = useState("imnetanm@gmail.com");
    const [password, setPassword] = useState("111111");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

    //create a useEffect and empty all errors and success including "error"

    return (
        <View style={styles.viewStyle}>
            <ScrollView
                contentContainerStyle={{paddingBottom: 20}}
            >
                <Background />
                <View style={{ marginTop: "28%", marginHorizontal: "5%", flex: 1 }}>
                    <Text style={styles.headerStyle}>
                        Sign In
                    </Text>
                    <Input
                        labelText="Email"
                        placeholder="user@gmail.com"
                        errorText={emailError ? "Must be a valid email address" : null}
                        autoCapitalize={"none"}
                        secureTextEntry={false}
                        autoCorrect={false}
                        autoFocus={false}
                        viewStyle={{ marginBottom: 20 }}
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
                        autoCorrect={false}
                        autoFocus={false}
                        viewStyle={{ marginBottom: 20 }}
                        value={password}
                        onChangeText={(password) => {
                            if (passwordError) setPasswordError(false);
                            setPassword(password);
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
                        : <View>
                            <TouchableOpacity
                                style={{ alignSelf: "center" }}
                                onPress={() => navigation.navigate("ForgotPasswordScreen")}
                            >
                                <Text style={{ color: "rgb(51, 51, 51)", fontSize: 18 }}>
                                    Forgot Password ?
                            </Text>
                            </TouchableOpacity>

                            <Button
                                title="Sign In"
                                buttonStyle={{ paddingHorizontal: 50, }}
                                onPress={async () => {
                                    setLoading(true);
                                    setError("");
                                    setSuccess("");
                                    let result = validateEmail();
                                    result = validatePassword() && result;
                                    if (result == false)
                                        return setLoading(false);
                                    else {
                                        try {
                                            const userCredential = await auth().signInWithEmailAndPassword(email, password);
                                            console.log(userCredential);
                                            setSuccess("Login Success");
                                            setLoading(false);
                                            _.delay(() => navigation.navigate("AfterLogin"), 400);
                                        } catch (e) {
                                            console.log("logged", e);
                                            // setError(e.code);
                                            if (e.code === "auth/invalid-email") setError("Email address is not valid.");
                                            else if (e.code === "auth/user-disabled") setError("User corresponding to the given email has been disabled.");
                                            else if (e.code === "auth/too-many-requests") setError("Too many unsuccessful login attempts.\nPlease try again later.")
                                            else if (e.code === "auth/network-request-failed") setError("Please check internet connection");
                                            else setError("Wrong Email/Password");
                                            setLoading(false);
                                        }
                                    }
                                }}
                            />

                            <View style={styles.bottomViewStyle}>
                                <Text style={styles.textStyle}>Don't have an account! </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text style={styles.touchTextStyle}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                }

            </ScrollView>
        </View >
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
        textAlign: "center",
        fontSize: 16,
        color: "rgb(15, 151, 142)"
    },
    headerStyle: {
        fontWeight: "700",
        fontSize: 40,
        color: "#720D5D",
        marginBottom: 32
    }
});

export default SignIn;