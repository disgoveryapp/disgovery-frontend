import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";

export default function RoutesDetailedBlock(props) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontWeight: "bold",
            fontSize: 24,
            padding: 12,
        },
    });

    function CompactTransitLine(type, name) {
        return (
            <View>
                <View style={styles.transitIcon}></View>
                <ThemeText style={styles.transitName}>MRT</ThemeText>
            </View>
        );
    }

    function iconAndTime(icon, time) {
        return (
            <View style={styles.iconAndTime}>
                <WalkIcon style={styles.icon} />
                <ThemedText style={styles.subTimeText}>11 min</ThemedText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ThemedText style={styles.arrivedTime}>Arrive by 16:02</ThemedText>
            <View style={styles.subContainer}>
                <View style={styles.iconBlock}>
                    <View styles={styles.icon} />
                    <ThemedText>Taxi</ThemedText>
                </View>
                <View style={styles.detailBlock}>
                    <ThemedText style={styles.timeText}>24 min</ThemedText>
                    <ThemedText styles={styles.detailText}>63 THB</ThemedText>
                </View>
            </View>
        </View>
    );
}
