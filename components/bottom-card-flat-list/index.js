import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    Dimensions,
} from "react-native";
import ThemedText from "../themed-text";
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";
import BusIcon from "../../assets/svgs/bus-icon";
import BTSIcon from "../../assets/svgs/BTS-icon";
import ShipIcon from "../../assets/svgs/ship-icon";
import ARLIcon from "../../assets/svgs/ARL-icon";
import BRTIcon from "../../assets/svgs/BRT-icon";
import SubwayIcon from "../../assets/svgs/subway-icon";
import MLineIcon from "../../assets/svgs/MLine-icon";
import RedLineIcon from "../../assets/svgs/RedLine-icon";
import axios from "axios";
import { API_URL } from "../../configs/configs";
import ThemedTextMarquee from "../themed-text-marquee";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function BottomCardFlatList(props) {
    const { colors } = useTheme();

    console.log(props.nearbyStations);
    if (!props.nearbyStations) return;

    const renderItem = (item) => {
        console.log(item);

        if (item.lines.length > 0) {
            console.log(item.lines[0].name);

            return (
                <Item
                    name={item.lines[0].destination.name}
                    time={item.lines[0].arriving_in}
                    line={item.lines[0]}
                    type={item.lines[0].id}
                    color={`#${item.lines[0].color}`}
                />
            );
        }
    };

    const ItemDivider = () => {
        return <View style={styles.divider} />;
    };

    const Item = ({ name, time, line, type, color }) => (
        <TouchableOpacity style={styles.lower_container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignContent: "center",
                    backgroundColor: "white",
                    paddingLeft: 5,
                    paddingVertical: 2,
                    width: 100,
                    borderRadius: 5,
                    borderWidth: 5,
                    borderColor: color,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                }}
            >
                <View style={styles.iconContainer}>
                    {type == "Bus" ? <BusIcon style={styles.icon} /> : <></>}
                    {type == "Ship" ? <ShipIcon style={styles.Shipicon} /> : <></>}
                    {type == "Subway" ? <SubwayIcon style={styles.Subwayicon} /> : <></>}
                    {type.indexOf("BTS") != -1 ? <BTSIcon style={styles.icon} /> : <></>}
                    {type.indexOf("MRT") != -1 ? (
                        <MLineIcon style={styles.MLineicon} fill={color} />
                    ) : (
                        <></>
                    )}
                    {type == "BRT" ? <BRTIcon style={styles.icon} /> : <></>}
                    {type.indexOf("SRT") != -1 ? (
                        <RedLineIcon style={styles.RedLineicon} fill={color} />
                    ) : (
                        <></>
                    )}
                    {type == "ARL" ? <ARLIcon style={styles.icon} /> : <></>}
                </View>

                <View style={styles.linecont}>
                    <ThemedText
                        style={styles.line_long}
                        adjustFontSizeToFit={true}
                        allowFontScaling={true}
                    >
                        {line.name.short_name.replace("Line", "").toUpperCase()}
                    </ThemedText>
                </View>
            </View>

            <ArrowIcon style={styles.arrow} />

            <View style={styles.destination}>
                <ThemedTextMarquee style={styles.name}>{name}</ThemedTextMarquee>
            </View>

            <View style={styles.timeSection}>
                <ThemedText style={styles.time}>
                    {Math.round(time / 60) === 0 ? "now" : Math.round(time / 60)}{" "}
                    {Math.round(time / 60) === 0 ? "" : "min"}
                </ThemedText>
            </View>
        </TouchableOpacity>
    );

    const styles = StyleSheet.create({
        lower_container: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 15,
            justifyContent: "space-between",
            alignItems: "center",
        },
        destination: {
            flex: 1,
            justifyContent: "center",
            marginLeft: 5,
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
            height: 0.5,
            backgroundColor: colors.upper_background,
        },
        iconContainer: {
            width: "30%",
        },
    });

    return (
        <SafeAreaView style={{ width: "100%" }}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingTop: 10,
                    paddingBottom: "60%",
                }}
            >
                {Object.keys(props.nearbyStations).map((key) => {
                    return <>{renderItem(props.nearbyStations[key])}</>;
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
