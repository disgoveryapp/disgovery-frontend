import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import TaxiIcon from "../../../../assets/svgs/taxi-icon";
import RailIcon from "../../../../assets/svgs/rail-icon";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import TramIcon from "../../../../assets/svgs/tram-icon";

export default function TravelBlock(props) {
    const { colors } = useTheme();

    const mockUptype = "train";

    const styles = StyleSheet.create({
        container: {
            width: 168,
            height: 53,
            alignContent: "space-between",
            flexDirection: "row",
            backgroundColor: colors.upper_background,
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 14,
            justifyContent: "space-between",
            marginHorizontal: 6,
            marginVertical: 6,
        },
        timeText: {
            fontWeight: "600",
            fontSize: 16,
        },
        detailText: {
            fontSize: 12,
        },
        detailBlock: {
            alignItems: "flex-end",
        },
        iconText: {
            fontSize: 12,
        },
        iconBlock: {},
    });

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.iconBlock}>
                <View styles={styles.icon}>
                    {mockUptype === "taxi" && <TaxiIcon fill={colors.text} />}
                    {mockUptype === "train" && <RailIcon fill={colors.text} />}
                    {mockUptype === "walk" && <WalkIcon fill={colors.text} />}
                </View>
                <ThemedText style={styles.iconText}>Taxi</ThemedText>
            </View>
            <View style={styles.detailBlock}>
                <ThemedText style={styles.timeText}>24 min</ThemedText>
                <ThemedText style={styles.detailText}>63 THB</ThemedText>
            </View>
        </TouchableOpacity>
    );
}
