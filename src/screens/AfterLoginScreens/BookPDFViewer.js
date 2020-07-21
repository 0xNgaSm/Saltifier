import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import PDFView from "react-native-view-pdf";
import { ActivityIndicator, BackButton } from '../../components/common';

const BookPdfViewer = ({ navigation }) => {
    let url = navigation.getParam("url");
    // let url = "https://firebasestorage.googleapis.com/v0/b/iserd-f4c3f.appspot.com/o/books%2F222222.pdf?alt=media&token=4de96bfb-ba06-4df5-8da6-29dfffc9f1ea";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // if (loading)
    //     return <ActivityIndicator />;

    if (error)
        return (
            <View>
                <Text style={styles.errorText}>
                    {error}
                </Text>
            </View>
        );

    return (
        <>
            <StatusBar hidden={true} />
            <View style={styles.mainViewStyle}>
                <PDFView
                    fadeInDuration={150.0}
                    style={{ flex: 1 }}
                    resource={url}
                    resourceType={'url'}
                    // onLoad={() => setLoading(false)}
                    onError={(error) => setError("Error occured\n", error)}
                />
            </View>
        </>
    );
}

BookPdfViewer.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam("title"),
        headerLeft: () => <BackButton navigation={navigation} />,
        // headerRight: () => <HeaderRightIcons navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    },
    errorText: {
        fontSize: 14,
        color: "red",
        alignSelf: "center",
        textAlign: "center"
    }
});

export default BookPdfViewer;