import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HeaderRightIcons = ({ navigation }) => {
    return (
        <View style={styles.headerIconsViewStyles}>
            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("AboutAndContactUsStack")}
            >
                {/* <FontAwesome
                    name="phone"
                    size={26}
                    color="white"
                /> */}
                <FontAwesome
                    name="question-circle-o"
                    size={26}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => navigation.navigate("ProfileStack")}
            >
                {/* <FontAwesome
                    name="user-circle-o"
                    size={26}
                    color="white"
                /> */}
                <MaterialCommunityIcons
                    name="account-edit"
                    size={26}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    headerIconsViewStyles: {
        flexDirection: "row"
    },
    iconStyle: {
        paddingRight: 30
    }
});

export { HeaderRightIcons };