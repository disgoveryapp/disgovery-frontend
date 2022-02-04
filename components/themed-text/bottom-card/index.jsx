import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, } from 'react-native-gesture-handler';
const SIZE = 100.0;
export default function BottomCard() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateY.value = Max(350, event.translationY + context.translateY);
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
    return (<GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Text>{translateY.value}</Text> */}
      <View style={styles.container}>
        <View style={styles.box}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.square, rStyle]}/>
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        bottom: -700
    },
    square: {
        width: SIZE * 4.28,
        height: SIZE * 6,
        backgroundColor: '#282828',
        borderRadius: 22,
    },
    box: {
        width: SIZE * 4,
        height: SIZE * 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: '#282828',
    },
});
