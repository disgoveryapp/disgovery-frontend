import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../../components/themed-text";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import InfoIcon from "../../../../assets/svgs/info-icon";
import BusIcon from "../../../../assets/svgs/bus-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";
import { useTheme } from "@react-navigation/native";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";
import TransportName from "../../../../components/transport-name";
import TramIcon from "../../../../assets/svgs/tram-icon";
import BoatIcon from "../../../../assets/svgs/boat-icon";
import RailIcon from "../../../../assets/svgs/rail-icon";
import TransitLine from "../../../../components/transit-line";

function StationTab(props) {
    const { colors } = useTheme();
    const tripname = [];
    const triptype = [];
    const tripdata = props.trip;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 71,
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
        },
        placeholderContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        title: {
            fontWeight: "600",
            fontSize: 18,
            color: colors.text,
        },
        subtitle: {
            fontWeight: "500",
            fontSize: 14,
            color: colors.subtitle,
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
        subcontainer: {
            width: "100%",
            height: 71,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
        },
        textcontainer: {
            flex: 1,
            paddingLeft: 15,
        },
        transportnamecontainer: {
            paddingTop: 7,
            paddingRight: 7,
        },
        transportnamesubcontainer: {},
    });

    return (
        <>
            {tripdata !== undefined && tripdata !== null ? (
                <>
                    {tripdata.map((item, key) => (
                        <View key={key}>
                            {(() => {
                                if (!triptype.includes(item.type)) {
                                    triptype.push(item.type);
                                    return (
                                        <>
                                            <View style={styles.container}>
                                                <TouchableOpacity
                                                    style={styles.subcontainer}
                                                    onPress={props.onPress}
                                                >
                                                    <View style={styles.placeholderContainer}>
                                                        <View style={styles.iconContainer}>
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
                                                        </View>
                                                        <View style={styles.textcontainer}>
                                                            <ThemedTextMarquee style={styles.title}>
                                                                {props.place}
                                                            </ThemedTextMarquee>
                                                            <ThemedText
                                                                style={styles.subtitle}
                                                                numberOfLines={1}
                                                            >
                                                                <>
                                                                    {tripdata.map((item2, key) => (
                                                                        <>
                                                                            {(() => {
                                                                                if (
                                                                                    !tripname.includes(
                                                                                        item2
                                                                                            .route_name
                                                                                            .long_name,
                                                                                    ) &&
                                                                                    item.type ===
                                                                                        item2.type
                                                                                ) {
                                                                                    tripname.push(
                                                                                        item2
                                                                                            .route_name
                                                                                            .long_name,
                                                                                    );
                                                                                    return (
                                                                                        <View
                                                                                            style={
                                                                                                styles.transportnamecontainer
                                                                                            }
                                                                                        >
                                                                                            <TransitLine
                                                                                                key={
                                                                                                    key
                                                                                                }
                                                                                                line={{
                                                                                                    id: item2.route_id,
                                                                                                    name: {
                                                                                                        short_name:
                                                                                                            item2
                                                                                                                .route_name
                                                                                                                .short_name,
                                                                                                        long_name:
                                                                                                            item2
                                                                                                                .route_name
                                                                                                                .long_name,
                                                                                                    },
                                                                                                    color: item2.color,
                                                                                                }}
                                                                                                style={
                                                                                                    styles.transportnamesubcontainer
                                                                                                }
                                                                                                fontSize={
                                                                                                    14
                                                                                                }
                                                                                            />
                                                                                        </View>
                                                                                    );
                                                                                }
                                                                            })()}
                                                                        </>
                                                                    ))}
                                                                </>
                                                            </ThemedText>
                                                        </View>
                                                        <TouchableOpacity onPress={props.onPress}>
                                                            <InfoIcon />
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    );
                                }
                            })()}
                        </View>
                    ))}
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default StationTab;
