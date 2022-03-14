import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Animated } from "react-native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextInput from "../../../../components/themed-text-input";
import SearchIcon from "../../../../assets/svgs/search-icon";
import CloseIcon from "../../../../assets/svgs/close-icon";

export default function SearchBar(props) {
    const clearText = () => props.onChangeText("");
    const styles = StyleSheet.create({
        container: {
            width: "auto",
            height: 44,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 5,
        },
        body: {
            flex: 1,
            flexDirection: "row",
        },
        textinput: {
            flex: 1,
            fontSize: 18,
            paddingHorizontal: 8,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <SearchIcon />
                <ThemedTextInput
                    placeholder={props.placeholder}
                    style={styles.textinput}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    onChange={props.onChange}
                    autoFocus
                />
            </View>
            <View>
                {props.value ? (
                    <TouchableOpacity onPress={() => clearText()}>
                        <CloseIcon />
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
}
