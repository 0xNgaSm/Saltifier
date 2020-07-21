import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppStarter from "../screens/AppStarter";
import BeforeLoginRoute from "./BeforeLogin";
import AfterLoginRoute from "./AfterLogin";

const MainSwitchRoute = createSwitchNavigator(
    {
        AppStarter: AppStarter,
        BeforeLogin: BeforeLoginRoute,
        AfterLogin: AfterLoginRoute
    },
    {
        initialRouteName: "AppStarter",
    }
);

export default createAppContainer(MainSwitchRoute);