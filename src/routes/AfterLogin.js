import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Profile from "../screens/AfterLoginScreens/Profile";

const AfterLoginRoute = createStackNavigator(
    {
        // DrawerRoute: {
        //     screen: DrawerRoute,
        //     navigationOptions: ({ navigation }) => {
        //         headerTitle: ""
        //     }
        // },
        // Feedback: {
        //     screen: Feedback,
        //     navigationOptions: ({ navigation }) => {
        //         headerTitle: ""
        //     }
        // },
        // AboutUs: {
        //     screen: AboutUs,
        //     navigationOptions: ({ navigation }) => {
        //         headerTitle: ""
        //     }
        // },
        // Calender: {
        //     screen: Calender,
        //     navigationOptions: ({ navigation }) => {
        //         headerTitle: ""
        //     }
        // },
        Profile: {
            screen: Profile,
            navigationOptions: ({ navigation }) => {
                headerTitle: ""
            }
        },
    },
    {
        initialRouteName: "Profile"
    }
);

export default AfterLoginRoute;