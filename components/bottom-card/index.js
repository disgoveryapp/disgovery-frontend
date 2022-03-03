import React, { useCallback, useEffect, useImperativeHandle } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const startingPosition = 0;
const endingPosition = -SCREEN_HEIGHT / 3;

const BottomCard = (props) => {
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
            if (translateY.value > endingPosition / 2) {
                translateY.value = withSpring(startingPosition);
            } else translateY.value = withSpring(endingPosition);
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
            width: SCREEN_WIDTH,
            height: (SCREEN_HEIGHT * 2) / 3,
            backgroundColor: colors.background,
            borderRadius: 22,
        },
    });

    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.card, rStyle]}>{props.children}</Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default BottomCard;
