import React, { Component } from "react";
import { AppState, Platform, View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import Modal from "react-native-modal";
import firestore from "@react-native-firebase/firestore";

import { APP_VERSION as currentVersion } from "../../constants/config";

const isUpdateRequired = ({ version, currentVersion }) => {
    // console.log("`````````````````Hi``````````````````");
    let oldVersion = currentVersion.split(".");
    let newVersion = version.split(".");

    for (let index = 0; index < oldVersion.length; index++) {
        let oldVersionIndexValue = parseInt(oldVersion[index]);
        let newVersionIndexValue = parseInt(newVersion[index]);
        if (oldVersionIndexValue > newVersionIndexValue) {
            return false;
        } else if (oldVersionIndexValue < newVersionIndexValue) {
            return true;
        }
    }
    return false;
};

class AppUpdate extends Component {
    state = {};

    constructor(props) {
        super(props);
        console.log("\n\nfrom app version control")
        this.getAppVersionInfo();
    }

    handleAppStateChange = nextAppState => {
        if (nextAppState === "active") {
            this.getAppVersionInfo();
        }
    };

    getAppVersionInfo = async () => {
        // await AsyncStorage.clear();
        try {
            //fetch data from firebase
            let appVersionResultSnap = await firestore().collection("versionControl").where("platform", "==", Platform.OS).get();
            let appVersionResult = appVersionResultSnap.docs[0];

            let { updateUpto: expiry, version, updateUrl } = appVersionResult.data() || {};
            expiry = expiry._seconds * 1000;
            console.log(expiry, version, updateUrl);
            if (!version || !expiry || !updateUrl) {
                return;
            }
            this.setState({ updateUrl: updateUrl });
            if (isUpdateRequired({ version, currentVersion })) {
                // expiry = moment.unix(expiry)
                //     .startOf("day")
                //     .toDate();
                console.log(expiry - Date.now());
                if (expiry - Date.now() < 0) {
                    this.setState({ isModalOpen: true, mandatoryUpdate: true, expireDate: expiry });
                } else {
                    let lastSkipTime = await AsyncStorage.getItem("skipUpdateTime");
                    if (!lastSkipTime || Date.now() - lastSkipTime > 1000 * 60 * 60 * 3) {
                        this.setState({ isModalOpen: true, mandatoryUpdate: false, expireDate: expiry });
                    }
                }
            }
        } catch (err) {
            //Do nothing
        }
    };

    skipUpdate = async () => {
        await AsyncStorage.setItem("skipUpdateTime", JSON.stringify(Date.now()));
        this.setState({ isModalOpen: false });
    };

    componentDidMount() {
        AppState.addEventListener("change", this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
    }

    render() {
        console.log(this.state);
        const { mandatoryUpdate, isModalOpen, expireDate, updateUrl } = this.state;
        let appUpdateMessage = mandatoryUpdate
            ? "Last date to update app is _date_.\nUpdate includes some bug fixes and performance improvements. Please update the app to continue."
            : "Update includes some bug fixes and performance improvements. Please update the app before _date_ for best service.";
        appUpdateMessage = appUpdateMessage.replace("_date_", moment(expireDate).format("DD/MM/YYYY"));
        return (
            <Modal
                isVisible={isModalOpen}
                backdropColor="black"
                backdropOpacity={0.8}
            // {...modalProps}
            >
                <View style={styles.modalMainViewStyle}>
                    <Text style={styles.headerTextStyle}>
                        Update Available
                    </Text>
                    <Text style={styles.appUpdateMsgTextStyle}>
                        {appUpdateMessage}
                    </Text>
                    <View style={styles.bottomViewStyle}>
                        {
                            !mandatoryUpdate
                                ? <TouchableOpacity
                                    onPress={this.skipUpdate}
                                    style={{ position: "absolute", left: 0, bottom: 0 }}
                                >
                                    <Text style={styles.touchTextStyle}>
                                        Update Later
                                    </Text>
                                </TouchableOpacity>
                                : null
                        }
                        <TouchableOpacity
                            onPress={async () => await Linking.openURL(updateUrl)}
                            style={{ position: "absolute", right: 0, bottom: 0 }}
                        >
                            <Text style={styles.touchTextStyle}>
                                Update Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalMainViewStyle: {
        padding: 15,
        backgroundColor: "white",
        borderRadius: 10
    },
    headerTextStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "rgb(15, 151, 142)",
        marginBottom: 16
    },
    appUpdateMsgTextStyle: {
        fontSize: 16,
        marginBottom: 40,
    },
    bottomViewStyle: {
        flexDirection: "row",
        // justifyContent: "space-between",
        paddingTop: 6,
    },
    touchTextStyle: {
        fontSize: 16,
        color: "rgb(15, 151, 142)"
    }
});

export default AppUpdate;