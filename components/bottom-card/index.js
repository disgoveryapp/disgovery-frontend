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

const SIZE = 100.0;
const startingPosition = 0;
const endingPosition = -300;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomCard = (({ children }) => {
    const translateY = useSharedValue(startingPosition);
    const { colors } = useTheme();
 
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateY.value = Math.max(endingPosition,event.translationY + context.translateY);
            console.log(event.translationY +context.translateY);
        },
        onEnd: () => {
            if (translateY.value > endingPosition/2) {
                translateY.value = withSpring(startingPosition);
            }
            else translateY.value = withSpring(endingPosition);
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
        container: {
            bottom: 0,
        },
        card: {
            width: SIZE * 4.28,
            height: SIZE * 6,
            backgroundColor: colors.background,
            borderRadius: 22,
        },
    });

    return (
        <GestureHandlerRootView style={[styles.container]}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.card, rStyle]}>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
});

export default BottomCard;