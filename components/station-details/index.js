import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/themed-text";
import SearchIcon from "../../assets/svgs/search-icon";
import StarBorderIcon from "../../assets/svgs/star-border-icon";
import { useTheme } from "@react-navigation/native";
import InformationIcon from "../../assets/svgs/Information-icon";

const DATA = {
    data: {
        name: "Mo Chit",
        uid: "333",
        code: "3",
        lines: [
            {
                name: "BTS Sukhumbit Line",
                color: "green",
                destinations:[
                    {
                        to: "Kheha",
                        schedule: "string",
                    },
                ]
            },
            {
                name: "BTS Sukhumbit Line",
                color: "green",
                destinations:[
                    {
                        to: "Kheha",
                        schedule: "string",
                    },
                ]
            }
        ],
        coordinates: {
            lat: "1000",
            lng: "1000",
        },
    }
};


const StationDetail = (props) => {
    const { colors } = useTheme();

    const Item = ({ linename, destination }) => (
        <View style={styles.connectto_item}>
            <View style={styles.connect_lineicon}>
                <ThemedText style={styles.linename}>{linename}</ThemedText>
            </View>
            <View>
                <ThemedText style={styles.station_white}>{destination}</ThemedText>
            </View>
        </View>
      );

      const renderItem = (item) => {
        console.log(item);

            return (
                <Item
                    linename={item.name}
                    destination={item.destinations[0].to}
                />
            );
    };

    const styles = StyleSheet.create({
        linetitle: {
            backgroundColor: "green",
            paddingLeft: 5,
            paddingRight: 5,
            paddingVertical: 3,
            borderRadius: 5,
        },
        stationinfo: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        stationin: {
            display: "flex",
            flexDirection: "row",
        },
        stationIntext:{
            fontSize: 20,
            textAlign: "right",
            color: "#ACACAC",
            marginRight:5,
        },
        linename:{
            color: colors.white,
        },
        titlecont:{
            display: "flex",
            flexDirection: "column",
        },
        headercont:{
            borderColor:"#444444",
            borderBottomWidth:2,
            paddingBottom:10,
        },
        name: {
            fontSize: 25,
            color: colors.text,
        },
        distance: {
            fontSize: 20,
            color: colors.text,
        },
        timeSection: {
            alignItems: "flex-end",
        },
        secondary_title:{
            fontSize: 16,
            color: "#ACACAC",
            // marginRight:5,
            marginBottom:8,
        },
        line_items:{
            display: "flex",
            flexDirection: "column",
        },
        connectto_item:{
            display: "flex",
            flexDirection: "row",
            marginBottom:5,
        },
        secondcont:{
            paddingVertical:10,
            borderColor:"#444444",
            borderBottomWidth:2,
            // paddingBottom:10,
        },
        connect_lineicon:{
            backgroundColor: "green",
            paddingLeft: 5,
            paddingRight: 5,
            paddingVertical: 3,
            borderRadius: 5,
            marginRight: 10,
        },
        station_white:{
            fontSize: 20,
            color: colors.text,
        },
    });

    return (
        <View>
            <View>
                <View style={styles.headercont}>
                    <View style={styles.titlecont}>
                        <View style={styles.stationinfo}>
                            <ThemedText style={styles.name}>{DATA.data.name}</ThemedText>
                            {/* <View style={styles.timeSection}> */}
                                <ThemedText style={styles.distance}>12km</ThemedText>
                            {/* </View> */}
                        </View>
                        <View style={styles.stationin}>
                            <View>
                                <ThemedText style={styles.stationIntext}>Station in</ThemedText>
                            </View>
                            <View style={styles.linetitle}>
                                <ThemedText style={styles.linename}>{DATA.data.lines[0].name}</ThemedText>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.secondcont}>
                    <View style={styles.titlecont}>
                        <View style={styles.stationinfo}>
                            <ThemedText style={styles.secondary_title}>Connects to</ThemedText>
                        </View>
                        <View style={styles.line_items}>
                            {Object.keys(DATA.data.lines).map((key) => {
                            return <>{renderItem(DATA.data.lines[key])}</>;
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default StationDetail;
