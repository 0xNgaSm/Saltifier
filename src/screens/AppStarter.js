import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
// import SplashScreen from "react-native-splash-screen";
import { ActivityIndicator } from "../components/common";

// functions().useFunctionsEmulator('http://localhost:5001');

const AppStarter = ({ navigation }) => {
	const [error, setError] = useState("");

	useEffect(() => {
		let mounted = true;
		const fetchUserDetails = async () => {

			try {
				const user = auth().currentUser;
				console.log(user);
				if (user == null) {
					navigation.navigate("BeforeLogin");
				}
				else {
					await user.reload();
					navigation.navigate("AfterLogin");
				}
			} catch (e) {
				console.log(e);
				if (e.code === "auth/invalid-email") setError("Email address is not valid.");
				else if (e.code === "auth/user-disabled") setError("User corresponding to the given email has been disabled.");
				else if (e.code === "auth/too-many-requests") setError("Too many unsuccessful login attempts.\nPlease try again later.");
				else if (e.code === "auth/network-request-failed") setError("Please check internet connection");
				else setError("Something went wrong");
			}
		}

		// setTimeout(() => {
		// 	if (mounted)
		// 		SplashScreen.hide();
			fetchUserDetails();
		// }, 1200);

		return () => {
			mounted = false;
		}

	}, []);

	if (error) return <Text style={{
		color: "red",
		fontSize: 18,
		textAlign: "center",
		alignSelf: "center"
	}}
	>
		Something went wrong...
	</Text>

	return (
		<View style={{ flex: 1 }}>
			<ActivityIndicator size={40} />
		</View>
	);
}

export default AppStarter;