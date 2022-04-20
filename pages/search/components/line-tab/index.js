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
import TransitLine from "../../../../components/transit-line";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";

function LineTab(props) {
    const { colors } = useTheme();
    const [nearestStation, setNearestStation] = useState({ en: null, th: null });
    const [nearestDistance, setNearestDistance] = useState(null);
    const [nearestId, setNearestId] = useState("");

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
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1); // deg2rad below

        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }

    function getDistanceText(d) {
        d = parseFloat(d);
        let result = "";
        if (d >= 1) {
            //result = d + " km";
            result = round(d * 10, 1) / 10 + " km";
        } else {
            result = round(d * 100, 1) * 10 + " m";
        }

        return result;
    }

    function findShortestRoute() {
        let data = props.stationData || [];
        let nearStation = {};
        let nearDistance = null;
        let nearestId = "";

        for (let i = 0; i < data.length; i++) {
            let thisDistance = getDistanceFromLatLonInm(
                props.currentLocation.latitude,
                props.currentLocation.longitude,
                data[i].coordinates.lat,
                data[i].coordinates.lng,
            );
            if (thisDistance < nearDistance || i === 0) {
                nearDistance = thisDistance;
                nearStation = data[i].name;
                nearestId = data[i].id;
            }
        }

        setNearestDistance(nearDistance);
        setNearestStation(nearStation);
        setNearestId(nearestId);
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 84,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 15,
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
            width: 24,
            height: 24,
            borderRadius: 6,
            backgroundColor: colors.text,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8,
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
            {props.loading ? (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.dataContainer}>
                            <SvgAnimatedLinearGradient
                                width={200}
                                height={24}
                                primaryColor={colors.linear_gradient_primary}
                                secondaryColor={colors.linear_gradient_secondary}
                            ></SvgAnimatedLinearGradient>
                        </View>
                        <SvgAnimatedLinearGradient
                            width={50}
                            height={24}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        ></SvgAnimatedLinearGradient>
                    </View>
                    <View style={styles.bottomContainer}>
                        <SvgAnimatedLinearGradient
                            width={180}
                            height={16}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        ></SvgAnimatedLinearGradient>
                    </View>
                </View>
            ) : (
                <TouchableOpacity style={styles.container} onPress={() => props.onPress(nearestId)}>
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
                            <TransitLine
                                line={{
                                    name: {
                                        short_name: props.route_name.short_name,
                                        long_name: props.route_name.long_name,
                                    },
                                    color: props.color,
                                }}
                                fontSize={16}
                            />
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
            )}
        </>
    );
}

export default LineTab;
