import React, { useEffect, useState } from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet, Animated } from "react-native";
import { useTheme } from "@react-navigation/native";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import PlaceIcon19 from "../../../../assets/svgs/place-icon-19px";
import WalkIcon from "../../../../assets/svgs/walk-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";
import TransitLine from "../../../../components/transit-line";
import ExpandDownIcon18px from "../../../../assets/svgs/expand-down-icon-18px";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MockupData, getRouteTypeString, snapToPolyline } from "../../../../configs/configs";
import TramIcon from "../../../../assets/svgs/tram-icon";
import BoatIcon from "../../../../assets/svgs/boat-icon";
import RailIcon from "../../../../assets/svgs/rail-icon";
import BusIcon from "../../../../assets/svgs/bus-icon";

export default function RouteShowDetails(props) {
    const { colors } = useTheme();
    const rotateIcon = new Animated.Value(0);

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: props.containerPadding,
            justifyContent: "flex-start",
            paddingTop: 10,
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
            paddingTop: 3,
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
        firstlineColor: { width: 6, height: 41.5, marginVertical: -4, zIndex: 1 },
        originDestnaionText: {
            fontWeight: "600",
            fontSize: 14,
        },
        stopDetailButton: {
            flexDirection: "row",
            paddingVertical: 5,
        },
        subStationText: {
            fontWeight: "600",
            fontSize: 14,
            color: colors.subtitle,
            paddingBottom: 4,
        },
    });

    function onPressRotate() {
        Animated.timing(clickToExpandIconRotation, {
            toValue: 1,
            duration: 1000,
        }).start();
    }

    const clickToExpandIconRotation = rotateIcon.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    function getTimeText(gettime) {
        let time = gettime;
        let day = 0;
        let hour = 0;
        let minute = 0;
        let textData = "";
        if (time >= 1440) {
            day = Math.floor(time / 1440);
            time = time % 1440;
            textData += day + " day ";
        }
        if (time >= 60) {
            hour = Math.floor(time / 60);
            time = time % 60;
            textData += hour + " hr ";
        }
        if (time > 0) {
            minute = Math.floor(time);
            textData += minute + " minutes";
        }

        return textData;
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

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    function getTotalDistanceOfRoute(polyline) {
        if (!polyline) return;

        let totalDistance = 0;

        for (let i = 0; i < polyline.length - 1; i++) {
            totalDistance += getDistanceFromLatLonInKm(
                polyline[i].latitude,
                polyline[i].longitude,
                polyline[i + 1].latitude,
                polyline[i + 1].longitude,
            );
        }

        return totalDistance;
    }

    function getDistanceText(distance) {
        if (distance >= 1) {
            return Math.round(distance * 10) / 10 + " km";
        } else {
            return Math.round(distance * 100) * 10 + " m";
        }
    }

    function WalkTab(subprops) {
        return (
            <View style={styles.tabContainer}>
                <View style={styles.iconTabContainer}>
                    <WalkIcon fill={colors.text} />
                    <ThreeDots />
                </View>
                <View style={styles.textTabContainer}>
                    {subprops.walkData.type === "transfer" && (
                        <ThemedText style={styles.titleText}>
                            Transfer from {subprops.walkData.from.station.name.en} to{" "}
                            {subprops.walkData.to.station.name.en}
                        </ThemedText>
                    )}
                    {subprops.walkData.type === "walk" && (
                        <ThemedText style={styles.titleText}>
                            {"Walk along "}
                            {subprops.walkData.route.summary}
                        </ThemedText>
                    )}

                    <ThemedText style={styles.subtitleText}>
                        {subprops.walkData.type === "walk" && subprops.walkData.route.distance.text}
                        {subprops.walkData.type === "transfer" && (
                            <>
                                {props.polyline !== undefined &&
                                props.polyline !== null &&
                                props.polyline.length !== 0 &&
                                subprops.datakey !== undefined &&
                                subprops.datakey !== null ? (
                                    getDistanceText(
                                        getTotalDistanceOfRoute(
                                            props.polyline[subprops.datakey]
                                                ? props.polyline[subprops.datakey].polyline
                                                : undefined,
                                        ),
                                    )
                                ) : (
                                    <ThemedText>Hello</ThemedText>
                                )}
                            </>
                        )}
                        {" · "}
                        {getTimeText(subprops.walkData.schedule.duration / 60)}
                    </ThemedText>
                </View>
            </View>
        );
    }
    function PublicTransitTab(subprops) {
        return (
            <>
                <View style={styles.tabContainer}>
                    <View style={styles.iconTabContainer}>
                        {(() => {
                            if (
                                subprops.transitData.via_line.type === "0" ||
                                subprops.transitData.via_line.type === "5"
                            ) {
                                return <TramIcon fill={colors.text} />;
                            } else if (subprops.transitData.via_line.type === "1") {
                                return <SubwayIcon fill={colors.text} />;
                            } else if (
                                subprops.transitData.via_line.type === "2" ||
                                subprops.transitData.via_line.type === "12"
                            ) {
                                return <RailIcon fill={colors.text} />;
                            } else if (
                                subprops.transitData.via_line.type === "3" ||
                                subprops.transitData.via_line.type === "11"
                            ) {
                                return <BusIcon fill={colors.text} />;
                            } else if (subprops.transitData.via_line.type === "4") {
                                return <BoatIcon fill={colors.text} />;
                            }
                        })()}
                    </View>
                    <View style={styles.textTabContainer}>
                        <ThemedText style={styles.titleText}>
                            {"Board "}
                            {getRouteTypeString(subprops.transitData.via_line.type)}
                            {" from "}
                            {subprops.transitData.from.station.name.en}
                            {" to "}
                            {subprops.transitData.to.station.name.en}
                        </ThemedText>
                        <View style={styles.transit}>
                            <TransitLine line={subprops.transitData.via_line} fontSize={14} />
                        </View>
                        <ThemedText style={styles.subtitleText}>
                            To {subprops.transitData.to.station.name.en}
                        </ThemedText>
                    </View>
                </View>
                <PublicTransitRouteTab
                    lineData={subprops.transitData.passing}
                    time={subprops.transitData.schedule.duration}
                    color={subprops.transitData.via_line.color}
                />
                <View style={styles.tabContainer}>
                    <View style={styles.iconTabContainer}>
                        <ThreeDots />
                    </View>
                </View>
            </>
        );
    }

    function PublicTransitRouteTab(subprops) {
        const [isExpandClick, setExpandClick] = useState(false);

        function expandClick() {
            if (isExpandClick == true) {
                setExpandClick(false);
            } else {
                setExpandClick(true);
            }
        }
        return (
            <View style={styles.tabContainer}>
                <View style={[styles.iconTabContainer, { paddingTop: 5.5 }]}>
                    {isExpandClick ? (
                        <>
                            <View style={styles.dotIcon} />
                            <View
                                style={[
                                    styles.firstlineColor,
                                    { backgroundColor: `#${subprops.color}` },
                                ]}
                            />
                            {subprops.lineData.map((item, key) => (
                                <>
                                    {key === 0 || key === subprops.lineData.length - 1 ? (
                                        <></>
                                    ) : (
                                        <>
                                            <View style={styles.dotIcon} />
                                            <View
                                                style={[
                                                    styles.lineColor,
                                                    { backgroundColor: `#${subprops.color}` },
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
                            <View
                                style={[
                                    styles.lineColor,
                                    { backgroundColor: `#${subprops.color}` },
                                ]}
                            />
                            <View style={styles.dotIcon} />
                        </>
                    )}
                </View>
                <View>
                    <ThemedText style={styles.originDestnaionText}>
                        {subprops.lineData[0].station.name.en}
                    </ThemedText>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        {subprops.lineData.length - 1 === 1 ? (
                            <View style={styles.stopDetailButton}>
                                <ThemedText style={styles.subtitleText}>
                                    {subprops.lineData.length - 1}
                                    {" stops · "}
                                    {getTimeText(subprops.time / 60)}
                                </ThemedText>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.stopDetailButton}
                                onPress={() => {
                                    expandClick();
                                }}
                            >
                                <ThemedText style={styles.subtitleText}>
                                    {subprops.lineData.length - 1}
                                    {" stops · "}
                                    {getTimeText(subprops.time / 60)}
                                </ThemedText>
                                <Animated.View
                                    style={[{ transform: [{ rotate: clickToExpandIconRotation }] }]}
                                >
                                    <ExpandDownIcon18px fill={colors.subtitle} />
                                </Animated.View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View>
                        {isExpandClick && (
                            <View>
                                {subprops.lineData.map((item, key) => (
                                    <>
                                        {key === 0 || key === subprops.lineData.length - 1 ? (
                                            <></>
                                        ) : (
                                            <ThemedText style={styles.subStationText}>
                                                {item.station.name.en}
                                            </ThemedText>
                                        )}
                                    </>
                                ))}
                            </View>
                        )}
                    </View>
                    <ThemedText style={styles.originDestnaionText}>
                        {subprops.lineData[subprops.lineData.length - 1].station.name.en}
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
                    <ThemedText style={styles.titleText}>
                        {subprops.destination.station !== undefined &&
                            subprops.destination.station !== null &&
                            subprops.destination.station.name.en}
                        {subprops.destination.place !== undefined &&
                            subprops.destination.place !== null &&
                            subprops.destination.place.name.en}
                    </ThemedText>
                </View>
            </View>
        );
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    {props.data.directions.map((item, key) => (
                        <>
                            {item.type === "board" ? (
                                <PublicTransitTab transitData={item} />
                            ) : (
                                <>
                                    <WalkTab walkData={item} datakey={key} />
                                </>
                            )}
                        </>
                    ))}

                    <DestinationTab destination={props.data.destination} />
                </View>
            </View>
        </>
    );
}
