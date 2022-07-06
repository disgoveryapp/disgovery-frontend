import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import RecenterButton from "../../components/recenter-button";
import BottomCard from "../../components/bottom-card";
import axios from "axios";
import { configs } from "../../configs/configs";
import { getNotificationPermission } from "../../functions/notification";
import LocationOffIcon from "../../assets/svgs/location-off-icon";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangeOfServiceModal from "./change-of-service-modal";
import ThemedText from "../../components/themed-text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_ANIMATION_TIMING = 200;

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
};

export default function Home() {
    const { dark, colors } = useTheme();
    const mapRef = useRef();
    let firstRun = true;

    const [loading, setLoading] = useState(false);
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [locationAccessGranted, setLocationAccessGranted] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const modalOpacityReanimated = useSharedValue(0);

    const [nearbyStations, setNearbyStations] = useState([]);
    let foregroundSubscription = null;
    let firstRecentered = false;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        maps: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
        bottomcard: {
            top: SCREEN_HEIGHT * (8.75 / 3),
            zIndex: 5,
        },
        stationNameMarker: {
            borderRadius: 6,
            paddingVertical: 3,
            paddingHorizontal: 5,
        },
        locationAccessDeniedContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            marginTop: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: colors.background,
            borderRadius: 12,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        locationAccessDeniedText: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.yellow,
            marginLeft: 5,
        },
    });

    useEffect(() => {
        if (firstRun) {
            (async () => {
                AsyncStorage.getItem("change-of-service-19-jun-2022", (err, result) => {
                    if (err) {
                    } else {
                        if (result == null) {
                            modalOpacityReanimated.value = 1;
                            setShowModal(true);
                        }
                    }
                });

                AsyncStorage.setItem(
                    "change-of-service-19-jun-2022",
                    JSON.stringify({ value: "true" }),
                    () => {},
                );

                fetchNewLocation();
                getNotificationPermission();
                recenter();
            })().catch(() => {});
            firstRun = false;
        }
    }, []);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            if (!firstRecentered && mapCurrentLocationRegion) {
                recenter();
                firstRecentered = true;
                subscribed = false;
            }
        }

        return () => {
            subscribed = false;
        };
    }, [mapCurrentLocationRegion]);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            let tempMarkers = [];
            for (let station of nearbyStations) {
                let station_name = station.name.en.replace(/ *\([^)]*\) */g, "").trim();
                let available = false;

                for (let marker of tempMarkers) {
                    if (marker.name === station_name) {
                        available = true;
                        break;
                    }
                }

                if (!available) {
                    tempMarkers.push({
                        type: station.lines
                            ? station.lines[0]
                                ? station.lines[0].route_type
                                : undefined
                            : undefined,
                        name: station_name,
                        coordinates: {
                            latitude: station.coordinates.lat,
                            longitude: station.coordinates.lng,
                        },
                        color: station.lines
                            ? station.lines[0]
                                ? station.lines[0].route_color
                                : undefined
                            : undefined,
                    });
                }
            }

            if (tempMarkers.length > 0) {
                setMarkers(tempMarkers);
            }
        }

        return () => {
            subscribed = false;
        };
    }, [nearbyStations]);

    async function fetchNewLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setLocationErrorMessage("Permission to access location was denied");
            setLocationAccessGranted(false);

            setLocation({
                latitude: INITIAL_MAP_REGION.latitude,
                longitude: INITIAL_MAP_REGION.longitude,
            });

            setMapCurrentLocationRegion(INITIAL_MAP_REGION);

            return;
        }

        foregroundSubscription?.remove();
        foregroundSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 100,
            },
            (location) => {
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                setMapCurrentLocationRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            },
        );
    }

    async function recenter() {
        mapRef.current.animateToRegion(mapCurrentLocationRegion);
        setMapsIsRecentered(true);
    }

    function onModalDismiss() {
        modalOpacityReanimated.value = 0;
        setTimeout(() => setShowModal(false), MODAL_ANIMATION_TIMING);
    }

    function fetchNearbyStations(region) {
        setLoading(true);
        axios
            .get(
                `${configs.API_URL}/station/nearby?lat=${region.latitude}&lng=${
                    region.longitude
                }&radius=${region.latitudeDelta * 111045}`,
                {
                    headers: {
                        Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                    },
                },
            )
            .then((response) => {
                setNearbyStations(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setNearbyStations([]);
                setLoading(false);
            });
    }

    function onMapRegionChangeComplete(region) {
        fetchNearbyStations(region);
    }

    const animatedModalOpacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(modalOpacityReanimated.value, {
                duration: MODAL_ANIMATION_TIMING,
                easing: Easing.ease,
            }),
        };
    });

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <MapView
                ref={mapRef}
                style={styles.maps}
                initialRegion={INITIAL_MAP_REGION}
                // provider="google"
                customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                onTouchStart={() => setMapsIsRecentered(false)}
                onRegionChangeComplete={(region) => onMapRegionChangeComplete(region)}
                showsMyLocationButton={false}
                showsUserLocation
            >
                {/* {Object.keys(markers).map((key) => {
                    console.log(markers[key].color);
                    return (
                        <>
                            {markers[key].color && (
                                <Marker coordinate={markers[key].coordinates}>
                                    <View
                                        style={{
                                            ...styles.stationNameMarker,
                                            backgroundColor: markers[key].color,
                                        }}
                                    >
                                        <ThemedText>{markers[key].name}</ThemedText>
                                    </View>
                                </Marker>
                            )}
                        </>
                    );
                })} */}
            </MapView>

            {!locationAccessGranted && (
                <View style={styles.locationAccessDeniedContainer}>
                    <LocationOffIcon fill={colors.yellow} />
                    <ThemedText style={styles.locationAccessDeniedText}>
                        Location access denied
                    </ThemedText>
                </View>
            )}

            <RecenterButton recentered={mapsIsRecentered} onPress={recenter} />
            <View style={styles.bottomcard}>
                <BottomCard nearbyStations={nearbyStations} loading={loading} />
            </View>

            {showModal && (
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        },
                        animatedModalOpacity,
                    ]}
                >
                    <ChangeOfServiceModal onDismiss={onModalDismiss} />
                </Animated.View>
            )}
        </View>
    );
}
