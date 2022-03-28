import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import CloudOffIcon from "../../../../assets/svgs/cloud-off";
import RoutesDetailedBlock from "../routes-detailed-block";

export default function SuggestedRoutes() {
    const styles = StyleSheet.create({
        container: {},
        titleText: {
            fontWeight: "bold",
            fontSize: 24,
            padding: 12,
        },
    });
    return (
        <>
            <View style={styles.container}>
                <ThemedText>Suggested routes</ThemedText>
                <View>
                    <RoutesDetailedBlock />
                </View>
            </View>
        </>
    );
}
