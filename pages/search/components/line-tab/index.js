import React, { useState, useEffect } from "react";
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
    const [nearestStation, setNearestStation] = useState({ en: null, th: null });
    const [nearestDistance, setNearestDistance] = useState(null);

    useEffect(() => {
        findShortestRoute();
    }, []);
    function round(value, step) {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv);
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    function getDistanceFromLatLonInm(lat1, lon1, lat2, lon2) {
        lat1 = parseFloat(lat1);
        lon1 = parseFloat(lon1);
        lat2 = parseFloat(lat2);
        lon2 = parseFloat(lon2);
        console.log(lat1, "LAT1");
        console.log(lat2, "LAT2");
        console.log(lon1, "LON1");
        console.log(lon2, "LON2");
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1); // deg2rad below
        console.log(dLat, "LAT");

        let dLon = deg2rad(lon2 - lon1);
        console.log(dLon, "LON");
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        console.log(a);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        console.log(d);
        return d;
    }

    function getDistanceText(d) {
        d = parseFloat(d);
        console.log(d);
        let result = "";
        if (d >= 1) {
            result = round(d, 0.1) + " km";
        } else {
            result = round(d * 1000, 50) + " m";
        }

        return result;
    }

    function findShortestRoute() {
        let data = props.stationData || [];
        let nearStation = {};
        let nearDistance = null;

        for (let i = 0; i < data.length; i++) {
            let thisDistance = getDistanceFromLatLonInBtsm(
                props.currentLocation.latitude,
                props.currentLocation.longitude,
                data[i].coordinates.lat,
                data[i].coordinates.lng,
            );
            if (thisDistance < nearDistance || i === 0) {
                nearDistance = thisDistance;
                nearStation = data[i].name;
            }
        }

        setNearestDistance(nearDistance);
        setNearestStation(nearStation);
    }

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
            backgroundColor: props.color ? `#${props.color}` : colors.upper_background, //use props
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
        <>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <View style={styles.topContainer}>
                    <View style={styles.dataContainer}>
                        <View style={styles.iconContainer}>
                            {(() => {
                                if (props.type === "0" || props.type === "5") {
                                    return <TramIcon />;
                                } else if (props.type === "1") {
                                    return <SubwayIcon />;
                                } else if (props.type === "2" || props.type === "12") {
                                    return <RailIcon />;
                                } else if (props.type === "3" || props.type === "11") {
                                    return <BusIcon />;
                                } else if (props.type === "4") {
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
                    <ThemedText style={styles.distance}>
                        {getDistanceText(nearestDistance)}
                    </ThemedText>
                </View>
                <View style={styles.bottomContainer}>
                    <ThemedText style={styles.nearestSubtitle}>Nearest to you: </ThemedText>
                    <ThemedText style={styles.locationSubtitle}>{nearestStation.en}</ThemedText>
                </View>
            </TouchableOpacity>
        </>
    );
}

export default LineTab;
