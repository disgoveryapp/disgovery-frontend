import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextInput from "../../../../components/themed-text-input";
import SearchIcon from "../../../../assets/svgs/search-icon";
import CloseIcon from "../../../../assets/svgs/close-icon";
import { useTheme } from "@react-navigation/native";
import ArrowIcon24 from "../../../../assets/svgs/arrow-forward-24px";
import SwapIcon from "../../../../assets/svgs/swap-icon";

export default function SearchOriginBar(props) {
    const { colors } = useTheme();

    const clearText = () => props.onChangeText("");
    const clearTextLocation = () => props.onChangeTextLocation("");
    function swapValue() {
        const temp = props.value;
        props.onChangeText(props.valueLocation);
        props.onChangeTextLocation(temp);
    }

    const styles = StyleSheet.create({
        outerContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        outerSecondContainer: {
            flex: 1,
        },
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
            alignItems: "center",
        },
        textinput: {
            height: 39,
            color: "white",
            flex: 1,
            fontSize: 18,
            paddingHorizontal: 8,
            backgroundColor: colors.background,
            borderRadius: 12,
        },
    });

    return (
        <View style={styles.outerContainer}>
            <View style={styles.outerSecondContainer}>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={{ marginRight: 6 }}>
                            <SearchIcon fill={colors.subtitle} />
                        </View>
                        <ThemedTextInput
                            placeholder={props.placeholder}
                            style={styles.textinput}
                            onChangeText={props.onChangeText}
                            value={props.value}
                            onChange={props.onChange}
                            onPress={props.onPressOrigin}
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
                <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={{ marginRight: 6 }}>
                            <ArrowIcon24 />
                        </View>
                        <ThemedTextInput
                            placeholder={props.placeholderLocation}
                            style={styles.textinput}
                            onChangeText={props.onChangeTextLocation}
                            value={props.valueLocation}
                            onChange={props.onChange}
                            onPress={props.onPressDestination}
                        />
                    </View>
                    <View>
                        {props.valueLocation ? (
                            <TouchableOpacity onPress={() => clearTextLocation()}>
                                <CloseIcon />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => swapValue()}>
                <SwapIcon />
            </TouchableOpacity>
        </View>
    );
}
