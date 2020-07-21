// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from "react-native";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { PricingCard } from "react-native-elements";
// import RazorpayCheckout from "react-native-razorpay";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";

// import { fetchPackagesAction } from "../../redux/actions/fetchPackagesActions";
// import { ActivityIndicator, BackButton } from "../../components/common";

// const SelectPackageScreen = ({ navigation, loading, error, packages, fetchPackagesAction }) => {

//     const handlePayment = async (price, subAddedFor, color) => {
//         console.log("\n\n\n");
//         var options = {
//             description: 'Purchase of Digital Library',
//             image: 'https://firebasestorage.googleapis.com/v0/b/iserd-f4c3f.appspot.com/o/ISERDlogo.png?alt=media&token=359fb16b-3a92-4a7e-b7dc-e866439923fe',
//             currency: 'INR',
//             key: 'rzp_test_7XdHoVU7M1B8tD',
//             amount: price * 100,
//             name: 'ISERDIndia',
//             // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
//             prefill: {
//                 email: auth().currentUser.email,
//                 // contact: '9191919191',
//                 name: auth().currentUser.displayName
//             },
//             theme: { color: String(color) }
//         };

//         try {
//             const data = await RazorpayCheckout.open(options);
//             console.log("-------------------------payment successful-------------------------");
//             console.log(data);
//             const res = await firestore().collection("payments")
//                 .add({
//                     payedAt: Date.now(),
//                     subscriptionStartedAt: Date.now(),
//                     subscriptionValidUpto: Number(Date.now()) + (subAddedFor),
//                     uid: auth().currentUser.uid,
//                     paymentInfo: data
//                 });
//             // .doc(`${auth().currentUser.uid}`)
//             // .set({
//             //     payedAt: Date.now(),
//             //     subscriptionStartedAt: Date.now(),
//             //     subscriptionValidUpto: Number(Date.now()) + (subAddedFor)
//             // });
//             console.log("request payment successful");
//             console.log(res);
//             alert(`Success: ${data.razorpay_payment_id}`);
//             navigation.navigate("DigitalLibraryScreen");
//         } catch (e) {
//             console.log(e);
//             // handle failure
//             // ${e.code} | 
//             alert(`Error: ${e.description}`);
//         }
//     }

//     const renderPackage = (item, color) => {
//         // console.log("\n\n", item, color);
//         return (
//             <View>
//                 <PricingCard
//                     color={String(color)}
//                     title={item.timing}
//                     price={item.price + " Rs."}
//                     info={item.features}
//                     button={{ title: "Proceed To Pay", icon: 'flight-takeoff' }}
//                     onButtonPress={() => handlePayment(item.price, item.subAddedFor, color)}
//                 />
//             </View>
//         );
//     }

//     useEffect(() => {

//         fetchPackagesAction();

//     }, []);

//     if (error) return <View>
//         <Text>Error</Text>
//     </View>

//     return (
//         <ScrollView style={styles.mainViewStyle}>
//             <View style={styles.topViewStyle}>
//                 <Text style={styles.textStyle}>
//                     You have discovered a premium feature.
//                 {"\n"}Purchase a plan to continue reading your
//                 favourite book.
//             </Text>
//             </View>
//             <Text style={styles.headerTextStyle}>
//                 Benefits on purchase of premium
//             </Text>
//             <Text>
//                 •   A nominal fee based access to a number of books across the world related to Intellectual Property, AI, Robotics, Research , Technology & international relations and other fictions by renowned authors and scholars.
//                 {"\n"}•	All the resources in a digital readable format and a single access to multiple sources.
//                 {"\n"}•	Access to the large database from wherever you are round the clock, your own library of books.
//                 {"\n"}•	A completely user friendly interface with the support of multimedia and texts.
//             </Text>
//             <View style={{ flex: 1 }}>
//                 {
//                     loading == true
//                         ? <ActivityIndicator size={40} />
//                         : <View>
//                             {renderPackage(packages[0], "#ca3711")}
//                             {renderPackage(packages[1], "#119218")}
//                             {renderPackage(packages[2], "#571081")}
//                         </View>
//                 }
//             </View>
//         </ScrollView>
//     );
// }

// SelectPackageScreen.navigationOptions = ({ navigation }) => {
//     return {
//         title: "Payment Options",
//         headerLeft: () => <BackButton navigation={navigation} />,
//         // headerRight: () => <HeaderRightIcons navigation={navigation} />
//     };
// }

// const styles = StyleSheet.create({
//     mainViewStyle: {
//         backgroundColor: "white",
//         flex: 1,
//         paddingVertical: "5%",
//         paddingHorizontal: "8%"
//     },
//     textStyle: {
//         fontSize: 18,
//         // textAlign: "center",
//     },
//     topViewStyle: {
//         marginBottom: "7%"
//     },
//     headerTextStyle: {
//         fontSize: 18,
//         fontWeight: "700"
//     },
// });

// const mapStateToProps = (state, props) => {
//     // console.log(state.fetchPackages);
//     return state.fetchPackages;
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(
//         {
//             fetchPackagesAction: fetchPackagesAction
//         },
//         dispatch
//     );
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SelectPackageScreen);

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { PricingCard } from "react-native-elements";
import RazorpayCheckout from "react-native-razorpay";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

import { fetchPackagesAction } from "../../redux/actions/fetchPackagesActions";
import { SET_USER_PAID } from "../../redux/actions/booksActions";
import { ActivityIndicator, BackButton, Button } from "../../components/common";

const themeColors = ["#119218", "#ca3711", "#571081", "#119218", "#ca3711", "#571081"];
const colors = ["rgba(17, 146, 24)", "rgba(200, 50, 11)", "rgba(87, 16, 129)", "rgba(17, 146, 24)", "rgba(200, 50, 11)", "rgba(87, 16, 129)"];

const SelectPackageScreen = ({ navigation, loading, error, packages, fetchPackagesAction }) => {

    const [selectedPaymentOption, setSelectedPaymentOption] = useState(0);
    const dispatch = useDispatch();

    const handlePayment = async (price, subAddedFor, dispatch) => {
        console.log("\n\n\n");
        var options = {
            description: 'Purchase of Digital Library',
            image: 'https://firebasestorage.googleapis.com/v0/b/iserd-f4c3f.appspot.com/o/ISERDlogo.png?alt=media&token=359fb16b-3a92-4a7e-b7dc-e866439923fe',
            currency: 'INR',
            key: 'rzp_test_7XdHoVU7M1B8tD',
            amount: price * 100,
            name: 'ISERDIndia',
            // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
                email: auth().currentUser.email,
                // contact: '9191919191',
                name: auth().currentUser.displayName
            },
            theme: { color: String(themeColors[selectedPaymentOption]) }
        };

        console.log("handlePayment", price, subAddedFor);

        try {
            const data = await RazorpayCheckout.open(options);
            console.log("-------------------------payment successful-------------------------");
            console.log(data);
            const res = await firestore().collection("payments")
                .add({
                    payedAt: Date.now(),
                    subscriptionStartedAt: Date.now(),
                    subscriptionValidUpto: Number(Date.now()) + (subAddedFor),
                    uid: auth().currentUser.uid,
                    paymentInfo: data
                });
            // .doc(`${auth().currentUser.uid}`)
            // .set({
            //     payedAt: Date.now(),
            //     subscriptionStartedAt: Date.now(),
            //     subscriptionValidUpto: Number(Date.now()) + (subAddedFor)
            // });
            console.log("request payment successful");
            // useDispatch()({ type: SET_USER_PAID, payload: true });
            dispatch({ type: SET_USER_PAID, payload: true });
            alert(`Success: ${data.razorpay_payment_id}`);
            navigation.navigate("DigitalLibraryScreen");
        } catch (e) {
            console.log(e);
            // handle failure
            // ${e.code} | 
            alert(`Error: ${e.description}`);
        }
    }

    useEffect(() => {

        fetchPackagesAction();

    }, []);

    if (error) return <View>
        <Text style={styles.errorTextStyle}>{error}</Text>
    </View>

    const renderPackage = ({ item, index }) => {

        const unselectedPackageViewStyle = StyleSheet.create({
            packageViewStyle: {
                width: Dimensions.get("window").width / 3.2,
                height: 180,
                alignItems: 'center',
                backgroundColor: "rgba(200, 200, 200, 0.3)",
                borderRadius: 20,
            },
            topViewInViewStyle: {
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
            },
            bottomViewInViewStyle: {
                flex: 2,
                backgroundColor: colors[index].split(")")[0] + ", 0.4)",
                width: Dimensions.get("window").width / 3.2,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center"
            },
            topTextStyle: {
                fontSize: 20,
                color: "rgb(81, 81, 81)"
            },
            bottomTextStyle: {
                fontSize: 18,
                color: "white",
                fontWeight: "bold"
            }
        });

        const selectedPackageViewStyle = StyleSheet.create({
            packageViewStyle: {
                width: Dimensions.get("window").width / 3.2,
                height: 180,
                alignItems: 'center',
                borderWidth: 1.2,
                borderRadius: 20,
                borderColor: colors[index].split(")")[0] + ", 1.0)",
            },
            topViewInViewStyle: {
                flex: 3,
                justifyContent: "center",
                alignItems: "center"
            },
            bottomViewInViewStyle: {
                flex: 2,
                backgroundColor: colors[index].split(")")[0] + ", 1.0)",
                width: Dimensions.get("window").width / 3.2,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center"
            },
            topTextStyle: {
                fontSize: 20
            },
            bottomTextStyle: {
                fontSize: 18,
                color: "white",
                fontWeight: "bold"
            }
        });

        console.log(selectedPaymentOption);
        let selectedStyles = unselectedPackageViewStyle;
        if (selectedPaymentOption === index)
            selectedStyles = selectedPackageViewStyle;

        return (
            <TouchableOpacity
                onPress={() => setSelectedPaymentOption(index)}
            >
                <View style={selectedStyles.packageViewStyle}>
                    {/* {
                    selectedPaymentOption === index
                    ? <LinearGradient
                        colors={["#571081", "transparent"]}
                        style={{height: 20, width: 20}}
                    >

                    </LinearGradient>
                    : null
                } */}
                    <View style={selectedStyles.topViewInViewStyle}>
                        <Text style={selectedStyles.topTextStyle} >{String(item.timing).split(" ")[0]}</Text>
                        <Text style={selectedStyles.topTextStyle} >{String(item.timing).split(" ")[1]}</Text>
                    </View>
                    <View style={selectedStyles.bottomViewInViewStyle}>
                        <Text style={selectedStyles.bottomTextStyle} >{String(item.price) + " Rs."}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView
            style={styles.mainViewStyle}
            showsVerticalScrollIndicator={false}
        >
            {/* <LinearGradient
                colors={["#0cb8df", "transparent"]}
                style={{height: 100, width: Dimensions.get("window").width, padding: 10}}
            >
            <Text style={{alignSelf: "center", color: "white", fontSize: 40, fontWeight:"bold"}}>Digital Library</Text>
            </LinearGradient> */}
            <View style={styles.topViewStyle}>
                <Text style={styles.textStyle}>
                    You have discovered a premium feature.
                    {"\n"}Purchase a plan to continue reading your
                    favourite book.
                </Text>
            </View>
            <Text style={styles.headerTextStyle1}>
                Benefits of using a premium feature
            </Text>
            <Text style={styles.desBenefitsTextStyle}>
                • A nominal fee based access to a number of books across the world related to Intellectual Property, AI, Robotics, Research , Technology & international studies and other fictions by renowned authors and scholars.
                {"\n"}•	All the resources in a digital readable format and a single access to multiple sources.
                {"\n"}•	Access to the large database from wherever you are round the clock, your own library of books.
                {"\n"}•	A completely user friendly interface with the support of multimedia and texts.
            </Text>
            <Text style={styles.headerTextStyle2}>
                Premium Membership Plans
            </Text>
            <View style={{ marginTop: 10, alignItems: "center", height: 180, alignContent: "center" }}>
                {
                    loading == true
                        ? <ActivityIndicator size={40} />
                        : <FlatList
                            // contentContainerStyle={{ flexGrow: 1 }}
                            keyExtractor={(item) => String(item.price)}
                            data={packages}
                            renderItem={(item) => renderPackage(item)}
                            horizontal={true}
                        />
                }
            </View>
            {
                loading == true
                    ? null
                    : <Button
                        title={
                            "Proceed To Pay"
                            + (packages[selectedPaymentOption]
                                ? " Rs." + JSON.stringify(packages[selectedPaymentOption].price)
                                : "")
                        } //{`Proceed To Pay Rs. ${packages[selectedPaymentOption].price}`}
                        buttonStyle={{ marginTop: 30, marginBottom: 30, width: 280, alignItems: "center", backgroundColor: (colors[selectedPaymentOption].split(")")[0] + ", 1.0)") }}
                        onPress={() => {
                            
                            handlePayment(packages[selectedPaymentOption].price, packages[selectedPaymentOption].subAddedFor, dispatch);
                        }}
                    />
            }
        </ScrollView>
    );
}

SelectPackageScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Payment Options",
        headerLeft: () => <BackButton navigation={navigation} />,
        // headerRight: () => <HeaderRightIcons navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: "white",
        // flex: 1,
    },
    textStyle: {
        fontSize: 18,
        // textAlign: "center",
    },
    topViewStyle: {
        marginTop: 20,
        paddingHorizontal: "8%",
        marginBottom: "7%"
    },
    headerTextStyle1: {
        paddingHorizontal: "8%",
        fontSize: 18,
        fontWeight: "700"
    },
    desBenefitsTextStyle: {
        paddingHorizontal: "8%",
        textAlign: "justify",
        fontSize: 15,
        marginBottom: 18
    },
    headerTextStyle2: {
        paddingHorizontal: "8%",
        fontSize: 24,
        fontWeight: "700",
    },
    errorTextStyle: {
        fontSize: 16,
        color: "red"
    }
});

const mapStateToProps = (state, props) => {
    // console.log(state.fetchPackages);
    return state.fetchPackages;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchPackagesAction: fetchPackagesAction
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPackageScreen);