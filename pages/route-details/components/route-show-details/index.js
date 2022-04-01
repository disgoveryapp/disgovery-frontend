import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";

export default function RouteShowDetails(props) {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: props.containerPadding,
            justifyContent: "flex-start",
            alignItems: "flex-start",
        },
        titleText: {
            fontWeight: "600",
            fontSize: 18,
        },
        subtitleText: {
            fontWeight: "600",
            fontSize: 14,
            color: colors.subtitle,
        },
        subContainer: {},
        tabContainer: {
            flexDirection: "row",
        },
        iconTabContainer: {
            width: 30,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 3,
            marginRight: 5,
        },
    });

    function WalkTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <WalkIcon fill={colors.text} />
                </View>
                <View>
                    <ThemedText style={styles.titleText}>Walk to Bang Sue MRT Station</ThemedText>
                    <ThemedText style={styles.subtitleText}>750 m · 9 minutes</ThemedText>
                </View>
            </View>
        );
    }
    function PublicTransitTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <SubwayIcon fill={colors.text} />
                </View>
                <View>
                    <ThemedText style={styles.titleText}>Depart on a subway</ThemedText>
                </View>
            </View>
        );
    }

    function DestinationTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <PlaceIcon fill={colors.text} />
                </View>

                <View>
                    <ThemedText style={styles.titleText}>Centralworld</ThemedText>
                </View>
            </View>
        );
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <WalkTab />
                    <PublicTransitTab />
                    <DestinationTab />
                </View>
            </View>
        </>
    );
}
