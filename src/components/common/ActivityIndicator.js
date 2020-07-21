import React from "react";
import { ActivityIndicator as Spinner, StyleSheet, View } from "react-native";

const ActivityIndicator = ({ style, color, size, animating }) => {
    return (
        <View style={styles.viewStyle}>
            <Spinner
                color={color || "rgb(15, 151, 142)"}
                style={{ ...styles.spinnerStyle, ...style }}
                size={size || 40}
                animating={animating == undefined ? true : animating}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
    },
    spinnerStyle: {
        alignSelf: "center"
    }
});

export { ActivityIndicator };