import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import functions from "@react-native-firebase/functions";
import Entypo from "react-native-vector-icons/Entypo";
import auth from "@react-native-firebase/auth";
// functions().useFunctionsEmulator("http://localhost:5001");

import { HeaderRightIcons, ActivityIndicator, Button } from "../../components/common";
import { fetchBooksAndPaidUserAction } from "../../redux/actions/booksActions";

const DigitalLibrary = ({ navigation, error, loading, books, paidUser, fetchBooksAndPaidUserAction }) => {

    const [selectedBook, setSelectedBook] = useState(-1);
    const [bookError, setBookError] = useState(false);
    const [err, setErr] = useState("");

    const fetchBookUrl = async ({ item, index }) => {
        setBookError(false);
        try {
            const fetchBookCF = functions().httpsCallable("fetchBookUrl");
            const data = await fetchBookCF(item.id);
            console.log(data.data);
            if (data && data.data) navigation.navigate("BooksPDFViewer", {
                title: item.data.title,
                url: data.data
            });
            else {
                setBookError(true);
            }
        } catch (e) {
            console.log("lib", e);
            console.log(e.code);
            if (e.code === "permission-denied")
                navigation.navigate("SelectPackageScreen");
            else {
                setBookError(true);
                setErr(e.code);
            };
        }
        setSelectedBook(-1);
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.wholeItemViewStyle}
                onPress={() => {
                    console.log(item.id);
                    setSelectedBook(index);
                    fetchBookUrl({ item, index });
                }}
            >
                {
                    selectedBook === index
                        ? bookError == false
                            ? <ActivityIndicator size={40} />
                            : <Text style={styles.errorText}>{"Something went wrong..."}</Text>
                        : <>
                            <Image
                                source={{ uri: item.data.coverImageUrl }}
                                style={styles.coverImageStyle}
                                width={80}
                                height={80}
                            />
                            <View style={styles.textViewStyle}>
                                <Text style={styles.titleStyle}>{item.data.title}</Text>
                                <Text style={styles.authorStyle}>{item.data.author}</Text>
                            </View>
                        </>
                }
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        fetchBooksAndPaidUserAction(auth().currentUser.uid);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~rendered again~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        return () => {
            setSelectedBook(-1);
        }
    }, []);

    if (loading) return <ActivityIndicator size={40} />;

    if (error) return <Text style={styles.errorText}>Something went wrong...</Text>

    return (
        <View style={styles.mainViewStyle}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.data.title}
                contentContainerStyle={{paddingBottom: 18}}
                renderItem={renderItem}
                refreshing={false}
                onRefresh={() => fetchBooksAndPaidUserAction(auth().currentUser.uid)}
            />

            {
                paidUser
                    ? null
                    : <>
                        <View style={styles.overlayViewStyle}>
                            <View style={styles.overlayInsideViewStyle}>
                                <Entypo
                                    name="lock"
                                    color="rgb(51, 51, 51)"
                                    size={250}
                                />
                            </View>
                            <View style={[styles.overlayInsideViewStyle, { flex: 2 }]}></View>
                        </View>
                        <Button
                            title="Unlock All Books"
                            onPress={() => navigation.navigate("SelectPackageScreen")}
                            buttonStyle={{ paddingHorizontal: 20, color: "rgb(15, 151, 142)",  position: "absolute", bottom: "15%" }}
                        />
                    </>
            }
        </View>
    );
}

DigitalLibrary.navigationOptions = ({ navigation }) => {
    return {
        title: "Digital Library",
        headerRight: () => <HeaderRightIcons navigation={navigation} />,
        // unmountOnBlur: true
    };
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: "white",
        // marginBottom: 10
    },
    wholeItemViewStyle: {
        flexDirection: "row",
        // borderColor: "black",
        // borderWidth: 1,
        // // borderRadius: 20,
        marginHorizontal: "3%",
        marginTop: 18,
        padding: 16,
        borderRadius: 4,
        height: 112,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    textViewStyle: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1
    },
    coverImageStyle: {
        width: 80,
        height: 80,
        marginRight: 20,
        borderRadius: 10
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    authorStyle: {
        color: "gray"
    },
    errorText: {
        color: "red",
        fontSize: 18,
        textAlign: "center"
    },
    overlayViewStyle: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: "rgb(100, 100, 100)",
        opacity: 0.8,
    },
    overlayInsideViewStyle: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    }
});

const mapStateToProps = (state, props) => {
    console.log(state.books);
    return state.books;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchBooksAndPaidUserAction: fetchBooksAndPaidUserAction
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalLibrary);