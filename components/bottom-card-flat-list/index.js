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
import { useTheme } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function BottomCardFlatList(props) {
    // const detail = `/station/nearby?lat=${props.latitude}&lng=${props.longitude}&radius=${props.radius}`;

    const [Data, setData] = useState();

    const { colors } = useTheme();

    // useEffect(() => {
    //     getRawData();
    // }, []);

    // const getRawData = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}${detail}`);
    //         const rawdata = response;
    //         setData(rawdata);
    //         // console.log(rawData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const renderItem = ({ item }) => (
        <Item
            name={item.name}
            time={item.time}
            line={item.line}
            type={item.type}
            color={item.color}
        />
    );

    const ItemDivider = () => {
        return <View style={styles.divider} />;
    };

    const Item = ({ name, time, line, type, color }) => (
        <TouchableOpacity style={styles.lower_container}>
            <View style={styles.sub_container}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        backgroundColor: "white",
                        padding: 2,
                        width: 110,
                        borderRadius: 5,
                        borderWidth: 5,
                        borderColor: color,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                >
                    {type == "Bus" ? <BusIcon style={styles.icon} /> : null}
                    {type == "Ship" ? <ShipIcon style={styles.Shipicon} /> : null}
                    {type == "Subway" ? <SubwayIcon style={styles.Subwayicon} /> : null}
                    {type.indexOf("BTS") != -1 ? <BTSIcon style={styles.icon} /> : null}
                    {type.indexOf("MRT") != -1 ? (
                        <MLineIcon style={styles.MLineicon} fill={color} />
                    ) : null}
                    {type == "BRT" ? <BRTIcon style={styles.icon} /> : null}
                    {type.indexOf("SRT") != -1 ? (
                        <RedLineIcon style={styles.RedLineicon} fill={color} />
                    ) : null}
                    {type == "ARL" ? <ARLIcon style={styles.icon} /> : null}
                    <View style={styles.linecont}>
                        {line.length <= 4 ? (
                            <ThemedText style={styles.line_short}>{line}</ThemedText>
                        ) : line.length <= 10 ? (
                            <ThemedText style={styles.line_middle}>{line}</ThemedText>
                        ) : line.length <= 14 ? (
                            <ThemedText style={styles.line_long}>{line}</ThemedText>
                        ) : line.length > 14 ? (
                            <ThemedText style={styles.line_longer}>{line}</ThemedText>
                        ) : null}
                    </View>
                </View>
                <ArrowIcon style={styles.arrow} />
                <View style={styles.item}>
                    <ThemedText style={styles.name}>{name}</ThemedText>
                </View>
            </View>
            <View style={styles.timeSection}>
                <ThemedText style={styles.time}>{time}</ThemedText>
                <ThemedText style={styles.time}>min</ThemedText>
            </View>
        </TouchableOpacity>
    );

    const styles = StyleSheet.create({
        lower_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.background,
            padding: SCREEN_HEIGHT / 45,
        },
        sub_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        item: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
        container: {
            width: "100%",
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
            justifyContent: "space-around",
        },
        line_short: {
            marginTop: 2,
            fontSize: 23,
            color: "black",
            textAlign: "right",
        },
        line_middle: {
            textAlignVertical: "center",
            marginTop: 4,
            fontSize: 10,
            color: "black",
            textAlign: "right",
        },
        line_long: {
            fontSize: 12,
            color: "black",
            textAlign: "right",
            width: "70%",
        },
        line_longer: {
            fontSize: 9,
            color: "black",
            textAlign: "right",
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
            color: "white",
        },
        timeSection: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        time: {
            fontSize: 25,
            marginRight: 2,
            marginTop: 4,
            textAlign: "right",
            color: colors.text,
        },
        divider: {
            height: 0.5,
            backgroundColor: colors.upper_background,
        },
    });

    return (
        <SafeAreaView style={{ width: "100%" }}>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemDivider}
            />
        </SafeAreaView>
    );
}
