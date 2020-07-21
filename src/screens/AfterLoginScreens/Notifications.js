import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { HeaderRightIcons } from "../../components/common";

const Notifications = () => {
    return (
        <View style={styles.mainViewStyle}>
            <Text>
                Notifications
            </Text>
        </View>
    );
}

Notifications.navigationOptions = ({ navigation }) => {
    return {
        title: "Notifications",
        headerRight: () => <HeaderRightIcons navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default Notifications;