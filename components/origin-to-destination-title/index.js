import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";
import ThemedText from "../themed-text";
import { useTheme } from "@react-navigation/native";
import ThemedTextMarquee from "../themed-text-marquee";
import ArrowIcon24 from "../../assets/svgs/arrow_forward_24px";

function OriginToDestinationTitle(props) {
    const { colors } = useTheme();

    function secondToRoundedMinuteString(second) {
        let minute = Math.round(parseInt(second) / 60);

        if (minute < 1) return "< 1 min";

        return `${minute} min`;
    }

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
        },
        originDestinationContainer: {
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
            fontSize: 24,
            fontWeight: "600",
        },
        origin: {
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
        },
        originFromText: {
            fontSize: 18,
            color: colors.subtitle,
            fontWeight: "600",
        },
        originText: {
            flex: 1,
            fontSize: 18,
            fontWeight: "600",
        },
        originMarqueeContainer: {
            flex: 1,
        },
        timeContainer: {
            flex: 1,
        },
        time: {},
        timeText: {
            textAlign: "right",
            fontSize: 22,
            fontWeight: "600",
        },
        subTimeText: {
            textAlign: "right",
            fontSize: 16,
            color: props.subTimeColor || colors.primary,
        },
    });

    return (
        <View style={{ ...props.style, ...styles.container }}>
            <View style={styles.originDestinationContainer}>
                <View style={styles.destination}>
                    <ArrowIcon24 />
                    <View style={styles.destinationMarqueeContainer}>
                        <ThemedTextMarquee style={styles.destinationText}>
                            {props.destination}
                        </ThemedTextMarquee>
                    </View>
                </View>

                <View style={styles.origin}>
                    <ThemedText style={styles.originFromText}>from </ThemedText>
                    <View style={styles.originMarqueeContainer}>
                        <ThemedTextMarquee style={styles.originText}>
                            {props.origin}
                        </ThemedTextMarquee>
                    </View>
                </View>
            </View>

            <View style={styles.timeContainer}>
                <View style={styles.time}>
                    <ThemedText style={styles.timeText}>
                        {secondToRoundedMinuteString(props.time)}
                    </ThemedText>
                    <ThemedText style={styles.subTimeText}>{props.subTime}</ThemedText>
                </View>
            </View>
        </View>
    );
}

export default OriginToDestinationTitle;
