import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

import { data } from "../../../constants/aboutUs";
import { Button, HeaderRightIcons, BackButton } from "../../components/common";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";

const { aboutISERD, mission, vision, role } = data;


const renderAboutISERD = () => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.descriptionStyle}>
                {aboutISERD}
            </Text>
        </View>
    );
}

const renderRole = () => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.headerStyle}>
                Role of ISERD
            </Text>
            <Text style={styles.descriptionStyle}>
                {role}
            </Text>
        </View>
    );
}

const AboutAndContactUs = ({ navigation }) => {

    // const telView = async () => {
    //     await Linking.openURL("tel://+919328915058")
    // }

    const mailView = async () => {
        // await Linking.openURL("mailto:iserdindia@gmail.com")
        await Linking.openURL("mailto:contactus@iserdindia.com")
    }

    const instaWebView = async () => {
        await Linking.openURL("https://www.instagram.com/iserdindia");
        // await Linking.openURL("https://instagram.com");
        // navigation.navigate("WebViewScreen", {
        //     url: "https://www.instagram.com"
        // });
    }

    const twitterWebView = async () => {
        await Linking.openURL("https://www.twitter.com/iserdindia");
        // navigation.navigate("WebViewScreen", {
        //     url: "https://www.twitter.com"
        // });
    }

    const facebookWebView = async () => {
        await Linking.openURL("https://www.facebook.com/iserdindia");
        // navigation.navigate("WebViewScreen", {
        //     url: "https://www.facebook.com"
        // });
    }

    const linkedinWebView = async () => {
        await Linking.openURL("https://www.linkedin.com/company/iserdindia");
        // navigation.navigate("WebViewScreen", {
        //     url: "https://www.facebook.com"
        // });
    }

    return (
        <ScrollView
            style={styles.mainViewStyle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30, paddingTop: 12 }}
        >

            {renderAboutISERD()}
            {renderRole()}
            
            <Text style={styles.headerStyle}>
                Contact Us
            </Text>
            <Text style={styles.desStyle1}>
                In case of any complain or suggestion feel free to reach out to us. You can send us a mail via :
            </Text>
            <TouchableOpacity
                onPress={mailView}
            >
                <View style={styles.rowViewStyle}>
                    <MaterialCommunityIcons
                        name="email"
                        size={40}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.conStyle}>contactus@iserdindia.com</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.desStyle2}>
                You can also reach out to us via our socials
            </Text>
            <View style={styles.rowViewStyle}>
                <TouchableOpacity
                    onPress={instaWebView}
                >
                    <MaterialCommunityIcons
                        name="instagram"
                        size={40}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={facebookWebView}
                >
                    <MaterialCommunityIcons
                        name="facebook-box"
                        size={40}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={twitterWebView}
                >
                    <MaterialCommunityIcons
                        name="twitter"
                        size={40}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={linkedinWebView}
                >
                    <MaterialCommunityIcons
                        name="linkedin"
                        size={40}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
            </View>
            <Button
                title="Visit Website"
                onPress={() => navigation.navigate("WebViewScreen", {
                    url: "https://www.iserdindia.com",
                    headerTitle: "ISERDIndia"
                })}
                buttonStyle={styles.buttonStyle}
            />
        </ScrollView>
    );
}

AboutAndContactUs.navigationOptions = ({ navigation }) => {
    return {
        title: "About Us",
        headerLeft: () => <BackButton navigation={navigation} onPress={() => navigation.navigate("TabNavigator")} />,
        // headerRight: () => <HeaderRightIcons navigation={navigation} />
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: 5,
        paddingHorizontal: "4%",
        // justifyContent: "center",
        // alignContent: "flex-start"

    },
    desStyle1: {
        color: "rgb(51, 51, 51)",
        fontSize: 18,
        marginBottom: "5%",
        textAlign: "justify"
    },
    rowViewStyle: {
        flexDirection: "row",
        marginBottom: "5%",
        alignItems: "center"
    },
    conStyle: {
        fontSize: 16,
    },
    iconStyle: {
        marginHorizontal: 15
    },
    desStyle2: {
        color: "rgb(51, 51, 51)",
        fontSize: 18,
        marginBottom: 18,
        marginTop: "2%"
    },
    viewStyle: {
        // justifyContent: "flex-start",
        // alignContent: "flex-start"
    },
    headerStyle: {
        fontSize: 34,
        fontWeight: "700",
        // paddingLeft: 10,
        paddingVertical: 10,
        // textAlign: "center",
        color: "rgb(15, 151, 142)",
    },
    descriptionStyle: {
        fontSize: 18,
        color: "rgb(51, 51, 51)",
        textAlign: "justify"
    },
    buttonStyle: {
        marginTop: 10,
        paddingHorizontal: 40,
    }
});

export default AboutAndContactUs;