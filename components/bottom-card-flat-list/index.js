import React, { useState, useEffect } from "react";
import { TouchableOpacity, SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import ThemedText from "../themed-text";
import BusIcon from "../../assets/svgs/bus-icon";
import SubwayIcon from "../../assets/svgs/subway-icon";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { BOTTOM_CARD_CONTENT_PADDING } from "../bottom-card";
import TransitLine from "../transit-line";
import OriginToDestinationTitle from "../origin-to-destination-title";
import ExpandDownIcon from "../../assets/svgs/expand-down-icon";
import TramIcon from "../../assets/svgs/tram-icon";
import RailIcon from "../../assets/svgs/rail-icon";
import BoatIcon from "../../assets/svgs/boat-icon";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function BottomCardFlatList(props) {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [nearbyTrips, setNearbyTrips] = useState({});
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        formatNearbyTrips();
    }, [props.nearbyStations]);

    function formatNearbyTrips() {
        if (!props.nearbyStations) return;

        let tempNearbyTrips = {};
        let tempExpanded = {};

        Object.keys(props.nearbyStations).map((key) => {
            if (props.nearbyStations[key].lines.length !== 0) {
                if (tempNearbyTrips[props.nearbyStations[key].lines[0].trip_id]) {
                    tempNearbyTrips[props.nearbyStations[key].lines[0].trip_id].origins = [
                        ...tempNearbyTrips[props.nearbyStations[key].lines[0].trip_id].origins,
                        {
                            name: props.nearbyStations[key].name.en,
                            id: props.nearbyStations[key].id,
                            code: props.nearbyStations[key].code,
                            distance: props.nearbyStations[key].distance,
                            arriving_in: props.nearbyStations[key].lines[0].arriving_in,
                            headsign: props.nearbyStations[key].lines[0].headsign,
                            coordinates: props.nearbyStations[key].coordinates,
                        },
                    ];

                    tempExpanded[props.nearbyStations[key].lines[0].trip_id] = false;
                } else {
                    tempNearbyTrips[props.nearbyStations[key].lines[0].trip_id] = {
                        trip_id: props.nearbyStations[key].lines[0].trip_id,
                        route_name: props.nearbyStations[key].lines[0].route_name,
                        route_color: props.nearbyStations[key].lines[0].route_color,
                        route_type: props.nearbyStations[key].lines[0].route_type,
                        origins: [
                            {
                                name: props.nearbyStations[key].name.en,
                                id: props.nearbyStations[key].id,
                                code: props.nearbyStations[key].code,
                                distance: props.nearbyStations[key].distance,
                                arriving_in: props.nearbyStations[key].lines[0].arriving_in,
                                headsign: props.nearbyStations[key].lines[0].headsign,
                                coordinates: props.nearbyStations[key].coordinates,
                            },
                        ],
                        destination: {
                            name: props.nearbyStations[key].lines[0].destination.name.en,
                            code: props.nearbyStations[key].lines[0].destination.code,
                            id: props.nearbyStations[key].lines[0].destination.id,
                        },
                    };
                }
            }
        });

        setNearbyTrips(tempNearbyTrips);
        setExpanded(tempExpanded);
    }

    function navigateToTripDetails(trip_id, origin_id) {
        navigation.navigate("TripDetails", {
            origin_id: origin_id,
            trip_id: trip_id,
        });
    }

    const renderItem = (item, renderDivider) => {
        if (item.origins.length > 0) {
            return (
                <>
                    <Item
                        trip_id={item.trip_id}
                        origin_id={item.origins[0].id}
                        origin_name={item.origins[0].name}
                        destination_name={item.destination.name}
                        arriving_in={item.origins[0].arriving_in}
                        line_name={item.route_name}
                        distance={item.origins[0].distance}
                        color={`#${item.route_color}`}
                        otherOrigins={item.origins.slice(1)}
                        route_type={item.route_type}
                    />
                    {renderDivider && <ItemDivider />}
                </>
            );
        } else return <></>;
    };

    const ItemDivider = () => {
        return <View style={styles.divider} />;
    };

    const OtherOrigins = ({ otherOrigins, trip_id }) => {
        return (
            <>
                <View style={{ display: "flex", alignItems: "flex-start" }}>
                    <ScrollView
                        style={{ width: SCREEN_WIDTH }}
                        horizontal
                        contentContainerStyle={{ marginLeft: 20, paddingRight: 20 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.otherOriginsContainer}>
                            {Object.keys(otherOrigins).map((key) => (
                                <>
                                    <TouchableOpacity
                                        style={styles.otherOriginContainer}
                                        onPress={() =>
                                            navigateToTripDetails(trip_id, otherOrigins[key].id)
                                        }
                                    >
                                        <ThemedText style={styles.otherOriginName}>
                                            {otherOrigins[key].name}
                                        </ThemedText>
                                        <ThemedText style={styles.otherOriginData}>
                                            {Math.round(otherOrigins[key].arriving_in / 60) === 0
                                                ? "now"
                                                : `next in ${Math.round(
                                                      otherOrigins[key].arriving_in / 60,
                                                  )} ${
                                                      Math.round(
                                                          otherOrigins[key].arriving_in / 60,
                                                      ) !== 1
                                                          ? "mins"
                                                          : "min"
                                                  }`}{" "}
                                            {/* ·{" "} */}
                                            {/* {Math.round((otherOrigins[key].distance / 1000) * 10) /
                                                10}{" "}
                                            km */}
                                        </ThemedText>
                                    </TouchableOpacity>
                                </>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    };

    const Item = ({
        destination_name,
        arriving_in,
        color,
        origin_id,
        trip_id,
        origin_name,
        line_name,
        otherOrigins,
        distance,
        route_type,
    }) => (
        <>
            <View style={styles.lower_container}>
                <TouchableOpacity onPress={() => navigateToTripDetails(trip_id, origin_id)}>
                    <View style={styles.firstLine}>
                        <View style={styles.firstLineLeft}>
                            {(() => {
                                if (route_type === "0" || route_type === "5") {
                                    return (
                                        <View style={styles.routeTypeIcon}>
                                            <TramIcon fill={colors.background} />
                                        </View>
                                    );
                                } else if (route_type === "1") {
                                    return (
                                        <View style={styles.routeTypeIcon}>
                                            <SubwayIcon fill={colors.background} />
                                        </View>
                                    );
                                } else if (route_type === "2" || route_type === "12") {
                                    return (
                                        <View style={styles.routeTypeIcon}>
                                            <RailIcon fill={colors.background} />
                                        </View>
                                    );
                                } else if (route_type === "3" || route_type === "11") {
                                    return (
                                        <View style={styles.routeTypeIcon}>
                                            <BusIcon fill={colors.background} />
                                        </View>
                                    );
                                } else if (route_type === "4") {
                                    return (
                                        <View style={styles.routeTypeIcon}>
                                            <BoatIcon fill={colors.background} />
                                        </View>
                                    );
                                } else {
                                    return <></>;
                                }
                            })()}

                            <TransitLine
                                style={styles.transitLine}
                                line={{ name: line_name, color: color.replace("#", "") }}
                            />

                            <ThemedText style={styles.firstLineText}>
                                {" "}
                                ·{" "}
                                {Math.round(arriving_in / 60) === 0
                                    ? "now"
                                    : `next in ${Math.round(arriving_in / 60)} ${
                                          Math.round(arriving_in / 60) !== 1 ? "mins" : "min"
                                      }`}{" "}
                                {/* · {Math.round((distance / 1000) * 10) / 10} km */}
                            </ThemedText>
                        </View>

                        {otherOrigins.length !== 0 && (
                            <TouchableOpacity
                                style={styles.expandDownIconContainer}
                                onPress={() => {
                                    let tempExpanded = expanded;

                                    tempExpanded[trip_id] = !tempExpanded[trip_id];

                                    setExpanded({ ...tempExpanded });
                                }}
                            >
                                <ExpandDownIcon
                                    style={{
                                        transform: [
                                            { rotate: expanded[trip_id] ? "180deg" : "0deg" },
                                        ],
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.originToDestinationTitle}>
                        <OriginToDestinationTitle
                            origin={origin_name}
                            destination={destination_name}
                            size="small"
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {otherOrigins.length >= 1 && expanded[trip_id] && (
                <>
                    <View style={styles.otherOriginsTitleContainer}>
                        <ThemedText style={styles.otherOriginsTitle}>From other origins</ThemedText>
                    </View>
                    <OtherOrigins otherOrigins={otherOrigins} trip_id={trip_id} />
                </>
            )}
        </>
    );

    const styles = StyleSheet.create({
        lower_container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
        destination: {
            flex: 1,
            justifyContent: "center",
            marginLeft: 5,
            fontWeight: "600",
        },
        transport: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: colors.flatlist_transport,
            width: 92,
            height: 44,
            borderRadius: 12,
            paddingTop: 4,
        },
        icon: {
            width: 25,
            height: 25,
            marginLeft: 4,
            marginTop: 8,
            marginBottom: 6,
        },
        MLineicon: {
            width: 25,
            height: 25,
            marginLeft: 0,
            marginTop: 4,
            marginBottom: 3,
        },
        RedLineicon: {
            width: 25,
            height: 25,
            marginLeft: 0,
            marginTop: 3,
            marginBottom: 2,
        },
        Shipicon: {
            width: 25,
            height: 25,
            marginLeft: 0,
            marginTop: 0,
            marginBottom: 2,
        },
        Subwayicon: {
            width: 25,
            height: 25,
            marginLeft: 4,
            marginTop: 0,
            marginBottom: 2,
        },
        linecont: {
            display: "flex",
            flexDirection: "row",
            flex: 1,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
        },
        line_short: {
            marginTop: 2,
            fontSize: 23,
            color: "black",
            textAlign: "center",
        },
        line_middle: {
            textAlignVertical: "center",
            marginTop: 4,
            fontSize: 10,
            color: "black",
            textAlign: "center",
        },
        line_long: {
            fontSize: 12,
            color: "black",
            textAlign: "center",
            width: "70%",
        },
        line_longer: {
            fontSize: 9,
            color: "black",
            textAlign: "center",
            width: "70%",
        },
        line: {
            color: "black",
            textAlign: "right",
            width: "60%",
            marginTop: 2,
            fontSize: 25,
            color: colors.flatlist_line,
        },
        arrow: {
            marginLeft: 5,
            marginRight: 5,
        },
        name: {
            fontSize: 20,
            color: colors.text,
        },
        timeSection: {
            alignItems: "flex-end",
        },
        time: {
            fontSize: 20,
            textAlign: "right",
            color: colors.text,
        },
        divider: {
            height: 1,
            backgroundColor: colors.divider,
        },
        iconContainer: {
            width: "30%",
        },
        transitLine: {
            marginRight: 3,
        },
        firstLine: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            justifyContent: "space-between",
            height: 30,
        },
        firstLineText: {
            fontSize: 16,
            color: colors.subtitle,
        },
        firstLineLeft: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        expandDownIconContainer: {
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        originToDestinationTitle: {
            width: "100%",
            marginTop: 7,
            marginBottom: 5,
        },
        otherOriginsTitleContainer: {
            marginHorizontal: 20,
        },
        otherOriginsTitle: {
            fontSize: 16,
            color: colors.subtitle,
            fontWeight: "600",
        },
        otherOriginsContainer: {
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 15,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 4.27,

            elevation: 10,
        },
        otherOriginContainer: {
            width: "auto",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 6,
            backgroundColor: colors.upper_background,
            marginRight: 10,
        },
        otherOriginName: {
            fontSize: 18,
            fontWeight: "600",
        },
        otherOriginData: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.subtitle,
        },
        routeTypeIcon: {
            width: 24,
            height: 24,
            backgroundColor: colors.text,
            borderRadius: 6,
            marginRight: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    });

    return (
        <SafeAreaView style={{ width: "100%" }}>
            {!props.loading && (
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 15,
                        paddingBottom: BOTTOM_CARD_CONTENT_PADDING,
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    {Object.keys(nearbyTrips).map((key) => {
                        return (
                            <>
                                {renderItem(
                                    nearbyTrips[key],
                                    nearbyTrips[key] !== nearbyTrips[nearbyTrips.length - 1],
                                )}
                            </>
                        );
                    })}
                </ScrollView>
            )}

            {props.loading && (
                <>
                    <View style={{ marginTop: 35, marginHorizontal: 15 }}>
                        <SvgAnimatedLinearGradient
                            width={0.8 * SCREEN_WIDTH}
                            height={20}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        />

                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 10 }}
                            width={0.4 * SCREEN_WIDTH}
                            height={26}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        />

                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 10 }}
                            width={0.5 * SCREEN_WIDTH}
                            height={20}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        />

                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 40 }}
                            width={0.8 * SCREEN_WIDTH}
                            height={20}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        />

                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 10 }}
                            width={0.4 * SCREEN_WIDTH}
                            height={26}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        />

                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 10 }}
                            width={0.5 * SCREEN_WIDTH}
                            height={20}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}
