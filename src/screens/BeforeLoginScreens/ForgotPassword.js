import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import "text-encoding-polyfill";
import auth from "@react-native-firebase/auth";
const Joi = require("@hapi/joi");
const _ = require("lodash");

import { Input, Button, Background, ActivityIndicator } from "../../components/common";

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState("imnetanm@gmail.com");
    const [emailError, setEmailError] = useState(false);
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

    const forgotPasswordHandler = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        const result = validateEmail();
        if (result == false)
            return setLoading(false);
        else {
            try {
                const res = await auth().sendPasswordResetEmail(email);
                console.log(res);
                setSuccess("Email has been sent to your email address.");
                return setLoading(false);
            } catch (e) {
                console.log("from forgot password", e);
                // setError(JSON.stringify(e.code));
                if (e.code === "auth/invalid-email") setError("Email address is not valid.");
                else if (e.code === "auth/user-not-found") setError("There is no user corresponding to the email address.");
                else if (e.code === "auth/network-request-failed") setError("Please check internet connection");
                else if (e.code === "deadline-exceeded") setError("Please check internet connection");
                else setError("Unexpected Error occured.");
                // if (e.code === "auth/missing-android-pkg-name") setError("Unexpected Error occured.\nPlease contact administrator");
                // if (e.code === "auth/missing-continue-uri") setError("Unexpected Error occured.\nPlease contact administrator");
                // if (e.code === "auth/missing-ios-bundle-id") setError("Unexpected Error occured.\nPlease contact administrator");
                // if (e.code === "auth/invalid-continue-uri") setError("Unexpected Error occured.\nPlease contact administrator");
                // if (e.code === "auth/unauthorized-continue-uri") setError("Unexpected Error occured.\nPlease contact administrator");

                return setLoading(false);
            }
        }
    }

    return (
        <View style={styles.viewStyle}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <Background />
                <View style={{ marginTop: "28%", marginHorizontal: "5%", flex: 1 }}>
                    <Text style={styles.headerStyle}>
                        Forgot Password
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
                            <Button
                                title="Send Link"
                                buttonStyle={{ paddingHorizontal: 20, marginBottom: 10 }}
                                onPress={forgotPasswordHandler}
                            />

                            {/* <View style={styles.bottomViewStyle}>
                                <Text style={styles.textStyle}>Don't have an account! </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text style={styles.touchTextStyle}>Sign Up</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={styles.bottomViewStyle}>
                                <Text style={styles.textStyle}>Goto </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignIn")}
                                >
                                    <Text style={styles.touchTextStyle}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        alignSelf: "center",
        marginBottom: 5
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

export default ForgotPassword;