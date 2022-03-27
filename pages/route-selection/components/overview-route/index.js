import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import TravelBlock from "../travel-block";
import { Barlow_100Thin_Italic } from "@expo-google-fonts/barlow";

export default function OverViewRoute(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },
        text: {
            fontWeight: "bold",
            fontSize: 24,
            padding: 12,
        },
        subContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
        },
    });

    return (
        <>
            <View style={styles.container}>
                <ThemedText style={styles.titleText}>Overview</ThemedText>
                <View style={styles.subContainer}>
                    <TravelBlock />
                    <TravelBlock />
                    <TravelBlock />
                </View>
            </View>
        </>
    );
}
