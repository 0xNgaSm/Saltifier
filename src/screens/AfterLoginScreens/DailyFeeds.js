import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableWithoutFeedback, Linking } from "react-native";
import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import HTMLView from "react-native-htmlview";

import { ActivityIndicator, HeaderRightIcons, BackButton } from "../../components/common";

const renderItem = ({ item, index }, navigaion) => {
    // if (index >= 5)
    //     return null;

    const [title, source] = item.title.split(" - ");
    const des = item.description;
    return (
        <View style={styles.viewStyle}>

            <TouchableWithoutFeedback
                onPress={() => navigaion.navigate("WebViewScreen", {
                    url: item.links[0].url,
                    headerTitle: title
                })}
            >
                <Text style={styles.titleStyle}>{title}</Text>
                {/* item.links[0].url for redirect */}
            </TouchableWithoutFeedback>
            <Text style={styles.sourceStyle}>{source} - {item.published.substr(0, 17)}</Text>
            {
                des.length > 3
                    ? <HTMLView
                        value={des}
                        onLinkPress={(url) => navigaion.navigate("WebViewScreen", {
                            url: url,
                            headerTitle: url
                        })}
                        stylesheet={htmlViewStyles}
                    />
                    : null}
        </View>
    );
}

const renderList = (data, navigation) => {
    return (
        <FlatList
            key={(item) => item.id}
            data={data}
            renderItem={(val) => renderItem(val, navigation)}
        />
    );
}

const DailyFeed = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState(
        `https://news.google.com/rss?q=${navigation.getParam("interest") || "india"}`,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            console.log(url);
            try {
                var result = await axios.get(url, {
                    cancelToken: source.token,
                    responseType: "text",
                    timeout: 30000
                });
                result = await rssParser.parse(result.data);
                // console.log("\n\n\n\n\n\n\n\n\n\n");
                // console.log(result._55.items);
                setData(result);
            } catch (e) {
                if (axios.isCancel(e))
                    console.log("cancelled the request");
                else
                    setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();

        return () => {
            source.cancel();
        }
    }, [url]);

    return (
        <View style={styles.mainViewStyle}>
            {/* <SearchBar
                value={query}
                onValueChange={(val) => setQuery(val)}
                onValueSubmit={() => setUrl(
                    query
                        ? `https://news.google.com/rss/search?q=${query}`
                        : "https://news.google.com/rss"
                )}
            /> */}

            {
                isError
                    ? <Text style={styles.errorText}>Something went wrong...</Text>
                    : null
            }
            {
                isLoading
                    ? <ActivityIndicator size={40} />
                    : data != null && data.items.length > 0
                        ? renderList(data.items, navigation)
                        : <Text style={styles.noDataStyle}>No data found</Text>
                //: <Text style={{fontSize: 30}}>{JSON.stringify(data)}</Text>
            }
        </View>
    );
}

DailyFeed.navigationOptions = ({ navigation }) => {
    return {
        title: "Daily Feed",
        headerLeft: () => <BackButton navigation={navigation} />,
        // headerRight: () => <HeaderRightIcons navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: "white",
        flex: 1
    },
    errorText: {
        color: "red",
        fontSize: 18,
        textAlign: "center"
    },
    viewStyle: {
        margin: 15,
        padding: 10,
        borderColor: "gray",
        borderWidth: 0.9,
        borderRadius: 15
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: "700",
        paddingBottom: 5
    },
    sourceStyle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 10
    },
    noDataStyle: {
        fontSize: 16,
        alignSelf: "center",
        padding: 10,
    }
});

const htmlViewStyles = {
    a: {
        fontSize: 18,
        color: "blue",
        padding: 20
    },
    li: {
        padding: 20
    },
    ui: {
        padding: 20
    }
}

export default DailyFeed;