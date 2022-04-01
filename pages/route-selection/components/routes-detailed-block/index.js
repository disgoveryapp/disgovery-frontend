import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import SubwayIcon10 from "../../../../assets/svgs/subway-icon-10px";
import TramIcon10 from "../../../../assets/svgs/tram-icon-10px";
import RailIcon10 from "../../../../assets/svgs/rail-icon-10px";
import BusIcon10 from "../../../../assets/svgs/bus-icon-10px";
import BoatIcon10 from "../../../../assets/svgs/bus-icon-10px";

export default function RoutesDetailedBlock(props) {
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
            justifyContent: "flex-start",
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

    function CompactTransitLine(subprops) {
        return (
            <View style={styles.CompactTransitLineContainer}>
                <View style={styles.transitIcon}>
                    {(subprops.type === "0" || subprops.type === "5") && (
                        <TramIcon10 fill={colors.text} />
                    )}
                    {subprops.type === "1" && <SubwayIcon10 fill={colors.text} />}
                    {(subprops.type === "2" || subprops.type === "12") && (
                        <RailIcon10 fill={colors.text} />
                    )}
                    {(subprops.type === "3" || subprops.type === "11") && (
                        <BusIcon10 fill={colors.text} />
                    )}
                    {subprops.type === "4" && <BoatIcon10 fill={colors.text} />}
                </View>
                <ThemedText style={styles.transitName}>{subprops.name}</ThemedText>
            </View>
        );
    }

    function IconAndTime(subprops) {
        return (
            <View style={styles.iconAndTime}>
                <View styles={styles.icon}>
                    {subprops.icon === "walk" ? (
                        <WalkIcon fill={colors.text} />
                    ) : (
                        <CompactTransitLine fill={colors.text} type="1" name="BTS" />
                    )}
                </View>
                <ThemedText style={styles.subTimeText}>{subprops.time} min</ThemedText>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container}>
            <ThemedText style={styles.arrivedTime}>Arrive by 16:02</ThemedText>
            <View style={styles.subContainer}>
                <View style={styles.iconBlock}>
                    <IconAndTime time="11" />
                    <IconAndTime icon="walk" time="11" />
                    <IconAndTime time="11" />
                    <IconAndTime time="11" />
                    <IconAndTime time="11" />
                </View>
                <View style={styles.detailBlock}>
                    <ThemedText style={styles.timeText}>24 min</ThemedText>
                    <ThemedText styles={styles.detailText}>63 THB</ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
}
/*
{(() => {
                                                                if (
                                                                    item.type === "0" ||
                                                                    item.type === "5"
                                                                ) {
                                                                    return <TramIcon />;
                                                                } else if (item.type === "1") {
                                                                    return <SubwayIcon />;
                                                                } else if (
                                                                    item.type === "2" ||
                                                                    item.type === "12"
                                                                ) {
                                                                    return <RailIcon />;
                                                                } else if (
                                                                    item.type === "3" ||
                                                                    item.type === "11"
                                                                ) {
                                                                    return <BusIcon />;
                                                                } else if (item.type === "4") {
                                                                    return <BoatIcon />;
                                                                } else {
                                                                    return (
                                                                        <PlaceIcon
                                                                            fill={colors.background}
                                                                        />
                                                                    );
                                                                }
                                                            })()}
                                                            */
