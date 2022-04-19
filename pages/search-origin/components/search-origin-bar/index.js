import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextInput from "../../../../components/themed-text-input";
import SearchIcon from "../../../../assets/svgs/search-icon";
import CloseIcon from "../../../../assets/svgs/close-icon";
import { useNavigation, useTheme } from "@react-navigation/native";
import ArrowIcon24 from "../../../../assets/svgs/arrow-forward-24px";
import SwapIcon from "../../../../assets/svgs/swap-icon";
import { useKeyboard } from "../../../search/components/check-keyboard";
import ArrowBackwardIcon from "../../../../assets/svgs/arrow-backward-24px";

export default function SearchOriginBar(props) {
    const { dark, colors } = useTheme();
    const isKeyboardOpen = useKeyboard();
    const [isTabOneOpen, setTabOne] = useState(true);
    const [isTabTwoOpen, setTabTwo] = useState(false);
    const navigation = useNavigation();

    const clearText = () => props.onChangeText("");
    const clearTextLocation = () => props.onChangeTextLocation("");
    /*function swapValue() {
        props.setFlip(true);
        const temp = props.value;
        props.onChangeText(props.valueLocation);
        props.onChangeTextLocation(temp);
    }*/
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

            borderWidth: dark ? 0 : 0.5,
            borderColor: dark ? undefined : colors.middle_grey,
        },
        textinput: {
            height: 39,
            color: colors.text,
            flex: 1,
            fontSize: 18,
            paddingHorizontal: 8,
        },
    });
    function goBack() {
        navigation.pop();
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.outerSecondContainer}>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={{ marginRight: 6 }}>
                            <TouchableOpacity onPress={goBack}>
                                <ArrowBackwardIcon fill={colors.subtitle} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textContainer}>
                            <ThemedTextInput
                                inputRef={props.inputRef}
                                placeholder={props.placeholder}
                                style={styles.textinput}
                                onChangeText={props.onChangeText}
                                value={props.value}
                                onChange={props.onChange}
                                onPressIn={() => {
                                    tabOne();
                                    props.onPressOriginIn();
                                }}
                                autoFocus={props.tabOneFocus}
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
                                inputRef={props.inputRef}
                                placeholder={props.placeholderLocation}
                                style={styles.textinput}
                                onChangeText={props.onChangeTextLocation}
                                value={props.valueLocation}
                                onChange={props.onChange}
                                onPressIn={() => {
                                    tabTwo();
                                    props.onPressDestinationIn();
                                }}
                                autoFocus={!props.tabOneFocus}
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
            <TouchableOpacity onPress={() => props.swapValue()}>
                <SwapIcon />
            </TouchableOpacity>
        </View>
    );
}
