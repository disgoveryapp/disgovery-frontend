import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import SearchBox from "../search-box";
import BottomCardFlatList from "../bottom-card-flat-list";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const startingPosition = 0;
const endingPosition = -SCREEN_HEIGHT / 3;
const CARD_HEIGHT = SCREEN_HEIGHT * 3;

export const BOTTOM_CARD_CONTENT_PADDING = CARD_HEIGHT + endingPosition;

const BottomCard = (props) => {
    const translateY = useSharedValue(startingPosition);

    const { colors } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            translateY.value = withTiming(startingPosition, {
                duration: 500,
                easing: Easing.out(Easing.exp),
            });
        });

        return unsubscribe;
    }, [navigation]);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateY.value = Math.max(endingPosition, event.translationY + context.translateY);
        },
        onEnd: (event) => {
            if (event.translationY < 0) {
                translateY.value = withTiming(endingPosition, {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                });
            } else {
                translateY.value = withTiming(startingPosition, {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                });
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
            width: SCREEN_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: colors.background,
            borderRadius: 22,
        },
        children: {
            width: "100%",
            height: "100%",
            marginTop: -35,
            zIndex: 4,
        },
        searchbox: {
            width: "100%",
            paddingHorizontal: 15,
            bottom: 25,
            zIndex: 5,
        },
    });

    function navigateToSearch() {
        navigation.navigate("Search");
    }

    const flatlistOpacity = useDerivedValue(() =>
        interpolate(translateY.value, [0, -SCREEN_HEIGHT / 3, -SCREEN_HEIGHT - 1], [1, 1, 0], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        }),
    );

    const flatlistStyle = useAnimatedStyle(() => {
        return {
            opacity: flatlistOpacity.value,
        };
    });

    function performTransitionToSearch() {
        translateY.value = withTiming(
            -SCREEN_HEIGHT,
            {
                duration: 500,
                easing: Easing.out(Easing.exp),
            },
            (finished) => {
                "worklet";
                if (finished) runOnJS(navigateToSearch)();
            },
        );
    }

    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.card, rStyle]}>
                    <Animated.View style={[styles.searchbox, flatlistStyle]}>
                        <SearchBox onPress={() => performTransitionToSearch()} />
                    </Animated.View>
                    <Animated.View style={[styles.children, flatlistStyle]}>
                        <BottomCardFlatList
                            nearbyStations={props.nearbyStations}
                            loading={props.loading}
                        />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default BottomCard;
