import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import { useDebounce } from "use-lodash-debounce";
import { configs } from "../../configs/configs";
import * as Haptics from "expo-haptics";
import ExpandDownIcon18px from "../../assets/svgs/expand-down-icon-18px";
import PlaceIcon from "../../assets/svgs/place-icon";
import RouteIcon from "../../assets/svgs/route-icon";
import SearchOriginBar from "./components/search-origin-bar";
import PlaceTab from "../search/components/place-tab";
import StationTab from "../search/components/station-tab";
import * as Location from "expo-location";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";

let foregroundSubscription = null;

export const MyLocation = "Current location";

export default function SearchOrigin(props) {
    const { colors } = useTheme();

    const scrollY = new Animated.Value(0);
    let firstRun = true;
    const [text, onChangeText] = useState("");
    const [destinationInput, setDestinationInput] = useState(
        props.route.params.destination_name || "",
    );
    const [destinationName, setDestinationName] = useState(
        props.route.params.destination_name || "",
    );
    const [originInput, setOriginInput] = useState("");
    const [originData, setOriginData] = useState({});
    const [destinationData, setDestinationData] = useState(
        props.route.params.destination_data || {},
    );
    const [isSearchOrigin, setIsSearchOrigin] = useState(true);
    const [isSearchDestination, setIsSearchDestination] = useState(false);
    const [onFlip, setFlip] = useState(false);
    const [api22Result, setApi22Result] = useState([]);
    const [api21Result, setApi21Result] = useState([]);
    const [error21, setError21] = useState(false);
    const [error22, setError22] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState(true);
    const ErrorMessage = "ERR_UNESCAPED_CHARACTERS";

    const [isClick, setIsClick] = useState(false);
    const [tabOneFocus, setTabOneFocus] = useState(true);

    const [currentLocation, setCurrentLocation] = useState(undefined);
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const navigation = useNavigation();
    const numberOfApi22Data = 4;
    const debouncedValue = useDebounce(text, 200);

    function swapValue() {
        const temp = originInput;
        const temp2 = originData;
        setOriginInput(destinationInput);
        setOriginData(destinationData);
        setDestinationInput(temp);
        setDestinationData(temp2);
        setInputData(false);
        setApi21Result([]);
        setApi22Result([]);

        t1.current.blur();
        t2.current.blur();
    }

    useEffect(() => {
        if (firstRun) {
            (async () => {
                await expoFetchNewLocation();
            })().catch(() => {});
            firstRun = false;
        }
    }, []);

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

    useEffect(() => {
        onChangeText(originInput);
    }, [originInput]);

    useEffect(() => {
        if (destinationInput === destinationName && destinationName !== "") {
        } else {
            onChangeText(destinationInput);
        }
    }, [destinationInput]);

    useEffect(() => {
        setInputData(true);
        if (text === "" || text === MyLocation) {
            setLoading(true);
            setApi22Result([]);
            setLoading(false);
        } else {
            setLoading(true);
            simpleApi22Call();
            setLoading(false);
        }
    }, [text]);

    useEffect(() => {
        if (text === "" || text === MyLocation) {
            setApi21Result([]);
            setApi22Result([]);
        } else {
            simpleApi21Call();
        }
    }, [debouncedValue]);

    useEffect(() => {
        if (isClick === true) {
            goNavigate();
        }
        setIsClick(false);
    }, [originData, destinationData, isClick]);

    const t1 = useRef();
    const t2 = useRef();

    function focus(on) {
        if (on === "origin") {
            // focus on origin search box
            setIsSearchOrigin(true);
            setIsSearchDestination(false);
            setTabOneFocus(true);
            setTimeout(() => {
                t1.current.focus();
            }, 100);
            console.log("focus on origin");
        } else if (on === "destination") {
            // focus on destination search box
            setIsSearchDestination(true);
            setIsSearchOrigin(false);
            setTabOneFocus(false);
            setTimeout(() => {
                t2.current.focus();
            }, 100);
            console.log("focus on destination");
        }
    }

    async function expoFetchNewLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync().catch(() => {});
        if (status !== "granted") {
            setLocationErrorMessage("Location permission is denied");
            return;
        }

        foregroundSubscription?.remove();
        foregroundSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10,
            },
            (location) => {
                setCurrentLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            },
        );
    }

    function navigateToRouteSelectionPage(
        destination_name,
        destination_data,
        origin_name,
        origin_data,
    ) {
        navigation.navigate("RouteSelection", {
            destination_name: destination_name,
            destination_data: destination_data,
            origin_name: origin_name,
            origin_data: origin_data,
            focus: focus,
            swapValue: swapValue,
        });
    }

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
        trySearchingContainer: {
            width: "100%",
            height: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
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

    function goNavigate() {
        if (
            originData !== undefined &&
            originData !== null &&
            Object.keys(originData).length !== 0 &&
            destinationData !== undefined &&
            destinationData !== null &&
            Object.keys(destinationData).length !== 0
        ) {
            navigateToRouteSelectionPage(
                destinationInput,
                destinationData,
                originInput,
                originData,
            );
        }
    }

    function SearchData() {
        return (
            <>
                {!currentLocation && (
                    <>
                        <View
                            style={{
                                paddingHorizontal: 15,
                                marginTop: 10,
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 15,
                            }}
                        >
                            <SvgAnimatedLinearGradient
                                style={{ marginRight: 10 }}
                                width={30}
                                height={30}
                                primaryColor={colors.linear_gradient_primary}
                                secondaryColor={colors.linear_gradient_secondary}
                            />
                            <SvgAnimatedLinearGradient
                                width={0.7 * Dimensions.get("screen").width}
                                height={30}
                                primaryColor={colors.linear_gradient_primary}
                                secondaryColor={colors.linear_gradient_secondary}
                            />
                        </View>
                    </>
                )}

                {currentLocation && (
                    <PlaceTab
                        style={{ marginTop: -15, marginBottom: 15 }}
                        place={MyLocation}
                        // address={currentLocation.latitude + " , " + currentLocation.longitude}
                        onPress={() => {
                            if (isSearchOrigin) {
                                if (MyLocation === destinationInput) {
                                } else {
                                    setOriginInput(MyLocation);
                                    setOriginData(currentLocation);
                                    setIsClick(true);
                                }
                            } else if (isSearchDestination) {
                                if (MyLocation === originInput) {
                                } else {
                                    setDestinationInput(MyLocation);
                                    setDestinationData(currentLocation);
                                    setIsClick(true);
                                }
                            }
                        }}
                        icon={"your-location"}
                    />
                )}

                {api22Result !== undefined && api22Result !== null && api22Result.length !== 0 ? (
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
                                            if (isSearchOrigin) {
                                                if (item.name.en === destinationInput) {
                                                } else {
                                                    setOriginInput(item.name.en);
                                                    setOriginData(item);
                                                    setIsClick(true);
                                                }
                                            } else if (isSearchDestination) {
                                                if (item.name.en === originInput) {
                                                } else {
                                                    setDestinationInput(item.name.en);
                                                    setDestinationData(item);
                                                    setIsClick(true);
                                                }
                                            }
                                        }}
                                    />
                                ))}
                            </>
                        </View>
                    </>
                ) : (
                    <></>
                )}
                {api21Result !== undefined && api21Result !== null && api21Result.length !== 0 ? (
                    <View>
                        <ThemedText style={styles.topictext}>Places</ThemedText>
                        <View style={styles.tabbarcontainer}>
                            {api21Result.map((item, key) => (
                                <PlaceTab
                                    key={key}
                                    place={item.name.en}
                                    address={item.address.en}
                                    onPress={() => {
                                        if (isSearchOrigin) {
                                            if (item.name.en === destinationInput) {
                                            } else {
                                                setOriginInput(item.name.en);
                                                setOriginData(item);
                                                setIsClick(true);
                                            }
                                        } else if (isSearchDestination) {
                                            if (item.name.en === originInput) {
                                            } else {
                                                setDestinationInput(item.name.en);
                                                setDestinationData(item);
                                                setIsClick(true);
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                ) : (
                    <></>
                )}
            </>
        );
    }
    function SearchSomething() {
        return (
            <View style={styles.trySearchingContainer}>
                <View style={styles.trySearchingIconsContainer}>
                    <PlaceIcon fill={colors.subtitle} />
                </View>
                <ThemedText style={styles.trySearchingText}>
                    Try searching for stations, places, or destinations
                </ThemedText>
            </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.searchbox}>
                    <SearchOriginBar
                        placeholder="Search origin"
                        placeholderLocation="Search destination"
                        onChangeText={setOriginInput}
                        value={originInput}
                        onChangeTextLocation={setDestinationInput}
                        valueLocation={destinationInput}
                        onPressOriginIn={() => {
                            onChangeText(originInput);
                            setIsSearchOrigin(true);
                            setIsSearchDestination(false);
                        }}
                        onPressDestinationIn={() => {
                            onChangeText(destinationInput);
                            setIsSearchOrigin(false);
                            setIsSearchDestination(true);
                        }}
                        setFlip={setFlip}
                        swapValue={swapValue}
                        tabOneFocus={tabOneFocus}
                        t1={t1}
                        t2={t2}
                    />
                </View>

                <View style={styles.scrollView}>
                    {!loading && (
                        <>
                            {!(error21 && error22) ? (
                                <ScrollView
                                    style={styles.scrollView}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingBottom: 35,
                                        marginTop: 15,
                                    }}
                                    keyboardDismissMode="interactive"
                                    scrollEventThrottle={16}
                                >
                                    {inputData ? <SearchData /> : <SearchSomething />}
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
