import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, BackButton } from "../../components/common";

const WebViewScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setParams({
            defaultHeaderTitle: "Browser"
        });
    }, []);

    return (
        <WebView
            source={{ uri: navigation.getParam("url") }}
            style={{ flex: 1 }}
            renderError={(errorDomain, errorCode, errorDesc) => {
                return (
                    <Text style={{ textAlign: "center" }}>
                        Error loading page
                        {"\n"}{errorDomain}
                    </Text>
                );
            }}
            startInLoadingState={true}
            renderLoading={() => {
                return (
                    <View style={{ ...StyleSheet.absoluteFillObject }}>
                        <ActivityIndicator size={40} />
                    </View>
                );
            }}
        />
    );
}

WebViewScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam("headerTitle") || navigation.getParam("defaultHeaderTitle"),
        headerLeft: () => <BackButton navigation={navigation} />
    };
}

export default WebViewScreen;