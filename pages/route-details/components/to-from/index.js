import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Easing,
    Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import OriginToDestinationTitle from "../../../../components/origin-to-destination-title";
import ThemedText from "../../../../components/themed-text";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";
import ArrowIcon24 from "../../../../assets/svgs/arrow-forward-24px";
import ArrowIcon from "../../../../assets/svgs/arrow-forward-18px";

function ToFrom(props) {

    const subprops = {
        style: {
            marginTop: 10,
        },
        origin: "Bang sue station",
        time: 3000,
        destination: "centralwOrld",
    };
    
    const { dark, colors } = useTheme();
    // const size = props.size || "large";
    const size = "large";
    
        function secondToRoundedMinuteString(second) {
            let minute = Math.round(parseInt(second) / 60);
            if (minute < 1) return "< 1 min";
            return `${minute} min`;
        }
    
        const styles = StyleSheet.create({
            uppercont:{
                paddingHorizontal: props.containerPadding,
                justifyContent: "flex-start",
            },
            container: {
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between",
            },
            subcontainer:{
                paddingBottom: 50,
                paddingTop: 15,
            },
            destination: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            },
            destinationMarqueeContainer: {
                paddingLeft: 5,
            },
            destinationText: {
                fontSize: size === "small" ? 20 : 24,
                fontWeight: "600",
            },
            origin: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
            },
            originFromText: {
                fontSize: size === "small" ? 16 : 18,
                color: colors.subtitle,
                fontWeight: size === "small" ? "500" : "600",
                marginLeft: size === "small" ? 22 : 0,
            },
            originText: {
                // flex: 1,
                fontSize: 18,
                fontWeight: size === "small" ? "500" : "600",
            },
            title: {
                marginTop: 10,
            },
            timeText: {
                textAlign: "right",
                fontSize: size === "small" ? 18 : 22,
                fontWeight: "600",
            },
            subTimeText: {
                textAlign: "right",
                fontSize: 14,
                color: colors.subtitle,
                // color: props.subTimeColor || colors.primary,
                // color: "black",
            },
        });


    return(
        <View style={styles.uppercont}>
                <View style={{ ...subprops.style, ...styles.container }}>
                    <View>
                        <View style={styles.destination}>
                            {size === "small" ? <ArrowIcon /> : <ArrowIcon24 />}
                            <View style={styles.destinationMarqueeContainer}>
                                <ThemedText style={styles.destinationText}>
                                    {subprops.destination}
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.origin}>
                            <ThemedText style={styles.originFromText}>From </ThemedText>
                            <View>
                                <ThemedText style={styles.originText}>
                                    {subprops.origin}
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <ThemedText style={styles.timeText}>
                                {secondToRoundedMinuteString(subprops.time)}
                            </ThemedText>
                            <View>
                                <ThemedText style={styles.subTimeText}>Arrive by 16:00</ThemedText>
                            </View>
                        </View>
                    </View>
                </View>
        </View>
    );
}

export default ToFrom;