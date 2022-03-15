import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity,
    Animated,
} from "react-native";
import ThemedText from "../../components/themed-text";
import { useNavigation, useTheme } from "@react-navigation/native";
import Searchbar from "./components/search-bar";
import axios from "axios";
import PlaceTab from "./components/place-tab";
import { useDebounce } from "use-lodash-debounce";
import StationTab from "./components/station-tab";
import { configs } from "../../configs/configs";
import BadConnectionComponent from "./components/bad-connection";
import * as Haptics from "expo-haptics";
import ExpandDownIcon18px from "../../assets/svgs/expand-down-icon-18px";
import PlaceIcon from "../../assets/svgs/place-icon";

const CLOSE_ON_SCROLL_TO = -100;
const CLOSE_ON_VELOCITY = -3;
const PULL_TO_CLOSE_STRING = "Pull down to close";
const RELEASE_TO_CLOSE_STRING = "Release to close";

export default function Search() {
    const { colors } = useTheme();

    const scrollY = new Animated.Value(0);

    const [text, onChangeText] = useState("");
    const [api22Result, setApi22Result] = useState([]);
    const [api21Result, setApi21Result] = useState([]);
    const [error21, setError21] = useState(false);
    const [error22, setError22] = useState(false);
    const [loading, setLoading] = useState(false);

    const [hapticPlayed, setHapticPlayed] = useState(false);
    const [closable, setClosable] = useState(true);

    const [pullDownToCloseString, setPullDownToCloseString] = useState(PULL_TO_CLOSE_STRING);
    const navigation = useNavigation();

    const numberOfApi22Data = 4;

    const debouncedValue = useDebounce(text, 200);

    useEffect(() => {
        if (!hapticPlayed) setPullDownToCloseString(PULL_TO_CLOSE_STRING);
        else setPullDownToCloseString(RELEASE_TO_CLOSE_STRING);
    }, [hapticPlayed]);

    async function simpleApi22Call() {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/stations?query=${text}&max_result=${numberOfApi22Data}`,
                headers: {},
            });

            setError22(false);

            if (result.data.data === undefined && result.data.data === null) {
                setApi22Result([]);
            } else {
                setApi22Result(result.data.data);
            }
        } catch (error) {
            setError22(true);
        }
    }

    async function simpleApi21Call() {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/places?query=${text}`,
                headers: {},
            });

            setError21(false);

            if (result.data === undefined && result.data === null) {
                setApi21Result([]);
            } else {
                setApi21Result(result.data);
            }
        } catch (error) {
            setError21(true);
        }
    }

    useEffect(() => {
        if (text === "") {
            setApi22Result([]);
        } else {
            setLoading(true);
            simpleApi22Call();
            setLoading(false);
        }
    }, [text]);

    useEffect(() => {
        if (text === "") {
            setApi21Result([]);
            setApi22Result([]);
        } else {
            simpleApi21Call();
        }
    }, [debouncedValue]);

    const styles = StyleSheet.create({
        searchbox: {
            paddingVertical: 5,
            paddingHorizontal: 12,
            paddingBottom: 12,
        },
        container: {
            flex: 1,
            backgroundColor: colors.upper_background,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        scrollView: {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        flatList: {
            height: "100%",
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
        topictext: {
            color: colors.subtitle,
            paddingHorizontal: 15,
            fontWeight: "600",
        },
        tabbarcontainer: {
            paddingBottom: 12,
        },
        pullDownToCloseContainer: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: Math.abs(CLOSE_ON_SCROLL_TO) / 2,
            flexDirection: "row",
        },
        pullDownToCloseIconContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
        },
        pullDownToCloseText: {
            fontWeight: "500",
            fontSize: 14,
            color: colors.subtitle,
        },
        trySearchingContainer: {
            width: "100%",
            height: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        trySearchingIconsContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        trySearchingText: {
            width: "75%",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
            marginTop: 10,
            color: colors.subtitle,
        },
    });

    function onScroll(event) {
        scrollY.setValue(event.nativeEvent.contentOffset.y);

        if (!closable) return;
        if (event.nativeEvent.contentOffset.y >= CLOSE_ON_SCROLL_TO) {
            setHapticPlayed(false);
        } else if (event.nativeEvent.contentOffset.y < CLOSE_ON_SCROLL_TO && !hapticPlayed) {
            setHapticPlayed(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    }

    function onScrollBeginDrag(event) {
        setClosable(event.nativeEvent.contentOffset.y === 0);
    }

    function onScrollEndDrag(event) {
        if (!closable) return;

        if (hapticPlayed || event.nativeEvent.velocity.y <= CLOSE_ON_VELOCITY) {
            if (!hapticPlayed) {
                setHapticPlayed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }

            navigation.pop();
        }
    }

    const pullDownToCloseIconRotation = scrollY.interpolate({
        inputRange: [CLOSE_ON_SCROLL_TO, 0],
        outputRange: ["180deg", "0deg"],
        extrapolate: "clamp",
    });

    const PullDownToClose = () => (
        <>
            <View style={styles.pullDownToCloseContainer}>
                <Animated.View
                    style={[
                        styles.pullDownToCloseIconContainer,
                        { transform: [{ rotate: pullDownToCloseIconRotation }] },
                    ]}
                >
                    <ExpandDownIcon18px fill={colors.subtitle} />
                </Animated.View>
                <ThemedText style={styles.pullDownToCloseText}>{pullDownToCloseString}</ThemedText>
            </View>
        </>
    );

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.searchbox}>
                    <Searchbar
                        placeholder="Search destination"
                        onChangeText={onChangeText}
                        value={text}
                    />
                </View>

                <TouchableOpacity onPress={() => onChangeText}></TouchableOpacity>

                <View style={styles.scrollView}>
                    {loading ? (
                        <></>
                    ) : (
                        <>
                            {!(error21 && error22) ? (
                                <ScrollView
                                    style={styles.scrollView}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingBottom: 35,
                                        marginTop: CLOSE_ON_SCROLL_TO,
                                    }}
                                    keyboardDismissMode="interactive"
                                    scrollEventThrottle={16}
                                    onScroll={onScroll}
                                    onScrollBeginDrag={onScrollBeginDrag}
                                    onScrollEndDrag={onScrollEndDrag}
                                >
                                    <PullDownToClose />
                                    {(api22Result !== undefined &&
                                        api22Result !== null &&
                                        api22Result.length !== 0) ||
                                    (api21Result !== undefined &&
                                        api21Result !== null &&
                                        api21Result.length !== 0) ? (
                                        <>
                                            {api22Result !== undefined &&
                                            api22Result !== null &&
                                            api22Result.length !== 0 ? (
                                                <>
                                                    <ThemedText style={styles.topictext}>
                                                        Stations
                                                    </ThemedText>
                                                    <View style={styles.tabbarcontainer}>
                                                        <>
                                                            {api22Result.map((item, key) => (
                                                                <StationTab
                                                                    key={key}
                                                                    place={item.name.en}
                                                                    trip={item.trips}
                                                                ></StationTab>
                                                            ))}
                                                        </>
                                                    </View>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {api21Result !== undefined &&
                                            api21Result !== null &&
                                            api21Result.length !== 0 ? (
                                                <View>
                                                    <ThemedText style={styles.topictext}>
                                                        Places
                                                    </ThemedText>
                                                    <View style={styles.tabbarcontainer}>
                                                        {api21Result.map((item, key) => (
                                                            <PlaceTab
                                                                key={key}
                                                                place={item.name.en}
                                                                address={item.address.en}
                                                            ></PlaceTab>
                                                        ))}
                                                    </View>
                                                </View>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <View style={styles.trySearchingContainer}>
                                                <View style={styles.trySearchingIconsContainer}>
                                                    <PlaceIcon fill={colors.subtitle} />
                                                </View>
                                                <ThemedText style={styles.trySearchingText}>
                                                    Try searching for stations, places, or
                                                    destinations
                                                </ThemedText>
                                            </View>
                                        </>
                                    )}
                                </ScrollView>
                            ) : (
                                <BadConnectionComponent />
                            )}
                        </>
                    )}
                </View>
            </View>
        </>
    );
}
/*
{item.name.en}
*/
