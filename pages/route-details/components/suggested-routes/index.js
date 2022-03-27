import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import CloudOffIcon from "../../../../assets/svgs/cloud-off";

export default function SuggestedRoutes(props) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        titleText: {
            fontWeight: "bold",
            fontSize: 24,
            padding: 12,
        },
    });
    return (
        <>
            <View style={styles.container}>
                <ThemedText style={styles.titleText}>Suggested routes</ThemedText>
            </View>
        </>
    );
}