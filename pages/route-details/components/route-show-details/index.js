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
            fontWeight: "bold",
            fontSize: 24,
            padding: 12,
        },
        subContainer: {},
        tabContainer: {
            flexDirection: "row",
        },
    });

    function WalkTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View>
                    <WalkIcon fill={colors.text} />
                </View>
                <View>
                    <ThemedText>Walk to Bang Sue MRT Station</ThemedText>
                    <ThemedText>750 m · 9 minutes</ThemedText>
                </View>
            </View>
        );
    }
    function PublicTransitTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View>
                    <SubwayIcon fill={colors.text} />
                </View>
                <View>
                    <ThemedText>Depart on a subway</ThemedText>
                </View>
            </View>
        );
    }

    function DestinationTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View>
                    <PlaceIcon fill={colors.text} />
                </View>

                <View>
                    <ThemedText>Centralworld</ThemedText>
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
