import { Easing, StyleSheet, View, Animated } from "react-native";
import React, { useState } from "react";
import ThemedText from "../themed-text";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import TextMarquee from "./text-ticker";

export default function ThemedTextMarquee(props) {
    const { colors } = useTheme();
    const OVERLAY_WIDTH = props.overlayWidth || 40;
    const OVERLAY_BACKGROUND_COLOR = props.overlayBackgroundColor || colors.background;
    const MARQUEE_DELAY = 1000;
    const MARQUEE_SPEED = 150;
    const leftOverlayOpacity = new Animated.Value(0);

    const styles = StyleSheet.create({
        container: {
            width: "auto",
            height: "auto",
        },
        leftOverlayView: {
            position: "absolute",
            width: OVERLAY_WIDTH,
            height: "100%",
        },
        leftOverlayGradient: {
            width: "100%",
            height: "100%",
        },
        rightOverlayView: {
            position: "absolute",
            alignSelf: "flex-end",
            right: 0,
            width: OVERLAY_WIDTH,
            height: "100%",
        },
        rightOverlayGradient: {
            width: "100%",
            height: "100%",
        },
    });

    function onScrollStart() {
        Animated.sequence([
            Animated.timing(leftOverlayOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.delay(props.children.length * MARQUEE_SPEED - 1100),
            Animated.timing(leftOverlayOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }

    function onScrollStop() {}

    return (
        <View style={styles.container}>
            <TextMarquee
                style={{ alignItems: "flex-start" }}
                duration={MARQUEE_SPEED * props.children.length}
                animationType="scroll"
                loop
                repeatSpacer={70}
                bouncePadding={OVERLAY_WIDTH}
                marqueeDelay={MARQUEE_DELAY}
                easing={Easing.linear}
                onMarqueeStart={onScrollStart}
                onMarqueeComplete={onScrollStop}
                scroll={false}
            >
                <ThemedText style={{ ...props.style }} numberOfLines={props.numberOfLines || 1}>
                    {props.children}
                </ThemedText>
            </TextMarquee>

            <Animated.View style={[styles.leftOverlayView, { opacity: leftOverlayOpacity }]}>
                <LinearGradient
                    style={styles.leftOverlayGradient}
                    colors={[`${OVERLAY_BACKGROUND_COLOR}FF`, `${OVERLAY_BACKGROUND_COLOR}00`]}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                ></LinearGradient>
            </Animated.View>

            <Animated.View style={styles.rightOverlayView}>
                <LinearGradient
                    style={styles.rightOverlayGradient}
                    colors={[`${OVERLAY_BACKGROUND_COLOR}FF`, `${OVERLAY_BACKGROUND_COLOR}00`]}
                    start={{ x: 0.9, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                ></LinearGradient>
            </Animated.View>
        </View>
    );
}
