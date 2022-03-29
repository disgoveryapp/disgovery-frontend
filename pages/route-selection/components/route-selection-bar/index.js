import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextInput from "../../../../components/themed-text-input";
import { useNavigation, useTheme } from "@react-navigation/native";
import ArrowIcon24 from "../../../../assets/svgs/arrow-forward-24px";
import SwapIcon from "../../../../assets/svgs/swap-icon";
import ArrowBackwardIcon from "../../../../assets/svgs/arrow-backward-24px";
import PinDropIcon from "../../../../assets/svgs/pin-drop-icon";
import ScheduleIcon from "../../../../assets/svgs/schedule-icon";

export default function RouteSelectionBar(props) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    /*function swapValue() {
        props.setFlip(true);
        const temp = props.value;
        props.onChangeText(props.valueLocation);
        props.onChangeTextLocation(temp);
    }*/
    function goBack() {
        navigation.pop();
    }

    const styles = StyleSheet.create({
        outerContainer: {
            display: "flex",
            width: "100%",
            paddingBottom: 12,
        },
        outerSecondContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        container: {
            width: "auto",
            height: 44,
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
        },
        body: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
        },
        textContainer: {
            flex: 1,
            height: 39,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.upper_background,
            borderRadius: 12,
            paddingHorizontal: 12,
        },
        textinput: {
            color: colors.text,
            fontSize: 18,
            fontWeight: "600",
        },
        departContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 6,
        },
    });

    return (
        <View style={styles.outerContainer}>
            <View style={styles.outerSecondContainer}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <View style={{ marginRight: 6 }}>
                                <PinDropIcon />
                            </View>
                            <TouchableOpacity style={styles.textContainer}>
                                <ThemedText style={styles.textinput}>Bang Sue Station</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <View style={{ marginRight: 6 }}>
                                <ArrowIcon24 />
                            </View>
                            <TouchableOpacity style={styles.textContainer}>
                                <ThemedText style={styles.textinput}>Central World</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <SwapIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}
