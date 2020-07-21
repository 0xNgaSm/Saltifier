import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import GetStarted from "../screens/BeforeLoginScreens/GetStarted";
import IntroSliders from "../screens/BeforeLoginScreens/IntroSliders";
import SignUpScreen from "../screens/BeforeLoginScreens/SignUp";
import SignInScreen from "../screens/BeforeLoginScreens/SignIn";
import ForgotPasswordScreen from "../screens/BeforeLoginScreens/ForgotPassword";

const BeforeLoginRoute = createStackNavigator(
    {
        GetStarted: GetStarted,
        IntroSliders: IntroSliders,
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
        ForgotPasswordScreen: ForgotPasswordScreen
    },
    {
        initialRouteName: "GetStarted",
        defaultNavigationOptions: {
            headerShown: false
        }
    }
);

export default BeforeLoginRoute;