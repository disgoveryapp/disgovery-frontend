import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextInput from "../../../../components/themed-text-input";
import SearchIcon from "../../../../assets/svgs/search-icon";
import CloseIcon from "../../../../assets/svgs/close-icon";
import { useTheme } from "@react-navigation/native";
import ArrowIcon24 from "../../../../assets/svgs/arrow-forward-24px";
import SwapIcon from "../../../../assets/svgs/swap-icon";
import { useKeyboard } from "../check-keyboard";

export default function SearchOriginBar(props) {
    const { colors } = useTheme();
    const isKeyboardOpen = useKeyboard();
    const [isTabOneOpen, setTabOne] = useState(false);
    const [isTabTwoOpen, setTabTwo] = useState(false);

    const clearText = () => props.onChangeText("");
    const clearTextLocation = () => props.onChangeTextLocation("");
    function swapValue() {
        const temp = props.value;
        props.onChangeText(props.valueLocation);
        props.onChangeTextLocation(temp);
    }
    function tabOne() {
        if (isTabTwoOpen == true) {
            setTabTwo(false);
        }
        setTabOne(true);
    }
    function tabTwo() {
        if (isTabOneOpen == true) {
            setTabOne(false);
        }
        setTabTwo(true);
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
        textContainer: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background,
            borderRadius: 12,
            paddingRight: 4,
        },
        textinput: {
            height: 39,
            color: colors.text,
            flex: 1,
            fontSize: 18,
            paddingHorizontal: 8,
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
                        <View style={styles.textContainer}>
                            <ThemedTextInput
                                placeholder={props.placeholder}
                                style={styles.textinput}
                                onChangeText={props.onChangeText}
                                value={props.value}
                                onChange={props.onChange}
                                onPress={props.onPressOrigin}
                                autoFocus={props.autoFocus}
                            />
                            <View>
                                {props.value && isKeyboardOpen && isTabOneOpen ? (
                                    <TouchableOpacity onPress={() => clearText()}>
                                        <CloseIcon />
                                    </TouchableOpacity>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={{ marginRight: 6 }}>
                            <ArrowIcon24 />
                        </View>
                        <View style={styles.textContainer}>
                            <ThemedTextInput
                                placeholder={props.placeholderLocation}
                                style={styles.textinput}
                                onChangeText={props.onChangeTextLocation}
                                value={props.valueLocation}
                                onChange={props.onChange}
                                onPress={props.onPressDestination}
                            />
                            <View>
                                {props.valueLocation && isKeyboardOpen && isTabTwoOpen ? (
                                    <TouchableOpacity onPress={() => clearTextLocation()}>
                                        <CloseIcon />
                                    </TouchableOpacity>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => swapValue()}>
                <SwapIcon />
            </TouchableOpacity>
        </View>
    );
}
