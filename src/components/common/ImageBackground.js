import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Background = (props) => {
    return (
        <ImageBackground
            source={(props.source == undefined) ? require("../../../assets/images/topImage.png") : props.source}
            style={{ ...styles.imageStyle, ...props.style }}
        />
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 250,
        height: 200,
        position: "absolute",
        top: 0,
        right: 0,
        // zIndex: -1,
        // ...StyleSheet.absoluteFillObject,
        
        
    }
});

export { Background };