import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedText from "../themed-text";
import { useTheme } from "@react-navigation/native";
import ThemedTextMarquee from "../themed-text-marquee";
import ArrowIcon24 from "../../assets/svgs/arrow-forward-24px";
import PropTypes from "prop-types";
import ArrowIcon from "../../assets/svgs/arrow-forward-18px";

function OriginToDestinationTitle(props) {
    const { colors } = useTheme();
    const size = props.size || "large";

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
            width: props.time ? "80%" : "100%",
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
            fontSize: 16,
            color: props.subTimeColor || colors.primary,
        },
    });

    return (
        <View style={{ ...props.style, ...styles.container }}>
            <View style={styles.originDestinationContainer}>
                <View style={styles.destination}>
                    {size === "small" ? <ArrowIcon /> : <ArrowIcon24 />}
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

            {props.time && (
                <View style={styles.timeContainer}>
                    <View style={styles.time}>
                        <ThemedText style={styles.timeText}>
                            {secondToRoundedMinuteString(props.time)}
                        </ThemedText>
                        <ThemedText style={styles.subTimeText}>{props.subTime}</ThemedText>
                    </View>
                </View>
            )}
        </View>
    );
}

OriginToDestinationTitle.propTypes = {
    origin: PropTypes.string,
    destination: PropTypes.string,
    time: PropTypes.number,
    size: PropTypes.oneOf(["large", "small"]),
};

export default OriginToDestinationTitle;
