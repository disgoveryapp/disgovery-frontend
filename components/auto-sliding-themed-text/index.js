import { Easing, StyleSheet, View, Animated } from "react-native";
import React, { useState } from "react";
import ThemedText from "../themed-text";
import TextTicker from "react-native-text-ticker";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";

export default function AutoSlidingThemedText(props) {
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
        Animated.timing(leftOverlayOpacity, {
            toValue: 1,
            duration: 400,
            delay: MARQUEE_DELAY - MARQUEE_DELAY / 10,
        }).start();
    }

    function onScrollStop() {
        // Animated.sequence([
        //     Animated.timing(leftOverlayOpacity, {
        //         toValue: 0,
        //         duration: 100,
        //     }),
        //     Animated.delay(MARQUEE_DELAY),
        //     Animated.timing(leftOverlayOpacity, {
        //         toValue: 1,
        //         duration: 400,
        //         delay: MARQUEE_DELAY / 2,
        //     }),
        // ]).start();
    }

    return (
        <View style={styles.container}>
            <TextTicker
                style={{ alignItems: "flex-start" }}
                duration={MARQUEE_SPEED * props.children.length}
                loop
                bounce
                repeatSpacer={70}
                marqueeDelay={MARQUEE_DELAY}
                easing={Easing.linear}
                onScrollStart={onScrollStart}
                onMarqueeComplete={onScrollStop}
            >
                <ThemedText style={{ ...props.style }} numberOfLines={props.numberOfLines || 1}>
                    {props.children}
                </ThemedText>
            </TextTicker>

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
