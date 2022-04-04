import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import RecenterButton from "../../components/recenter-button";
import axios from "axios";
import { configs, MockupData } from "../../configs/configs";
import ToFrom from "./components/to-from";
import Fares from "./components/fares";
import RouteShowDetails from "./components/route-show-details";
import BackButton from "../../components/back-button";
import NavigateButton from "../../components/navigate-button";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
};

export default function RouteDetails() {
    const { dark, colors } = useTheme();
    const mapRef = useRef();
    let firstRun = true;

    const [loading, setLoading] = useState(false);
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const [api31Result, setApi31Result] = useState([]);
    const [nearbyStations, setNearbyStations] = useState([]);
    const containerPadding = 15;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        backButtonContainer: {
            position: "absolute",
            top: 0,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            zIndex: 10,
        },
        navigateButtonContainer: {
            position: "absolute",
            top: 0.29 * Dimensions.get("screen").height,
            alignSelf: "flex-end",
            paddingHorizontal: 15,
            zIndex: 10,
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
        scrollView: {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            top: SCREEN_HEIGHT * 0.3,
            width: "100%",
            height: "100%",
            zIndex: 5,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
    });

    useEffect(() => {
        if (firstRun) {
            (async () => {
                recenter();
            })().catch(() => {});
            firstRun = false;
        }
    }, []);

    useEffect(() => {
        //api31call();
        setApi31Result(MockupData);
    },[]);

    useEffect(() => {
        mapRef._updateStyle;
    }, [colors]);

    async function fetchNewLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync().catch(() => {});
        if (status !== "granted") {
            setLocationErrorMessage("Location permission is denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        }).catch(() => {});

        setLocation(location);
        setMapCurrentLocationRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        };
    }

    async function recenter() {
        mapRef.current.animateToRegion(
            (await fetchNewLocation().catch(() => {})) || INITIAL_MAP_REGION,
        );
        setMapsIsRecentered(true);
    }

    function fetchNearbyStations(region) {
        setLoading(true);
        axios
            .get(
                `${configs.API_URL}/station/nearby?lat=${region.latitude}&lng=${
                    region.longitude
                }&radius=${region.latitudeDelta * 111045}`,
                {
                    timeout: 10000,
                },
            )
            .then((response) => {
                setNearbyStations(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setNearbyStations([]);
                setLoading(false);
            });
    }

    function onMapRegionChangeComplete(region) {
        fetchNearbyStations(region);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <MapView
                ref={mapRef}
                style={styles.maps}
                initialRegion={INITIAL_MAP_REGION}
                provider="google"
                customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                onTouchStart={() => setMapsIsRecentered(false)}
                onRegionChangeComplete={(region) => onMapRegionChangeComplete(region)}
                showsUserLocation
            ></MapView>
            <View style={styles.backButtonContainer}>
                <SafeAreaView edges={["top"]} />
                <BackButton />
            </View>
            <View style={styles.navigateButtonContainer}>
                <NavigateButton />
            </View>
            <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 35,
                }}
                keyboardDismissMode="interactive"
                //scrollEventThrottle={16}
                //onScroll={onScroll}
                //onScrollBeginDrag={onScrollBeginDrag}
                //onScrollEndDrag={onScrollEndDrag}
            >
                
                <RouteShowDetails containerPadding={containerPadding} />
            </ScrollView>
        </View>
    );
}
