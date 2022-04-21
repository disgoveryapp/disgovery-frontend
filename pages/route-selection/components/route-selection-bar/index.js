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
import { MyLocation } from "../../../search-origin";
import YourLocationIcon from "../../../../assets/svgs/your-location-icon";

export default function RouteSelectionBar(props) {
    const { dark, colors } = useTheme();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        outerContainer: {
            display: "flex",
            width: "100%",
            paddingBottom: 12,
            paddingHorizontal: props.containerPadding,
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
            paddingVertical: 5,
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

            borderWidth: dark ? 0 : 0.5,
            borderColor: dark ? undefined : colors.middle_grey,
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
                                {props.originName !== MyLocation && <PinDropIcon />}
                                {props.originName === MyLocation && (
                                    <YourLocationIcon
                                        style={{ marginRight: 4 }}
                                        noMarginLeft
                                        fill={colors.my_location}
                                    />
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.textContainer}
                                onPress={() => props.goBackAndFocusOn("origin")}
                            >
                                <ThemedText style={styles.textinput}>{props.originName}</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <View style={{ marginRight: 6 }}>
                                <ArrowIcon24 />
                            </View>
                            <TouchableOpacity
                                style={styles.textContainer}
                                onPress={() => props.goBackAndFocusOn("destination")}
                            >
                                <ThemedText style={styles.textinput}>
                                    {props.destinationName}
                                </ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => props.swapValue()}>
                    <SwapIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}
