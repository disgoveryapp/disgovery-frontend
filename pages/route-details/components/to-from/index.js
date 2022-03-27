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

function ToFrom() {
    const subprops = {
        style: {
            marginTop: 10,
        },
        origin: "Kho Khut",
        time: 3000,
        destination: "Kho Khut",
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
            // bottomCard: {
            //     height: 0.7 * Dimensions.get("screen").height,
            //     marginTop: 0.3 * Dimensions.get("screen").height,
            //     paddingHorizontal: 15,
            //     backgroundColor: colors.background,
            //     borderTopLeftRadius: 22,
            //     borderTopRightRadius: 22,
    
            //     shadowColor: "#000",
            //     shadowOffset: {
            //         width: 0,
            //         height: 5,
            //     },
            //     shadowOpacity: 0.34,
            //     shadowRadius: 6.27,
    
            //     elevation: 10,
            // },
            container: {
                display: "flex",
                flexDirection: "row",
            },
            originDestinationContainer: {
                // width: props.time ? "80%" : "100%",
                width: "80%",
            },
            destination: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            },
            destinationMarqueeContainer: {
                paddingLeft: 5,
                flex: 1,
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
                flex: 1,
                fontSize: 18,
                fontWeight: size === "small" ? "500" : "600",
            },
            originMarqueeContainer: {
                flex: 1,
            },
            title: {
                marginTop: 10,
            },
            timeContainer: {
                flex: 1,
            },
            time: {},
            timeText: {
                textAlign: "right",
                fontSize: size === "small" ? 18 : 22,
                fontWeight: "600",
            },
            subTimeText: {
                textAlign: "right",
                fontSize: 14,
                // color: props.subTimeColor || colors.primary,
                color: "black",
            },
        });


    return(
        <View style={styles.bottomCard}>
            <ScrollView
                // showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                    paddingTop: 15,
                }}
                scrollEventThrottle={32}
                // onScroll={(event) =>
                //     scrollY.setValue(event.nativeEvent.contentOffset.y)
                // }
            >
                <OriginToDestinationTitle
                    style={styles.title}
                    origin={"Khu Kot"}
                    destination={"Khu Kot"}
                    time={3000}
                    subTime={"On time"}
                    subTimeColor={colors.primary}
                />
                        <View style={{ ...subprops.style, ...styles.container }}>
                            <View style={styles.originDestinationContainer}>
                                <View style={styles.destination}>
                                    {size === "small" ? <ArrowIcon /> : <ArrowIcon24 />}
                                    <View style={styles.destinationMarqueeContainer}>
                                        <ThemedTextMarquee style={styles.destinationText}>
                                            {subprops.destination}
                                        </ThemedTextMarquee>
                                    </View>
                                </View>

                                <View style={styles.origin}>
                                            <ThemedText style={styles.originFromText}>From </ThemedText>
                                            <View style={styles.originMarqueeContainer}>
                                                <ThemedTextMarquee style={styles.originText}>
                                                    {subprops.origin}
                                                </ThemedTextMarquee>
                                            </View>
                                </View>
                            </View>
                            <View style={styles.timeContainer}>
                                <View style={styles.time}>
                                    <ThemedText style={styles.timeText}>
                                        {secondToRoundedMinuteString(subprops.time)}
                                    </ThemedText>
                                    <ThemedText style={styles.subTimeText}>Arrived by</ThemedText>
                                </View>
                            </View>
                        </View>
            </ScrollView>
        </View>
    );
}

export default ToFrom;