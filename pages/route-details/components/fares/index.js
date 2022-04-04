import React, { useState, useEffect }from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";
import CollapseIcon from "../../../../assets/svgs/collapse-icon";
import ExpandDownIcon from "../../../../assets/svgs/expand-down-icon";
import TransitLine from "../../../../components/transit-line";


function Fares(props) {

    const { dark, colors } = useTheme();
    const [isExpandClick, setExpandClick] = useState(false);
    const fare = 630;
    const CONTENT = [
        {
            isExpanded:false,
            content:"AAAAA"
        }
    ]
    const size = "large";

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: props.containerPadding,
            justifyContent: "flex-start",
        },
        transit: {
            paddingVertical: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
        },
        fare_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            textAlign:"right",
            width:"100%",
        },
        fare_container_exoanded: {
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            textAlign:"right",
            width:"100%",
            marginBottom:3,
        },
        text_container:{
            fontSize: size === "small" ? 16 : 18,
            fontWeight: size === "small" ? "500" : "600",
            marginLeft: size === "small" ? 22 : 0,
        },
        subtitleText:{
            flexDirection: "row",
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
        timeText: {
            fontWeight: "600",
            fontSize: 16,
            color: colors.subtitle,
        },
    });

    function expandClick() {
        if(isExpandClick == true){
            setExpandClick(false);
        } else {
            setExpandClick(true);
        }
    }

    return(
        <View style={styles.container}>
            <View>
                {isExpandClick ? (
                    <>
                        <View style={styles.fare_container_exoanded}>
                            <TouchableOpacity onPress={expandClick}>
                                <View style={styles.expand_sign}>
                                    <ThemedText style={styles.text}>Fares</ThemedText>
                                    <CollapseIcon></CollapseIcon>
                                </View>
                            </TouchableOpacity>
                            <ThemedText style={styles.text}>{fare} THB</ThemedText>
                        </View>
                        <View>
                            <View style={styles.transit}>
                                <TransitLine
                                    line={{
                                        name: {
                                            short_name: "Insert Props Here",
                                            long_name: "BTS Sukhumvit Line",
                                        },
                                        color: "7FBF3A",
                                    }}
                                    fontSize={14}
                                />
                                <ThemedText style={styles.timeText}>{fare} THB</ThemedText>
                            </View>
                            <View style={styles.transit}>
                                <TransitLine
                                    line={{
                                        name: {
                                            short_name: "Insert Props Here",
                                            long_name: "BTS Sukhumvit Line",
                                        },
                                        color: "7FBF3A",
                                    }}
                                    fontSize={14}
                                />
                                <ThemedText style={styles.timeText}>{fare} THB</ThemedText>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.fare_container}>
                            <TouchableOpacity onPress={expandClick}>
                                <View style={styles.expand_sign}>
                                    <ThemedText style={styles.text}>Fares</ThemedText>
                                    <ExpandDownIcon></ExpandDownIcon>
                                </View>
                            </TouchableOpacity>
                            <ThemedText style={styles.text}>{fare} THB</ThemedText>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}

export default Fares;
    