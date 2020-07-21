import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const Button = ({ title, buttonStyle, textStyle, onPress, icon, iconStyle }) => {
    return (
        <TouchableOpacity
            style={{ ...defStyles.buttonStyle, ...buttonStyle }}
            onPress={() => onPress()}
        >
            <View style={{ flexDirection: "row" }}>
                {
                    icon
                        ? (
                            <View style={{...defStyles.iconStyle, ...iconStyle}}>
                                {icon}
                            </View>
                        )
                        : null
                }
                <Text style={{ ...defStyles.textStyle, ...textStyle }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const defStyles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#720D5D",
        marginHorizontal: 8,
        marginVertical: 8,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignSelf: "center",
        borderRadius: 16,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 80, height: 20 },
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    iconStyle: {
        marginRight: 15,
        justifyContent: "center"
    }
});

export { Button };