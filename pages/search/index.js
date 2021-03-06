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
    Dimensions,
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
import RouteIcon from "../../assets/svgs/route-icon";
import LineTab from "./components/line-tab";
import * as Location from "expo-location";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";

const CLOSE_ON_SCROLL_TO = -100;
const CLOSE_ON_VELOCITY = -3;
const PULL_TO_CLOSE_STRING = "Pull down to close";
const RELEASE_TO_CLOSE_STRING = "Release to close";

export default function Search() {
    const { colors } = useTheme();
    let firstRun = true;
    const scrollY = new Animated.Value(0);
    const SEARCH_MODES = ["stationsAndPlaces", "lines"];

    const [text, onChangeText] = useState("");
    const [api23Result, setApi23Result] = useState([]);
    const [api22Result, setApi22Result] = useState([]);
    const [api21Result, setApi21Result] = useState([]);
    const [error21, setError21] = useState(false);
    const [error22, setError22] = useState(false);
    const [error23, setError23] = useState(false);
    const [loading, setLoading] = useState(false);
    const ErrorMessage = "ERR_UNESCAPED_CHARACTERS";

    const [hapticPlayed, setHapticPlayed] = useState(false);
    const [closable, setClosable] = useState(true);
    const [destination_data, setDestination_data] = useState({});

    const [pullDownToCloseString, setPullDownToCloseString] = useState(PULL_TO_CLOSE_STRING);
    const [mode, setMode] = useState("");

    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const TRY_SEARCHING_COMPONENTS = {
        stationsAndPlaces: {
            icon: <PlaceIcon fill={colors.subtitle} />,
            string: "Try searching for stations, places, or destinations",
        },
        lines: {
            icon: <RouteIcon fill={colors.subtitle} />,
            string: "Try searching for bus or train lines",
        },
    };

    const navigation = useNavigation();
    const numberOfApi22Data = 4;
    const debouncedValue = useDebounce(text, 200);

    useEffect(() => {
        if (firstRun) {
            (async () => {
                await fetchNewLocation();
            })().catch(() => {});
            firstRun = false;
        }
    }, []);

    async function fetchNewLocation() {
        setCurrentLocation(await expoFetchNewLocation());
    }

    async function expoFetchNewLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync().catch(() => {});
        if (status !== "granted") {
            setLocationErrorMessage("Location permission is denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        }).catch(() => {});

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
    }

    useEffect(() => {
        if (!hapticPlayed) setPullDownToCloseString(PULL_TO_CLOSE_STRING);
        else setPullDownToCloseString(RELEASE_TO_CLOSE_STRING);
    }, [hapticPlayed]);

    async function simpleApi23Call() {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/lines?query=${text}`,
                headers: {
                    Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                },
            });

            setError23(false);

            if (result.data.data === undefined || result.data.data === null) {
                setApi23Result([]);
            } else {
                setApi23Result(result.data.data);
            }
        } catch (error) {
            setError23(true);
        }
    }

    async function simpleApi22Call() {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/stations?query=${text}&max_result=${numberOfApi22Data}`,
                headers: {
                    Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                },
            });

            setError22(false);

            if (
                result.data.data === undefined ||
                result.data.data === null ||
                result.data.data === [] ||
                Object.keys(result.data.data).length === 0
            ) {
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
                headers: {
                    Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                },
            });

            setError21(false);

            if (
                result.data === undefined ||
                result.data === null ||
                result.data.code === ErrorMessage ||
                result.data === [] ||
                Object.keys(result.data).length === 0
            ) {
                setApi21Result([]);
            } else {
                setApi21Result(result.data);
            }
        } catch (error) {
            setError21(true);
        }
    }

    useEffect(async () => {
        if (mode === SEARCH_MODES[0]) {
            if (text === "") {
                setApi22Result([]);
            } else {
                setLoading(true);
                await simpleApi22Call();
                setLoading(false);
            }
        } else if (mode === SEARCH_MODES[1]) {
            if (text === "") {
                setApi23Result([]);
            } else {
                setLoading(true);
                await simpleApi23Call();
                setLoading(false);
            }
        }
    }, [text]);

    useEffect(() => {
        if (mode === SEARCH_MODES[0]) {
            if (text === "") {
                setApi21Result([]);
                setApi22Result([]);
            } else {
                simpleApi21Call();
            }
        }
    }, [debouncedValue]);
    useEffect(() => {
        if (mode === SEARCH_MODES[0]) {
            if (text === "") {
                setApi21Result([]);
                setApi22Result([]);
            } else {
                setLoading(true);
                simpleApi21Call();
                simpleApi22Call();
                setLoading(false);
            }
        } else if (mode === SEARCH_MODES[1]) {
            if (text === "") {
                setApi23Result([]);
            } else {
                setLoading(true);
                simpleApi23Call();
                setLoading(false);
            }
        }
    }, [mode]);

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
        messageContainer: {
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center",
        },
        message: {
            fontWeight: "600",
            fontSize: 16,
            padding: 12,
            color: colors.subtitle,
        },
        loadingBlock: {
            marginTop: 30,
            marginLeft: 18,
        },

        subloadingBlock: {
            flexDirection: "row",
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
        setClosable(event.nativeEvent.contentOffset.y <= 10);
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

    function navigateToSearchOriginPage(destination_name, destination_data) {
        navigation.navigate("SearchOrigin", {
            destination_name: destination_name,
            destination_data: destination_data,
        });
    }

    function navigateToStationDetailsPage(stop_id) {
        navigation.navigate("StationDetails", { stop_id: stop_id });
    }

    function changeMode(mode) {
        setMode(mode);
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

    function StationAndPlaceScrollView() {
        return (
            <>
                {!loading && (
                    <>
                        {api22Result !== undefined &&
                            api22Result !== null &&
                            api22Result.length !== 0 && (
                                <>
                                    <ThemedText style={styles.topictext}>Stations</ThemedText>
                                    <View style={styles.tabbarcontainer}>
                                        <>
                                            {api22Result.map((item, key) => (
                                                <StationTab
                                                    key={key}
                                                    place={item.name.en}
                                                    trip={item.trips}
                                                    onPress={() => {
                                                        setDestination_data(item);
                                                        navigateToStationDetailsPage(
                                                            item.station_id,
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </>
                                    </View>
                                </>
                            )}
                        {api21Result !== undefined &&
                            api21Result !== null &&
                            api21Result.length !== 0 && (
                                <View>
                                    <ThemedText style={styles.topictext}>Places</ThemedText>
                                    <View style={styles.tabbarcontainer}>
                                        {api21Result.map((item, key) => (
                                            <PlaceTab
                                                key={key}
                                                place={item.name.en}
                                                address={item.address.en}
                                                onPress={() => {
                                                    setDestination_data(item);
                                                    navigateToSearchOriginPage(item.name.en, item);
                                                }}
                                            />
                                        ))}
                                    </View>
                                </View>
                            )}
                    </>
                )}
                {loading && (
                    <View style={styles.loadingBlock}>
                        <View style={styles.subloadingBlock}>
                            <SvgAnimatedLinearGradient
                                style={{ marginRight: 10 }}
                                width={30}
                                height={30}
                                primaryColor={colors.linear_gradient_primary}
                                secondaryColor={colors.linear_gradient_secondary}
                            ></SvgAnimatedLinearGradient>

                            <SvgAnimatedLinearGradient
                                width={0.7 * Dimensions.get("screen").width}
                                height={30}
                                primaryColor={colors.linear_gradient_primary}
                                secondaryColor={colors.linear_gradient_secondary}
                            ></SvgAnimatedLinearGradient>
                        </View>
                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 10, marginLeft: 40 }}
                            width={0.5 * Dimensions.get("screen").width}
                            height={20}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        ></SvgAnimatedLinearGradient>
                    </View>
                )}
            </>
        );
    }

    function LinesScrollView() {
        return (
            <>
                <View style={styles.tabbarcontainer}>
                    {currentLocation !== undefined &&
                    currentLocation !== null &&
                    currentLocation !== {} &&
                    api23Result !== undefined &&
                    api23Result !== null &&
                    api23Result.length !== 0 ? (
                        <>
                            <ThemedText style={styles.topictext}>Lines</ThemedText>
                            {api23Result.map((item, key) => (
                                <>
                                    <LineTab
                                        type={item.type}
                                        route_name={item.name}
                                        color={item.color}
                                        currentLocation={currentLocation}
                                        stationData={item.stations}
                                        onPress={(nearestId) =>
                                            navigateToStationDetailsPage(nearestId)
                                        }
                                        loading={false}
                                    />
                                </>
                            ))}
                        </>
                    ) : (
                        <>
                            {!loading &&
                            currentLocation !== undefined &&
                            currentLocation !== null &&
                            currentLocation !== {} ? (
                                <View style={styles.messageContainer}>
                                    <ThemedText style={styles.message}>Route not found</ThemedText>
                                </View>
                            ) : (
                                <>
                                    <ThemedText style={styles.topictext}>Lines</ThemedText>
                                    <LineTab loading={true} />
                                </>
                            )}
                        </>
                    )}
                </View>
            </>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.searchbox}>
                    <Searchbar
                        placeholder="Search destination"
                        onChangeText={onChangeText}
                        value={text}
                        onModeChange={changeMode}
                    />
                </View>

                <View style={styles.scrollView}>
                    <>
                        {!((error21 && error22) || error23) ? (
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
                                {text !== "" ? (
                                    <>
                                        {mode == SEARCH_MODES[0] && <StationAndPlaceScrollView />}
                                        {mode == SEARCH_MODES[1] && <LinesScrollView />}
                                    </>
                                ) : (
                                    <View style={styles.trySearchingContainer}>
                                        <View style={styles.trySearchingIconsContainer}>
                                            {mode ? TRY_SEARCHING_COMPONENTS[mode].icon : <></>}
                                        </View>
                                        <ThemedText style={styles.trySearchingText}>
                                            {mode ? TRY_SEARCHING_COMPONENTS[mode].string : ""}
                                        </ThemedText>
                                    </View>
                                )}
                            </ScrollView>
                        ) : (
                            <BadConnectionComponent />
                        )}
                    </>
                </View>
            </View>
        </>
    );
}
