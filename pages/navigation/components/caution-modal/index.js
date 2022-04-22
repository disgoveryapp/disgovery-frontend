import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import NavigationIcon from "../../../../assets/svgs/navigation-icon";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import PropTypes from "prop-types";

const TRANSFORM_Y = -24;

function NavigationCautionModal(props) {
    const { colors } = useTheme();
    const iconTransform = useSharedValue(0);

    const onDismiss = props.onDismiss || function () {};

    useEffect(() => {
        setTimeout(() => {
            iconTransform.value = TRANSFORM_Y;
        }, 500);
    }, []);

    const animatedIconTransformY = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(iconTransform.value, {
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                    }),
                },
            ],
        };
    });

    const styles = StyleSheet.create({
        container: {
            backgroundColor: `${colors.background}88`,
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: "100%",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
        },
        cautionContainer: {
            borderRadius: 12,
            backgroundColor: colors.background,
            padding: 20,
            width: "80%",

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        titleContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        titleTextContainer: {
            marginLeft: 5,
        },
        titleText: {
            fontSize: 20,
            fontWeight: "600",
            color: colors.yellow,
        },
        bodyContainer: {
            marginTop: 10,
        },
        bodyText: {
            fontSize: 16,
        },
        dismissButton: {
            alignSelf: "flex-end",
            marginTop: 20,
        },
        dismissText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary,
        },
        animatedNavigationView: {
            display: "flex",
            flexDirection: "column",
            height: 24,
            overflow: "hidden",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.cautionContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.animatedNavigationView}>
                        <Animated.View style={[animatedIconTransformY]}>
                            <View>
                                <NavigationIcon fill={colors.yellow} />
                            </View>
                            <View>
                                <NavigationIcon fill={colors.yellow} />
                            </View>
                        </Animated.View>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <ThemedText style={styles.titleText}>Navigation is in beta</ThemedText>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <ThemedText style={styles.bodyText}>
                        Use caution while using turn-by-turn navigation. Follow the signs along the
                        path and be aware of your surroundings.
                    </ThemedText>
                </View>
                <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
                    <ThemedText style={styles.dismissText}>Proceed</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

NavigationCautionModal.propTypes = {
    onDismiss: PropTypes.func,
};

export default NavigationCautionModal;
