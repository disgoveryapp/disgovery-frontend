import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

const SIZE = 100.0;
const startingPosition = 800;
const endingPosition = 500;

export default function bottomCard(props) {
    const translateY = useSharedValue(startingPosition);
    const { colors } = useTheme();

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateY.value = Math.max(endingPosition, event.translationY + context.translateY);
        },
        onEnd: () => {
            if (translateY.value > endingPosition) {
                translateY.value = withSpring(startingPosition);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    const styles = StyleSheet.create({
        card: {
            width: SIZE * 4.28,
            height: SIZE * 6,
            backgroundColor: colors.background,
            borderRadius: 22,
        },
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.card, rStyle]}/>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}
