import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const BackButton = ({ navigation, onPress = null }) => {
    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={
                onPress == null
                    ? () => navigation.goBack()
                    : onPress
            }
        >
            <AntDesign
                name="arrowleft"
                size={22}
                color="white"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 20
    }
});

export { BackButton };