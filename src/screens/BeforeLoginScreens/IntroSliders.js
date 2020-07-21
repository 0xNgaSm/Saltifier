import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import data from "../../../constants/IntroSlidersJsonArray";
import { Button } from "../../components/common";

const renderItem = ({ item, index }, navigation) => {
    const { image, header, description } = item;
    return (
        <View style={styles.viewStyle}>
            <Image
                style={styles.imageStyle}
                resizeMode="contain"
                width="250"
                height="250"
                source={image}
            />
            {/* {renderHeaderText(header)} */}
            <Text style={styles.headerStyle}>{header}</Text>
            <Text style={styles.desStyle}>{description}</Text>
            {
                index === data.length - 1
                    ? <Button
                        title="Continue"
                        buttonStyle={{ backgroundColor: "rgb(51, 51, 51)", borderRadius: 15, marginHorizontal: 20, width: Dimensions.get("window").width - 40 }}
                        textStyle={{ alignSelf: "center", fontSize: 24 }}
                        onPress={() => {
                            navigation.navigate("SignIn")
                            //set first_time in async storage to false
                            //navigate to home screen
                            // AsyncStorage.setItem("first_time", "false")
                            //     .then(navigation.navigate("SignIn"));
                        }}
                    />
                    : null
            }
        </View>
    );
}

const renderSkip = () => {
    return (
        <Text
            style={styles.skipStyle}
        >
            Skip
        </Text>
    );
}

const renderNext = () => {
    return (
        <View style={styles.nextViewStyle}>
            <Text
                style={styles.nextStyle}
            >
                Next {">"}
            </Text>
        </View>
    );
}

const IntroSliders = ({ navigation }) => {
    return (
        <AppIntroSlider
            data={data}
            renderItem={(item) => renderItem(item, navigation)}
            activeDotStyle={{ backgroundColor: "#720D5D" }}
            showNextButton={true}
            renderNextButton={renderNext}
            showSkipButton={true}
            showDoneButton={false}
            renderSkipButton={renderSkip}
            onSkip={() => {
                navigation.navigate("SignIn");
                // AsyncStorage.setItem("first_time", "false")
                //     .then(navigation.navigate("SignIn"));
            }}
        />
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        // justifyContent: "center",
        alignContent: "center",
        paddingTop: "8%",
        paddingHorizontal: "6%",
        backgroundColor: "white",
    },
    imageStyle: {
        width: "98%",
        height: "35%",
        marginBottom: "15%",
        alignSelf: "center"
    },
    headerStyle: {
        fontWeight: "700",
        fontSize: 38,
        marginBottom: 15,
        color: "#2d2424",
    },
    desStyle: {
        fontSize: 18,
        marginBottom: "15%",
        // textAlign: "justify"
    },
    skipStyle: {
        color: "#720D5D",
        opacity: 0.8,
        alignSelf: "center",
        fontSize: 18,
        marginLeft: 10,
        marginTop: 9
    },
    nextViewStyle: {
        backgroundColor: "#720D5D",
        alignSelf: "center",
        marginTop: 6,
        borderRadius: 25,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 80, height: 20 }
    },
    nextStyle: {
        fontSize: 18,
        paddingHorizontal: 14,
        paddingVertical: 4,
        color: "white",
        fontWeight: "bold"
    }
});

export default IntroSliders;