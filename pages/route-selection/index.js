import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Platform,
    StatusBar,
} from "react-native";
import ThemedText from "../../components/themed-text";
import { useNavigation, useTheme } from "@react-navigation/native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import RecenterButton from "../../components/recenter-button";
import axios from "axios";
import { configs, MockupData, pSBC } from "../../configs/configs";
import OverViewRoute from "./components/overview-route";
import SuggestedRoutes from "./components/suggested-routes";
import RouteSelectionBar from "./components/route-selection-bar";
import FaceCovering from "../route-details/components/face-covering";
import ArrowBackwardIcon from "../../assets/svgs/arrow-backward-24px";
import BackButton from "../../components/back-button";
import { useDebounce } from "use-lodash-debounce";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import RouteNotFoundModal from "./components/route-not-found-modal";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const ROUTE_NOT_FOUND_MODAL_TIMING = 200;

export default function RouteSelection(props) {
    const { dark, colors } = useTheme();
    const mapRef = useRef();
    const [firstRun, setFirstRun] = useState(true);
    const containerPadding = 15;
    const wearFaceMask = true;
    const navigation = useNavigation();
    const hasOverviewRoute = false;

    const [loading, setLoading] = useState(false);
    const [loadingDataFromApi, setLoadingDataFromApi] = useState(true);
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const [showRouteNotFoundModal, setShowRouteNotFoundModal] = useState(false);

    const [nearbyStations, setNearbyStations] = useState([]);
    const debouncedValue = useDebounce(isSwap, 100);

    const routeNotFoundModalOpacityReanimated = useSharedValue(0);

    /*const [destinationName, setDestinationName] = useState("Siam");
    const [destinationData, setDestinationData] = useState({});
    const [originName, setOriginName] = useState("Central World");
    const [originData, setOriginData] = useState({});*/

    const [destinationName, setDestinationName] = useState(
        props.route.params.destination_name || "",
    );
    const [destinationData, setDestinationData] = useState(
        props.route.params.destination_data || {},
    );
    const [originName, setOriginName] = useState(props.route.params.origin_name || "");
    const [originData, setOriginData] = useState(props.route.params.origin_data || {});

    const [selectData, setSelectData] = useState({});

    const [api31Result, setApi31Result] = useState([]);
    const [swapResult, setSwapResult] = useState([]);
    const [error31, setError31] = useState(false);

    const [isClick, setIsClick] = useState(false);

    const [originLatLng, setOriginLatLng] = useState({});
    const [destinationLatLng, setDestinationLatLng] = useState({});

    const [loadPolyline, setLoadPolyline] = useState(false);

    const [isSwap, setIsSwap] = useState(false);
    const [clickSwap, setClickSwap] = useState(false);

    const [originID, setOriginID] = useState("");
    const [destinationID, setDestinationID] = useState("");

    async function api31Call() {
        if (
            swapResult !== undefined &&
            swapResult !== null &&
            swapResult.length !== 0 &&
            clickSwap
        ) {
            let temp = [];
            temp = api31Result;
            setApi31Result(swapResult);
            setSwapResult(temp);
            setClickSwap(false);
            return;
        } else if (isSwap) {
            console.log("we");
            setSwapResult(api31Result);
        }
        console.log(originID);
        console.log(destinationID);
        if (
            isSwap ||
            api31Result === undefined ||
            api31Result === null ||
            api31Result.length === 0
        ) {
            setLoadingDataFromApi(true);

            axios
                .post(
                    `${configs.API_URL}/route/new`,
                    {
                        origin: `${originID}`,
                        destination: `${destinationID}`,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                        },
                    },
                )
                .then((response) => {
                    setError31(false);
                    if (response.data.data === undefined || response.data.data === null) {
                        setApi31Result([]);
                    } else {
                        setApi31Result(response.data.data);
                    }
                })
                .catch((error) => {
                    console.log("catch", error.message);
                    setError31(true);
                })
                .finally(() => {
                    setLoadingDataFromApi(false);
                });
        }
    }

    async function setOrginAndDestination() {
        if (originData.station_id !== undefined && originData.station_id !== null) {
            setOriginID(`station:${originData.station_id}`);
        } else if (originData.id !== undefined && originData.id !== null) {
            setOriginID(`station:${originData.id}`);
        } else if (originData.place_id !== undefined && originData.place_id !== null) {
            setOriginID(`google:${originData.place_id}`);
        } else {
            setOriginID(`coordinates:${originData.latitude},${originData.longitude}`);
        }
        if (destinationData.id !== undefined && destinationData.id !== null) {
            setDestinationID(`station:${destinationData.id}`);
        } else if (
            destinationData.station_id !== undefined &&
            destinationData.station_id !== null
        ) {
            setDestinationID(`station:${destinationData.station_id}`);
        } else if (destinationData.place_id !== undefined && destinationData.place_id !== null) {
            setDestinationID(`google:${destinationData.place_id}`);
        } else {
            setDestinationID(
                `coordinates:${destinationData.latitude},${destinationData.longitude}`,
            );
        }
        console.log("hi");
    }

    function goBack() {
        if (isSwap === true) {
            props.route.params.swapValue();
        }
        navigation.pop();
    }

    function goBackAndFocusOn(on) {
        if (isSwap === true) {
            props.route.params.swapValue();
        }
        props.route.params.focus(on);
        navigation.pop();
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
        },
        maps: {
            flex: 1,
            width: "100%",
            height: "auto",
            marginBottom: -22,
        },
        backButtonContainer: {
            position: "absolute",
            top: 0,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            zIndex: 10,
        },
        scrollView: {
            flex: 2,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            width: "100%",
            height: "auto",
            zIndex: 5,
            //paddingHorizontal: 12,
            paddingVertical: 16,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        line: {
            height: 1,
            backgroundColor: colors.divider,
        },
        topictext: {
            color: colors.subtitle,
            //paddingHorizontal: 15,
            marginTop: 5,
            paddingVertical: 8,
            fontWeight: "600",
        },
        backIcon: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
            left: 12,
        },
        subScrollView: {
            flex: 1,
        },
        marker: {
            width: 20,
            height: 20,
            borderRadius: 30,
            borderWidth: 2.5,
        },
        messageContainer: {
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
        },
        message: {
            fontWeight: "600",
            fontSize: 18,
            padding: 12,
        },
        routeNotFoundInfoText: {
            fontWeight: "600",
            fontSize: 18,
            color: colors.primary,
        },
        modalView: {
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 100,
        },
    });

    useEffect(() => {
        if (
            !(selectData === {} || selectData === undefined || selectData === null) &&
            isClick === true
        ) {
            navigateToRouteDetailsPage(selectData);
        }
        if (isClick === true) {
            setIsClick(false);
        }
    }, [isClick, selectData]);
    useEffect(() => {
        setOrginAndDestination();
    }, [isSwap]);

    useEffect(async () => {
        if (
            originID !== undefined &&
            originID !== null &&
            originID !== "" &&
            destinationID !== undefined &&
            destinationID !== null &&
            destinationID !== ""
        ) {
            api31Call();
        }
        setSelectData({});
    }, [originID, destinationID]);

    useEffect(() => {
        console.log("ktns");
        if (api31Result[0] !== undefined && api31Result[0] !== null) {
            setOriginLatLng({
                latitude: api31Result[0].origin.coordinates.lat,
                longitude: api31Result[0].origin.coordinates.lng,
            });
            setDestinationLatLng({
                latitude: api31Result[0].destination.coordinates.lat,
                longitude: api31Result[0].destination.coordinates.lng,
            });
        }
    }, [api31Result]);

    useEffect(() => {
        if (!firstRun) {
            recenter();
            setLoadPolyline(true);
        } else {
        }
        setFirstRun(false);
    }, [originLatLng, destinationLatLng]);

    useEffect(() => {
        mapRef._updateStyle;
    }, [colors]);

    function navigateToRouteDetailsPage(routeData) {
        navigation.navigate("RouteDetails", {
            routeData: routeData,
            midpoint: middlePoint(
                originLatLng.latitude,
                originLatLng.longitude,
                destinationLatLng.latitude,
                destinationLatLng.longitude,
            ),
        });
    }

    function toDeg(number) {
        return number * (180 / Math.PI);
    }
    function toRad(number) {
        return (number * Math.PI) / 180;
    }

    function middlePoint(lat1, lng1, lat2, lng2) {
        let latitude1 = parseFloat(lat1);
        let longitude1 = parseFloat(lng1);
        let latitude2 = parseFloat(lat2);
        let longitude2 = parseFloat(lng2);
        let latdelta = Math.abs(latitude1 - latitude2) + 0.1;
        let lngdelta = Math.abs(longitude1 - longitude2) + 0.02;
        let lat3 = (latitude1 + latitude2) / 2.0 - 0.015;
        let lng3 = (longitude1 + longitude2) / 2.0;

        return {
            latitude: lat3,
            longitude: lng3,
            latitudeDelta: latdelta,
            longitudeDelta: lngdelta,
        };
    }

    async function recenter() {
        mapRef.current.animateToRegion(
            middlePoint(
                originLatLng.latitude,
                originLatLng.longitude,
                destinationLatLng.latitude,
                destinationLatLng.longitude,
            ) || INITIAL_MAP_REGION,
        );
        setMapsIsRecentered(true);
    }

    function DividerLine() {
        return <View style={styles.line} />;
    }

    function swapValue() {
        const temp = originName;
        const temp2 = originData;
        setOriginName(destinationName);
        setOriginData(destinationData);
        setDestinationName(temp);
        setDestinationData(temp2);
        setClickSwap(true);
        if (isSwap === true) {
            setIsSwap(false);
        } else {
            setIsSwap(true);
        }
    }

    function showRouteNotFoundInfoModal() {
        setShowRouteNotFoundModal(true);
        routeNotFoundModalOpacityReanimated.value = 1;
    }

    function dismissRouteNotFoundInfoModal() {
        routeNotFoundModalOpacityReanimated.value = 0;
        setTimeout(() => setShowRouteNotFoundModal(false), ROUTE_NOT_FOUND_MODAL_TIMING);
    }

    const animatedRouteNotFoundInfoModalOpacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(routeNotFoundModalOpacityReanimated.value, {
                duration: ROUTE_NOT_FOUND_MODAL_TIMING,
                easing: Easing.ease,
            }),
        };
    });

    return (
        <>
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <SafeAreaView edges={["top"]} />
                    <BackButton
                        onPress={() => {
                            goBack();
                        }}
                    />
                </View>
                <MapView
                    ref={mapRef}
                    style={styles.maps}
                    initialRegion={INITIAL_MAP_REGION}
                    // provider="google"
                    showsMyLocationButton={false}
                    customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                    onTouchStart={() => setMapsIsRecentered(false)}
                    showsUserLocation
                    mapPadding={{
                        top: Platform.OS === "android" ? StatusBar.currentHeight : 20,
                        right: 0,
                        bottom: 22,
                        left: 0,
                    }}
                >
                    {originLatLng !== undefined &&
                        originLatLng !== null &&
                        originLatLng !== {} &&
                        destinationLatLng !== undefined &&
                        destinationLatLng !== null &&
                        destinationLatLng !== {} && (
                            <>
                                <Polyline
                                    zIndex={10}
                                    coordinates={[originLatLng, destinationLatLng]}
                                    strokeWidth={14}
                                    strokeColor={pSBC(-0.5, colors.primary)}
                                />
                                <Polyline
                                    zIndex={11}
                                    coordinates={[originLatLng, destinationLatLng]}
                                    strokeWidth={8}
                                    strokeColor={colors.primary}
                                />
                                <Marker coordinate={originLatLng} anchor={{ x: 0.5, y: 0.5 }}>
                                    <View
                                        style={{
                                            ...styles.marker,
                                            backgroundColor: colors.white,
                                            borderColor: colors.middle_grey,
                                        }}
                                    />
                                </Marker>
                                <Marker coordinate={destinationLatLng} anchor={{ x: 0.5, y: 0.5 }}>
                                    <View
                                        style={{
                                            ...styles.marker,
                                            backgroundColor: colors.white,
                                            borderColor: colors.middle_grey,
                                        }}
                                    />
                                </Marker>
                            </>
                        )}
                </MapView>

                <View style={styles.scrollView}>
                    <RouteSelectionBar
                        containerPadding={containerPadding}
                        destinationName={destinationName}
                        destinetionData={destinationData}
                        originName={originName}
                        originData={originData}
                        swapValue={swapValue}
                        goBackAndFocusOn={goBackAndFocusOn}
                    />
                    <DividerLine />

                    <ScrollView
                        style={styles.subScrollView}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 35,
                        }}
                        keyboardDismissMode="interactive"
                    >
                        {wearFaceMask && (
                            <>
                                <FaceCovering containerPadding={containerPadding} />
                                <DividerLine />
                            </>
                        )}
                        {hasOverviewRoute && (
                            <OverViewRoute
                                topictextStyle={styles.topictext}
                                containerPadding={containerPadding}
                            />
                        )}
                        {error31 && (
                            <View style={styles.messageContainer}>
                                <ThemedText style={styles.message}>
                                    Something went wrong.
                                </ThemedText>
                            </View>
                        )}
                        {api31Result !== undefined &&
                            api31Result !== null &&
                            api31Result.length !== 0 &&
                            !loadingDataFromApi && (
                                <SuggestedRoutes
                                    topictextStyle={styles.topictext}
                                    containerPadding={containerPadding}
                                    data={api31Result}
                                    setSelectData={setSelectData}
                                    onPress={() => {
                                        setIsClick(true);
                                    }}
                                />
                            )}

                        {loadingDataFromApi && (
                            <>
                                <SvgAnimatedLinearGradient
                                    style={{
                                        marginHorizontal: 15,
                                        marginTop: 20,
                                        marginBottom: 10,
                                    }}
                                    width={0.4 * Dimensions.get("screen").width}
                                    height={14}
                                    primaryColor={colors.linear_gradient_primary}
                                    secondaryColor={colors.linear_gradient_secondary}
                                ></SvgAnimatedLinearGradient>

                                <SvgAnimatedLinearGradient
                                    style={{ marginHorizontal: 15 }}
                                    width={Dimensions.get("screen").width - 30}
                                    height={50}
                                    primaryColor={colors.linear_gradient_primary}
                                    secondaryColor={colors.linear_gradient_secondary}
                                ></SvgAnimatedLinearGradient>
                            </>
                        )}
                        {api31Result.length === 0 && !loadingDataFromApi && !error31 && (
                            <View style={styles.messageContainer}>
                                <ThemedText style={styles.message}>Route not found</ThemedText>
                                <TouchableOpacity onPress={showRouteNotFoundInfoModal}>
                                    <ThemedText style={styles.routeNotFoundInfoText}>
                                        What's this?
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
            {showRouteNotFoundModal && (
                <Animated.View style={[styles.modalView, animatedRouteNotFoundInfoModalOpacity]}>
                    <RouteNotFoundModal onDismiss={dismissRouteNotFoundInfoModal} />
                </Animated.View>
            )}
        </>
    );
}
//station:BTS_CEN_1
