import React from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux";

import MainSwitch from "./src/routes/MainSwitch";

//http://medium.com/@jan.hesters/building-a-react-native-app-with-complex-navigation-using-react-navigation-85a479308f52
const App = () => {
	return (
		<Provider store={store}>
			<MainSwitch />
		</Provider>
	);
}

export default App;