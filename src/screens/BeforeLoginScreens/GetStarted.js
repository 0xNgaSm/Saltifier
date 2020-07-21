import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { Button, ActivityIndicator } from "../../components/common"
const GetStarted = ({ navigation }) => {
    return (
        <View style={styles.viewStyle}>

            <Image
                style={styles.imageStyle2}
                resizeMode="contain"
                width="100"
                height="70"
                source={require("../../../assets/images/getStarted.png")}
            />
            <Image
                style={styles.imageStyle1}
                resizeMode="contain"
                width="100"
                height="60"
                source={require("../../../assets/images/logo.png")}
            />
            {/* <Text
                style={styles.headerStyle}
            >
                ISERD India
           </Text> */}
            <Text
                style={styles.desStyle}
            >
                First app in the world to
                {"\n"}protect your privacy
                {"\n"}and digital identity
                {"\n"}ensuring full protection to you.
           </Text>
            <Button
                title="Get Started"
                buttonStyle={{ borderRadius: 10, backgroundColor: "purple" }}
                textStyle={{ fontSize: 20, paddingHorizontal: 40, color: "white" }}
                onPress={() => navigation.navigate("IntroSliders")}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white"
    },
    imageStyle1: {
        width: "70%",
        height: "22%",
        alignSelf: "center",
    },
    imageStyle2: {
        width: "100%",
        height: 280,
        // alignSelf: "center",
    },
    headerStyle: {
        fontSize: 35,
        fontWeight: "700",
        color: "#720D5D",
        alignSelf: "center",
        marginBottom: "5%"
    },
    desStyle: {
        fontSize: 16,
        marginHorizontal: "5%",
        marginBottom: "10%",
        color: "rgb(51, 51, 51)",
        textAlign: "center"
    }
});

export default GetStarted;