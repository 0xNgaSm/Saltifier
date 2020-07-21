import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const Input = (props) => {

    const [isFocused, setIsFocused] = useState(false);

    const {
        labelText,
        placeholder,
        errorText,
        autoCapitalize,
        secureTextEntry,
        autoCorrect,
        autoFocus,
        viewStyle,
        labelTextStyle,
        inputBoxStyle,
        value,
        onChangeText,
        editable
    } = props;

    const boxStyle = isFocused
        ? styles.focusedInputBoxStyle
        : styles.inputBoxStyle;

    return (
        <View style={{ ...styles.viewStyle, ...viewStyle }}>
            <Text style={{ ...styles.labelTextStyle, ...labelTextStyle }}>{labelText}</Text>
            <TextInput
                style={{ ...boxStyle, ...inputBoxStyle }}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize == undefined ? "none" : autoCapitalize}
                secureTextEntry={secureTextEntry == undefined ? false : secureTextEntry}
                autoCorrect={autoCorrect == undefined ? false : autoCorrect}
                autoFocus={autoFocus == undefined ? false : autoFocus}
                value={value}
                onChangeText={(val) => onChangeText(val)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={editable == undefined ? true : editable}
            />
            {
                errorText
                    ? <Text style={styles.errorTextStyle}>{errorText}</Text>
                    : <Text></Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        margin: 4,
    },
    labelTextStyle: {
        fontSize: 14,
        color: "gray"
    },
    inputBoxStyle: {
        borderBottomColor: "gray",
        borderBottomWidth: 2,
        fontSize: 18
    },
    focusedInputBoxStyle: {
        borderBottomColor: "#E30425",
        borderBottomWidth: 2,
        fontSize: 18,
    },
    errorTextStyle: {
        color: "red"
    }
});

export { Input };