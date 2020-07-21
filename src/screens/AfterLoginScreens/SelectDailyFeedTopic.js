import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { HeaderRightIcons, BackButton } from "../../components/common";

const SelectDailyFeedTopicScreen = ({ navigation }) => {

    const imageComponent = (imageSource, interestTopic, topic) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("DailyFeedsScreen", {
                    interest: interestTopic
                })}
            >
                <ImageBackground
                    source={imageSource}
                    style={styles.imageStyle}
                    borderRadius={10}
                    resizeMode="stretch"
                >
                    <LinearGradient
                        colors={["transparent", "transparent", "#000"]}
                        style={{ flex: 1, borderRadius: 25 }}
                    >
                        <View style={styles.textViewStyle}>
                            <Text style={styles.textStyle}>
                                {topic}
                            </Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView
            style={styles.mainViewStyle}
            contentContainerStyle={{paddingBottom: 15}}
        >
            <Text style={styles.topTextStyle}>
                Select the section you are interested in to see the news from that section.
            </Text>

            <View style={styles.rowViewStyle}>
                {imageComponent(require("../../../assets/images/selectTopic_scienceAndTech.png"), "science", "Science\nand tech")}
                {imageComponent(require("../../../assets/images/selectTopic_resAndDev.png"), "research", "Research")}
            </View>

            <View style={styles.rowViewStyle}>
                {imageComponent(require("../../../assets/images/selectTopic_aiAndRobotics.png"), "robotics", "AI and Robotics")}
                {imageComponent(require("../../../assets/images/selectTopic_entrepreneurship.png"), "entrepreneurship", "Startups")}
            </View>

            <View style={[styles.rowViewStyle, {paddingBottom: 30}]}>
                {imageComponent(require("../../../assets/images/selectTopic_politics.png"), "politics", "General News")}
                {imageComponent(require("../../../assets/images/selectTopic_development.png"), "development", "Development")}
            </View>
            {/* <View style={{ ...styles.rowViewStyle, flex: 0.5 }}></View> */}
        </ScrollView>
    );
}

SelectDailyFeedTopicScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "News Section",
        headerRight: () => <HeaderRightIcons navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    mainViewStyle: {
        // flex: 1,
        flexDirection: "column",
        // justifyContent: "space-around",
        // alignContent: "flex-start",
        backgroundColor: "white",
        paddingHorizontal: "3%",
        paddingTop: "5%",
        paddingBottom: 20
    },
    rowViewStyle: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // height: 140,
        // borderWidth: 1,
        paddingVertical: 10
    },
    topTextStyle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 15
    },
    imageStyle: {
        width: Dimensions.get("window").width / 2.6,
        height: Dimensions.get("window").width / 2.6,
    },
    textViewStyle: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        borderColor: "green",
        paddingBottom: 3,
        paddingLeft: 10,
        backgroundColor: "transparent"
        // borderWidth: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        paddingLeft: 2,
        paddingBottom: 3,
        backgroundColor: "transparent",
        // alignSelf: "baseline"
    }
});

export default SelectDailyFeedTopicScreen;