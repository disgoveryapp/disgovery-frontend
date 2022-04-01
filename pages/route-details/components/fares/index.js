import React, {useState, useEffect }from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";
import CollapseIcon from "../../../../assets/svgs/collapse-icon";
import ExpandDownIcon from "../../../../assets/svgs/expand-down-icon";


function Fares() {

    const { dark, colors } = useTheme();
    const fare = 63;
    const CONTENT = [
        {
            isExpanded:false,
            content:"AAAAA"
        }
    ]
    const size = "large";

    const styles = StyleSheet.create({
        fare_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            textAlign:"right",
            width:"100%",
        },
        text_container:{
            fontSize: size === "small" ? 16 : 18,
            fontWeight: size === "small" ? "500" : "600",
            marginLeft: size === "small" ? 22 : 0,
        },
        expand_sign:{
            display: "flex",
            flexDirection: "row",
        },
        text:{
            fontSize: 18,
            fontWeight: size === "small" ? "500" : "600",
            color: "black",
        },
    });

    return(
        <View style={styles.bottomCard}>
            <View style={styles.fare_container}>
                <TouchableOpacity>
                    <View style={styles.expand_sign}>
                        <ThemedText style={styles.text}>Fares</ThemedText>
                        <ExpandDownIcon></ExpandDownIcon>
                    </View>
                </TouchableOpacity>
                <ThemedText style={styles.text}>{fare} THB</ThemedText>
            </View>
        </View>
    );
}

export default Fares;
    