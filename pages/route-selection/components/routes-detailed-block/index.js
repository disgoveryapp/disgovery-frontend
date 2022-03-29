import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import SubwayIcon10 from "../../../../assets/svgs/subway-icon-10px";

export default function RoutesDetailedBlock() {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            width: 350,
            height: "auto",
            borderRadius: 12,
            backgroundColor: colors.upper_background,
            paddingHorizontal: 12,
            paddingVertical: 11,
            justifyContent: "space-between",
        },
        arrivedTime: {
            fontWeight: "500",
            fontSize: 12,
        },
        subContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 5,
        },
        detailBlock: {
            alignItems: "flex-end",
            justifyContent: "center",
        },
        subTimeText: {
            fontSize: 11,
        },
        timeText: {
            fontSize: 16,
            fontWeight: "600",
        },
        iconAndTime: {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
        },
        iconBlock: {
            maxWidth: 270,
            flexDirection: "row",
            flexWrap: "wrap",
        },
        detailText: {
            fontSize: 12,
            fontWeight: "600",
        },
        CompactTransitLineContainer: {
            width: 36,
            height: 16,
            borderRadius: 6,
            flexDirection: "row",
            backgroundColor: "green",
            paddingHorizontal: 3,
            justifyContent: "space-between",
            alignItems: "center",
        },
        transitIcon: {},
        transitName: {
            fontSize: 10,
        },
    });

    function CompactTransitLine(type, name) {
        return (
            <View style={styles.CompactTransitLineContainer}>
                <View style={styles.transitIcon}>
                    <SubwayIcon10 fill={colors.text} />
                </View>
                <ThemedText style={styles.transitName}>MRT</ThemedText>
            </View>
        );
    }

    function IconAndTime(icon, time) {
        return (
            <View style={styles.iconAndTime}>
                <View styles={styles.icon}>
                    <CompactTransitLine />
                </View>
                <ThemedText style={styles.subTimeText}>11 min</ThemedText>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container}>
            <ThemedText style={styles.arrivedTime}>Arrive by 16:02</ThemedText>
            <View style={styles.subContainer}>
                <View style={styles.iconBlock}>
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                    <IconAndTime />
                </View>
                <View style={styles.detailBlock}>
                    <ThemedText style={styles.timeText}>24 min</ThemedText>
                    <ThemedText styles={styles.detailText}>63 THB</ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
}
//<WalkIcon />
