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

export default function BottomCard(props) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const { colors } = useTheme();

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateY.value = Math.max(350, event.translationY + context.translateY);
            //console.log(translateY.value);
        },
        onEnd: () => {
            const distance = Math.abs(translateY.value);
            //console.log(distance)
            if (distance < SIZE * 3) {
                //console.log("1")
                translateY.value = withSpring(0);
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
        container: {
            flex: 1,
            backgroundColor: colors.text,
            alignItems: "center",
            bottom: -700,
        },
        square: {
            width: SIZE * 4.28,
            height: SIZE * 6,
            backgroundColor: colors.background,
            borderRadius: 22,
        },
        box: {
            width: SIZE * 4,
            height: SIZE * 8,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0,
            borderColor: colors.background,
        },
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <Text>{translateY.value}</Text> */}
            <View style={styles.container}>
                <View style={styles.box}>
                    <PanGestureHandler onGestureEvent={panGestureEvent}>
                        <Animated.View style={[styles.square, rStyle]} />
                    </PanGestureHandler>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}
