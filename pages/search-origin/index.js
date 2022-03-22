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

let firstRun = true;

export default function SearchOrigin(props) {
    const { colors } = useTheme();

    const scrollY = new Animated.Value(0);

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

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 13.764889,
        longitude: 100.538266,
    });
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const navigation = useNavigation();
    const numberOfApi22Data = 4;
    const debouncedValue = useDebounce(text, 200);

    const INITIAL_MAP_REGION = {
        latitude: 13.764889,
        longitude: 100.538266,
        latitudeDelta: 0.035,
        longitudeDelta: 0.035,
    };

    useEffect(() => {
        if (firstRun) {
            (async () => {
                await fetchNewLocation();
            })().catch(() => {});
            firstRun = false;
        }
    }, []);

    async function simpleApi22Call() {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/stations?query=${text}&max_result=${numberOfApi22Data}`,
                headers: {},
            });

            setError22(false);

            if (result.data.data === undefined || result.data.data === null) {
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

            if (
                result.data === undefined ||
                result.data === null ||
                result.data.code === ErrorMessage
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
        setInputData(true);
        onChangeText(originInput);
    }, [originInput]);

    useEffect(() => {
        setInputData(true);
        if (destinationInput === destinationName && destinationName !== "") {
        } else {
            onChangeText(destinationInput);
        }
    }, [destinationInput]);

    useEffect(() => {
        if (text === "" || text === "My Location" || onFlip) {
            setInputData(false);
            setApi22Result([]);
        } else {
            setLoading(true);
            simpleApi22Call();
            setLoading(false);
        }
    }, [text]);

    useEffect(() => {
        if (text === "" || text === "My Location" || onFlip) {
            setApi21Result([]);
            setApi22Result([]);
            setFlip(false);
        } else {
            simpleApi21Call();
        }
    }, [debouncedValue]);

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

    function SearchData() {
        return (
            <>
                {(api22Result !== undefined && api22Result !== null && api22Result.length !== 0) ||
                (api21Result !== undefined && api21Result !== null && api21Result.length !== 0) ? (
                    <>
                        {api22Result !== undefined &&
                        api22Result !== null &&
                        api22Result.length !== 0 ? (
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
                                                        setOriginInput(item.name.en);
                                                        setOriginData(item);
                                                    } else if (isSearchDestination) {
                                                        setDestinationInput(item.name.en);
                                                        setDestinationData(item);
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
                        {api21Result !== undefined &&
                        api21Result !== null &&
                        api21Result.length !== 0 ? (
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
                                                    setOriginInput(item.name.en);
                                                    setOriginData(item);
                                                } else if (isSearchDestination) {
                                                    setDestinationInput(item.name.en);
                                                    setDestinationData(item);
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
                ) : (
                    <>
                        <PlaceTab
                            place="My Location"
                            address={currentLocation.latitude + " , " + currentLocation.longitude}
                            onPress={() => {
                                if (isSearchOrigin) {
                                    setOriginInput("My Location");
                                    setOriginData(currentLocation || INITIAL_MAP_REGION);
                                } else if (isSearchDestination) {
                                    setDestinationInput("My Location");
                                    setDestinationData(currentLocation || INITIAL_MAP_REGION);
                                }
                            }}
                        />
                    </>
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
                        placeholder="Search Origin"
                        placeholderLocation="Search Destination"
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
                        autoFocus={true}
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
//location.latitude + " , " + location.longitude
