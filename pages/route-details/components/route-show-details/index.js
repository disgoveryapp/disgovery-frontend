import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import PlaceIcon19 from "../../../../assets/svgs/place-icon-19px";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";
import TransitLine from "../../../../components/transit-line";

export default function RouteShowDetails(props) {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: props.containerPadding,
            justifyContent: "flex-start",
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
        transit: {
            paddingVertical: 5,
        },
        subContainer: {},
        tabContainer: {
            flexDirection: "row",
            paddingVertical: 2,
        },
        iconTabContainer: {
            width: 25,
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 3,
            marginRight: 5,
        },
        textTabContainer: {
            flex: 1,
        },
        threeDotIcon: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: colors.text,
        },
        threeDotContainer: {
            height: 18,
            justifyContent: "space-between",
            marginBottom: 5,
        },
        dotIcon: {
            width: 10,
            height: 10,
            backgroundColor: "#ffff",
            borderRadius: 5,
            borderColor: colors.upper_background,
            borderWidth: 1,
        },
        lineColor: {
            width: 6,
            height: "auto",
            flex: 1,
            backgroundColor: "green",
        },
    });

    function ThreeDots() {
        return (
            <View style={styles.threeDotContainer}>
                <View style={styles.threeDotIcon} />
                <View style={styles.threeDotIcon} />
                <View style={styles.threeDotIcon} />
            </View>
        );
    }

    function WalkTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <WalkIcon fill={colors.text} />
                    <ThreeDots />
                </View>
                <View style={styles.textTabContainer}>
                    <ThemedText style={styles.titleText}>
                        Exit the station and enter Mo Chit BTS station via entrance 2
                    </ThemedText>
                    <ThemedText style={styles.subtitleText}>750 m · 9 minutes</ThemedText>
                </View>
            </View>
        );
    }
    function PublicTransitTab(subprops) {
        return (
            <>
                <View style={styles.tabContainer}>
                    <View style={styles.iconTabContainer}>
                        <SubwayIcon fill={colors.text} />
                        <ThreeDots />
                    </View>
                    <View>
                        <ThemedText style={styles.titleText}>Depart on a subway</ThemedText>
                        <View style={styles.transit}>
                            <TransitLine
                                line={{
                                    name: {
                                        short_name: "Insert Props Here",
                                        long_name: "BTS Sukhumvit Line",
                                    },
                                    color: "7FBF3A",
                                }}
                                fontSize={14}
                            />
                        </View>
                        <ThemedText style={styles.subtitleText}>
                            To Tha Phra · Every 5 minutes
                        </ThemedText>
                    </View>
                </View>
                <PublicTransitRouteTab />
            </>
        );
    }

    function PublicTransitRouteTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <View style={styles.dotIcon} />
                    <View style={styles.lineColor} />
                    <View style={styles.dotIcon} />
                </View>
                <View>
                    <ThemedText style={styles.titleText}>Mo Chit</ThemedText>
                    <ThemedText style={styles.subtitleText}>8 stops · 19 minutes</ThemedText>
                    <ThemedText style={styles.titleText}>Chit Lom</ThemedText>
                </View>
            </View>
        );
    }

    function DestinationTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <PlaceIcon19 fill={colors.text} />
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
