import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../../components/themed-text";
import MaskIcon from "../../../../assets/svgs/mask-icon";
import { useTheme } from "@react-navigation/native";

function FaceCovering(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            maxHeight: 65,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",

            paddingVertical: 14,
            paddingHorizontal: props.containerPadding,
        },
        iconContainer: {
            display: "flex",
            marginRight: 8,
        },
        title: {
            flex: 1,
            fontWeight: "500",
            fontSize: 14,
            color: "#FFBF1C",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaskIcon />
            </View>
            <ThemedText style={styles.title}>
                Face covering is required when travelling via public transportation
            </ThemedText>
        </View>
    );
}

export default FaceCovering;
