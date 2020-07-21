import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview";

import { ActivityIndicator, BackButton, HeaderRightIcons } from "../../components/common";
const BlogWebView = ({ navigation }) => {
    return (
        <WebView
            source={{ uri: "https://blog.iserdindia.com"}}
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

BlogWebView.navigationOptions = ({ navigation }) => {
    return {
        title: "Blog",
        headerRight: () => <HeaderRightIcons navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        paddingHorizontal: 20,
        backgroundColor: "white"
    },
    viewStyle: {
        justifyContent: "flex-start",
        alignContent: "flex-start"
    },
    headerStyle: {
        fontSize: 34,
        fontWeight: "700",
        // paddingLeft: 10,
        paddingTop: 10,
        // textAlign: "center",
        color: "rgb(15, 151, 142)",
    },
    descriptionStyle: {
        fontSize: 18,
        color: "rgb(51, 51, 51)",
        paddingVertical: 20,
        textAlign: "justify"
        // paddingVertical: 10
    },
    buttonStyle: {
        marginBottom: 20,
        backgroundColor: 'rgb(15, 151, 142)',
        paddingHorizontal: 30,
        marginBottom: 25
    }
});

export default BlogWebView;


// import React from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

// import { data } from "../../../constants/aboutUs";
// import { Button, HeaderRightIcons } from "../../components/common";

// const { aboutISERD, mission, vision, role } = data;

// const renderAboutISERD = () => {
//     return (
//         <View style={styles.viewStyle}>
//             {/* <Text style={styles.headerStyle}>
//                 About ISERD
//             </Text> */}
//             <Text style={styles.descriptionStyle}>
//                 {aboutISERD}
//             </Text>
//         </View>
//     );
// }

// const renderRole = () => {
//     return (
//         <View style={styles.viewStyle}>
//             <Text style={styles.headerStyle}>
//                 Role of ISERD
//             </Text>
//             <Text style={styles.descriptionStyle}>
//                 {role}
//             </Text>
//         </View>
//     );
// }

// const AboutUs = ({ navigation }) => {
//     // console.log(aboutISERD);
//     // console.log(mission);
//     // console.log(role);
//     // console.log(vision);
//     return (
//         <ScrollView
//             style={styles.scrollViewStyle}
//             showsVerticalScrollIndicator={false}
//         >
//             {renderAboutISERD()}
//             {/* {renderMission()} */}
//             {/* {renderVision()} */}
//             {renderRole()}
//             <Button
//                 title="Visit Website"
//                 onPress={() => navigation.navigate("WebViewScreen", {
//                     url: "https://www.iserdindia.com",
//                     headerTitle: "ISERDIndia"
//                 })}
//                 buttonStyle={styles.buttonStyle}
//             />
//         </ScrollView>
//     );
// }

// AboutUs.navigationOptions = ({ navigation }) => {
//     return {
//         title: "About Us",
//         headerRight: () => <HeaderRightIcons navigation={navigation} />
//     };
// }

// const styles = StyleSheet.create({
//     scrollViewStyle: {
//         paddingHorizontal: 20,
//         backgroundColor: "white"
//     },
//     viewStyle: {
//         justifyContent: "flex-start",
//         alignContent: "flex-start"
//     },
//     headerStyle: {
//         fontSize: 34,
//         fontWeight: "700",
//         // paddingLeft: 10,
//         paddingTop: 10,
//         // textAlign: "center",
//         color: "rgb(15, 151, 142)",
//     },
//     descriptionStyle: {
//         fontSize: 18,
//         color: "rgb(51, 51, 51)",
//         paddingVertical: 20,
//         textAlign: "justify"
//         // paddingVertical: 10
//     },
//     buttonStyle: {
//         marginBottom: 20, 
//         backgroundColor: 'rgb(15, 151, 142)',
//         paddingHorizontal: 30,
//         marginBottom: 25
//     }
// });

// export default AboutUs;