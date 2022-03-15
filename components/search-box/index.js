import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, TouchableOpacity, View, Easing } from "react-native";
import ThemedText from "../../components/themed-text";
import SearchIcon from "../../assets/svgs/search-icon";
import StarBorderIcon from "../../assets/svgs/star-border-icon";
import { useTheme, useNavigation } from "@react-navigation/native";

const PLACEHOLDER_ANIMATION_TEXT = ["stations", "places", "destinations"];

const SearchBox = (props) => {
    let placeholderAnimationIteration = 0;

    const placeholderTextOpacity = new Animated.Value(1);
    const placeholderTextOpacityRef = useRef(placeholderTextOpacity);
    const [placeholderAnimationText, setPlaceholderAnimationText] = useState(
        PLACEHOLDER_ANIMATION_TEXT[placeholderAnimationIteration],
    );

    const { colors } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        playPlaceholderAnimationText();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            _restartPlaceholderAnimationText();
        });

        return unsubscribe;
    }, [navigation]);

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 50,
            backgroundColor: colors.upper_background,
            borderRadius: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        placeholderContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        placeholder: {
            fontWeight: "600",
            fontSize: 18,
            marginLeft: 5,
            color: colors.text,
        },
    });

    function _restartPlaceholderAnimationText() {
        placeholderAnimationIteration = 0;
        setPlaceholderAnimationText(PLACEHOLDER_ANIMATION_TEXT[placeholderAnimationIteration]);
        playPlaceholderAnimationText();
    }

    function playPlaceholderAnimationText() {
        Animated.timing(placeholderTextOpacityRef.current, {
            toValue: 0,
            duration: 500,
            delay: 1000,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                placeholderAnimationIteration++;
                setPlaceholderAnimationText(
                    PLACEHOLDER_ANIMATION_TEXT[placeholderAnimationIteration],
                );

                Animated.timing(placeholderTextOpacityRef.current, {
                    toValue: 1,
                    duration: 500,
                    delay: 100,
                    useNativeDriver: true,
                }).start(({ finished }) => {
                    if (finished) {
                        if (
                            PLACEHOLDER_ANIMATION_TEXT[placeholderAnimationIteration] !==
                            PLACEHOLDER_ANIMATION_TEXT[PLACEHOLDER_ANIMATION_TEXT.length - 1]
                        )
                            playPlaceholderAnimationText();
                    }
                });
            }
        });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress || function () {}}>
            <View style={styles.placeholderContainer}>
                <ThemedText style={styles.placeholder}>Search</ThemedText>
                <Animated.View style={{ opacity: placeholderTextOpacityRef.current }}>
                    <ThemedText style={styles.placeholder}>{placeholderAnimationText}</ThemedText>
                </Animated.View>
            </View>
            <SearchIcon />

            {/* <StarBorderIcon /> */}
        </TouchableOpacity>
    );
};

export default SearchBox;
