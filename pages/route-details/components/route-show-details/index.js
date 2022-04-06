import React, { useState } from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import PlaceIcon19 from "../../../../assets/svgs/place-icon-19px";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";
import TransitLine from "../../../../components/transit-line";
import ExpandDownIcon18px from "../../../../assets/svgs/expand-down-icon-18px";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MockupData } from "../../../../configs/configs";

export default function RouteShowDetails(props) {
    const { colors } = useTheme();
    const [isExpandClick, setExpandClick] = useState(false);
    const mockStation = ["Mochit", "Siam", "Samyan", "Suan Amphorn", "Chit Lom"];

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
            borderColor: "#444444",
            borderWidth: 1,
            zIndex: 2,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        lineColor: {
            width: 6,
            height: "auto",
            flex: 1,
            marginVertical: -4,
            zIndex: 1,
        },
        firstlineColor: { width: 6, height: 37.5, marginVertical: -4, zIndex: 1 },
        originDestnaionText: {
            fontWeight: "600",
            fontSize: 14,
        },
        stopDetailButton: {
            flexDirection: "row",
            paddingVertical: 3,
        },
    });

    function expandClick() {
        if (isExpandClick == true) {
            setExpandClick(false);
        } else {
            setExpandClick(true);
        }
    }

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
                <View style={styles.tabContainer}>
                    <View style={styles.iconTabContainer}>
                        <ThreeDots />
                    </View>
                </View>
            </>
        );
    }

    function PublicTransitRouteTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={[styles.iconTabContainer, { paddingTop: 5.5 }]}>
                    {isExpandClick ? (
                        <>
                            <View style={styles.dotIcon} />
                            <View style={[styles.firstlineColor, { backgroundColor: "#7FBF3A" }]} />
                            {mockStation.map((item, key) => (
                                <>
                                    {key === 0 || key === mockStation.length - 1 ? (
                                        <></>
                                    ) : (
                                        <>
                                            <View style={styles.dotIcon} />
                                            <View
                                                style={[
                                                    styles.lineColor,
                                                    { backgroundColor: "#7FBF3A" },
                                                ]}
                                            />
                                        </>
                                    )}
                                </>
                            ))}
                            <View style={styles.dotIcon} />
                        </>
                    ) : (
                        <>
                            <View style={styles.dotIcon} />
                            <View style={[styles.lineColor, { backgroundColor: "#7FBF3A" }]} />
                            <View style={styles.dotIcon} />
                        </>
                    )}
                </View>
                <View>
                    <ThemedText style={styles.originDestnaionText}>{mockStation[0]}</ThemedText>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <TouchableOpacity style={styles.stopDetailButton} onPress={expandClick}>
                            <ThemedText style={styles.subtitleText}>
                                8 stops · 19 minutes
                            </ThemedText>

                            <ExpandDownIcon18px fill={colors.subtitle} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {isExpandClick ? (
                            <View>
                                {mockStation.map((item, key) => (
                                    <>
                                        {key === 0 || key === mockStation.length - 1 ? (
                                            <></>
                                        ) : (
                                            <ThemedText style={styles.subtitleText}>
                                                {item}
                                            </ThemedText>
                                        )}
                                    </>
                                ))}
                            </View>
                        ) : (
                            <></>
                        )}
                    </View>
                    <ThemedText style={styles.originDestnaionText}>
                        {mockStation[mockStation.length - 1]}
                    </ThemedText>
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
