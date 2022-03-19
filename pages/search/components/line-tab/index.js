import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../../components/themed-text";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import { useTheme } from "@react-navigation/native";
import BusIcon from "../../../../assets/svgs/bus-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";
import TramIcon from "../../../../assets/svgs/tram-icon";
import BoatIcon from "../../../../assets/svgs/boat-icon";
import RailIcon from "../../../../assets/svgs/rail-icon";
import { color } from "react-native-elements/dist/helpers";

function LineTab(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 71,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderBottomColor: colors.divider,
            borderBottomWidth: 1,
        },
        topContainer: {
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        dataContainer: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer: {
            width: 27,
            height: 27,
            borderRadius: 6,
            backgroundColor: colors.text,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        titleContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 21,
            backgroundColor: "#1E4F6F", //use props
            borderRadius: 6,
            paddingLeft: 6,
            paddingRight: 6,
            marginLeft: 6,
        },
        title: {
            fontSize: 14,
            color: colors.text,
        },
        distance: {
            fontSize: 16,
            color: colors.subtitle,
        },
        bottomContainer: {
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        nearestSubtitle: {
            fontSize: 14,
            color: colors.subtitle,
        },
        locationSubtitle: {
            fontSize: 16,
            color: colors.text,
        },
    });

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.topContainer}>
                <View style={styles.dataContainer}>
                    <View style={styles.iconContainer}>
                        {(() => {
                            if (props.type === "0" || props.type === "5") {
                                return <TramIcon />;
                            } else if (item.type === "1") {
                                return <SubwayIcon />;
                            } else if (props.type === "2" || props.type === "12") {
                                return <RailIcon />;
                            } else if (props.type === "3" || props.type === "11") {
                                return <BusIcon />;
                            } else if (item.type === "4") {
                                return <BoatIcon />;
                            } else {
                                return <PlaceIcon fill={colors.background} />;
                            }
                        })()}
                    </View>
                    <View style={styles.titleContainer}>
                        <ThemedText style={styles.title}>{props.route_name}</ThemedText>
                    </View>
                </View>
                <ThemedText style={styles.distance}>{props.distance}</ThemedText>
            </View>
            <View style={styles.bottomContainer}>
                <ThemedText style={styles.nearestSubtitle}>Nearest to you: </ThemedText>
                <ThemedText style={styles.locationSubtitle}>{props.near_station}</ThemedText>
            </View>
        </TouchableOpacity>
    );
}

export default LineTab;
