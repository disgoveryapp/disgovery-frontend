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

function StationTab(props) {
    const { colors } = useTheme();
    const tripname = [];
    const triptype = [];
    const tripdata = props.trip;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 71,
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
            maxWidth: 300,
            fontWeight: "600",
            fontSize: 18,
            marginLeft: 15,
            color: colors.text,
        },
        subtitle: {
            maxWidth: 300,
            fontWeight: "500",
            fontSize: 14,
            marginLeft: 15,
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
                                                                if (item.type === "3") {
                                                                    return <BusIcon />;
                                                                } else if (item.type === "0") {
                                                                    return <SubwayIcon />;
                                                                } else {
                                                                    return (
                                                                        <PlaceIcon
                                                                            fill={colors.background}
                                                                        />
                                                                    );
                                                                }
                                                            })()}
                                                        </View>
                                                        <View>
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
                                                                                        <TransportName
                                                                                            key={
                                                                                                key
                                                                                            }
                                                                                            color={
                                                                                                item2.color
                                                                                            }
                                                                                            name={
                                                                                                item2
                                                                                                    .route_name
                                                                                                    .long_name
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                }
                                                                            })()}
                                                                        </>
                                                                    ))}
                                                                </>
                                                            </ThemedText>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={props.onPress}>
                                                        <InfoIcon />
                                                    </TouchableOpacity>
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
