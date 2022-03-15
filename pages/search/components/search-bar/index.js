import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextInput from "../../../../components/themed-text-input";
import CloseIcon from "../../../../assets/svgs/close-icon";
import ArrowBackwardIcon from "../../../../assets/svgs/arrow-backward-24px";
import { useNavigation, useTheme } from "@react-navigation/native";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import RouteIcon from "../../../../assets/svgs/route-icon";
import PropTypes from "prop-types";

const SEARCH_MODES = ["stationsAndPlaces", "lines"];
const HELPER_TEXTS = ["Searching stations and places", "Searching bus and train lines"];

export default function SearchBar(props) {
    const clearText = () => props.onChangeText("");
    const onModeChange = props.onModeChange || function () {};

    const navigation = useNavigation();
    const { colors } = useTheme();

    const [selectedSearchMode, setSelectedSearchMode] = useState(SEARCH_MODES[0]);
    const [showHelperText, setShowHelperText] = useState(false);
    const [modeHelperText, setModeHelperText] = useState(HELPER_TEXTS[0]);

    const [alreadyShowedHelperText, setAlreadyShowedHelperText] = useState(false);

    const fullSearchSelectorContainerOpacity = new Animated.Value(1);
    const collapsedHelperTextOpacity = new Animated.Value(0);
    const fullSearchSelectorContainerOpacityRef = useRef(fullSearchSelectorContainerOpacity);
    const collapsedHelperTextOpacityRef = useRef(collapsedHelperTextOpacity);

    useEffect(() => {
        if (props.value && !alreadyShowedHelperText) {
            setAlreadyShowedHelperText(true);
            animateHelperText();
        } else if (!props.value) {
            setAlreadyShowedHelperText(false);
        }
    }, [props.value]);

    useEffect(() => {
        onModeChange(selectedSearchMode);
    }, [selectedSearchMode]);

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            alignItems: "flex-start",
        },
        searchBarContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingVertical: 10,
        },
        body: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        textinput: {
            flex: 1,
            fontSize: 18,
            paddingHorizontal: 8,
        },
        fullSearchSelectorContainer: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
        },
        fullSelectorTextContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        fullSelectorText: {
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 3,
        },
        fullSelectorInterpunct: {
            fontSize: 16,
            fontWeight: "bold",
            color: colors.subtitle,
            marginHorizontal: 5,
        },
        collapsedSearchSelectorContainer: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginVertical: 10,
            height: 20,
        },
        collapsedSelectorsContainer: {
            width: 54,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        collapsedSelectorContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        collapsedHelperText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.subtitle,
        },
        collapsedHelperTextContainer: {},
    });

    function goBack() {
        navigation.pop();
    }

    function selectMode(mode) {
        setSelectedSearchMode(mode);
        setModeHelperText(HELPER_TEXTS[SEARCH_MODES.indexOf(mode)]);
        animateHelperText();
    }

    function animateHelperText() {
        Animated.timing(fullSearchSelectorContainerOpacityRef.current, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                setShowHelperText(true);

                Animated.sequence([
                    Animated.timing(collapsedHelperTextOpacityRef.current, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(collapsedHelperTextOpacityRef.current, {
                        toValue: 0,
                        duration: 150,
                        delay: 500,
                        useNativeDriver: true,
                    }),
                ]).start(({ finished }) => {
                    if (finished) {
                        setShowHelperText(false);

                        Animated.timing(fullSearchSelectorContainerOpacityRef.current, {
                            toValue: 1,
                            duration: 150,
                            useNativeDriver: true,
                        }).start();
                    }
                });
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={styles.body}>
                    <TouchableOpacity onPress={goBack}>
                        <ArrowBackwardIcon />
                    </TouchableOpacity>

                    <ThemedTextInput
                        placeholder={props.placeholder}
                        style={styles.textinput}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        onChange={props.onChange}
                        autoFocus
                    />
                </View>
                <View>
                    {props.value ? (
                        <TouchableOpacity onPress={() => clearText()}>
                            <CloseIcon />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
            <Animated.View style={styles.fullSearchSelectorContainer}>
                {!showHelperText && (
                    <>
                        <Animated.View
                            style={[
                                styles.fullSearchSelectorContainer,
                                { opacity: fullSearchSelectorContainerOpacityRef.current },
                            ]}
                        >
                            <TouchableOpacity
                                style={styles.fullSelectorTextContainer}
                                onPress={() => selectMode(SEARCH_MODES[0])}
                            >
                                <PlaceIcon
                                    fill={
                                        selectedSearchMode === SEARCH_MODES[0]
                                            ? colors.primary
                                            : colors.text
                                    }
                                />
                                <ThemedText
                                    style={{
                                        ...styles.fullSelectorText,
                                        color:
                                            selectedSearchMode === SEARCH_MODES[0]
                                                ? colors.primary
                                                : colors.text,
                                    }}
                                >
                                    Stations & Places
                                </ThemedText>
                            </TouchableOpacity>
                            <ThemedText style={styles.fullSelectorInterpunct}> · </ThemedText>
                            <TouchableOpacity
                                style={styles.fullSelectorTextContainer}
                                onPress={() => selectMode(SEARCH_MODES[1])}
                            >
                                <RouteIcon
                                    fill={
                                        selectedSearchMode === SEARCH_MODES[1]
                                            ? colors.primary
                                            : colors.text
                                    }
                                />
                                <ThemedText
                                    style={{
                                        ...styles.fullSelectorText,
                                        color:
                                            selectedSearchMode === SEARCH_MODES[1]
                                                ? colors.primary
                                                : colors.text,
                                    }}
                                >
                                    Lines
                                </ThemedText>
                            </TouchableOpacity>
                        </Animated.View>
                    </>
                )}

                {showHelperText && (
                    <Animated.View
                        style={[
                            styles.collapsedHelperTextContainer,
                            { opacity: collapsedHelperTextOpacityRef.current },
                        ]}
                    >
                        <ThemedText style={styles.collapsedHelperText}>{modeHelperText}</ThemedText>
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
}

SearchBar.propTypes = {
    onModeChange: PropTypes.func,
};
