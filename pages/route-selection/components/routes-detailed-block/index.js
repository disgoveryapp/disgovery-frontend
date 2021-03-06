import React, { useState, useEffect } from "react";
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

    const totalFare = props.routeData.total_fares.adult || 0;
    const currency = props.routeData.total_fares.currency || "THB";
    const arrivingTime = new Date(
        props.routeData.schedule.arriving_at || "1970-01-01T16:00:00+00:00",
    );
    const [timeText, setTimeText] = useState("");

    useEffect(() => {
        setTimeText(getTimeText(Math.round(props.routeData.schedule.duration / 60) || 0));
    }, []);

    function getTimeText(gettime) {
        let time = gettime;
        let day = 0;
        let hour = 0;
        let minute = 0;
        let textData = "";

        if (time >= 1440) {
            day = Math.floor(time / 1440);
            time = time % 1440;
            textData += day + " d ";
        }
        if (time >= 60) {
            hour = Math.floor(time / 60);
            time = time % 60;
            textData += hour + " hr ";
        }
        if (time >= 0) {
            minute = time;
            textData += minute + " min";
        }

        return textData;
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "auto",
            borderRadius: 12,
            backgroundColor: colors.upper_background,
            paddingHorizontal: 15,
            paddingVertical: 14,
            justifyContent: "space-between",

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        arrivedTime: {
            fontWeight: "600",
            fontSize: 14,
        },
        subContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        detailBlock: {
            alignItems: "flex-end",
            justifyContent: "flex-end",
        },
        subTimeText: {
            fontSize: 12,
        },
        timeText: {
            fontSize: 18,
            color: colors.primary,
            fontWeight: "600",
        },
        iconAndTime: {
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: 4,
        },
        iconBlock: {
            maxWidth: 225,
            flexDirection: "row",
            flexWrap: "wrap",
        },
        detailText: {
            fontSize: 14,
            fontWeight: "600",
        },
        CompactTransitLineContainer: {
            borderRadius: 6,
            flexDirection: "row",
            paddingHorizontal: 4,
            paddingVertical: 2,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 2,
        },
        transitIcon: {},
        transitName: {
            fontSize: 12,
            marginLeft: 2,
            fontWeight: "600",
            color: colors.white,
        },
    });

    function CompactTransitLine(subprops) {
        return (
            <View
                style={[
                    styles.CompactTransitLineContainer,
                    { backgroundColor: `#${subprops.color}` },
                ]}
            >
                <View style={styles.transitIcon}>
                    {(subprops.type === "0" || subprops.type === "5") && (
                        <TramIcon10 fill={colors.white} />
                    )}
                    {subprops.type === "1" && <SubwayIcon10 fill={colors.white} />}
                    {(subprops.type === "2" || subprops.type === "12") && (
                        <RailIcon10 fill={colors.white} />
                    )}
                    {(subprops.type === "3" || subprops.type === "11") && (
                        <BusIcon10 fill={colors.white} />
                    )}
                    {subprops.type === "4" && <BoatIcon10 fill={colors.white} />}
                </View>
                <ThemedText style={styles.transitName}>{subprops.name}</ThemedText>
            </View>
        );
    }

    function IconAndTime(subprops) {
        return (
            <View style={styles.iconAndTime}>
                <View styles={styles.icon}>
                    {subprops.type === "board" ? (
                        <CompactTransitLine
                            fill={colors.white}
                            type={subprops.data.type}
                            name={subprops.data.name.long_name.substring(
                                0,
                                subprops.data.name.long_name.indexOf(" "),
                            )}
                            color={subprops.data.color}
                        />
                    ) : (
                        <WalkIcon fill={colors.text} />
                    )}
                </View>
                <ThemedText style={styles.subTimeText}>
                    {getTimeText(Math.round(parseInt(subprops.time) / 60))}
                </ThemedText>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <ThemedText style={styles.arrivedTime}>
                {"Arrive by "}
                {arrivingTime.getHours() < 10
                    ? "0" + arrivingTime.getHours()
                    : arrivingTime.getHours()}
                {":"}
                {arrivingTime.getMinutes() < 10
                    ? "0" + arrivingTime.getMinutes()
                    : arrivingTime.getMinutes()}
            </ThemedText>
            <View style={styles.subContainer}>
                <View style={styles.iconBlock}>
                    {props.routeData.directions.map((item, key) => (
                        <IconAndTime
                            key={key}
                            type={item.type}
                            time={item.schedule.duration}
                            data={item.via_line}
                        />
                    ))}
                </View>
                <View style={styles.detailBlock}>
                    <ThemedText style={styles.timeText}>{timeText}</ThemedText>
                    <ThemedText style={styles.detailText}>
                        {totalFare} {currency}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
}
