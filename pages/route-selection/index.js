import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import RecenterButton from "../../components/recenter-button";
import axios from "axios";
import { configs, MockupData } from "../../configs/configs";
import OverViewRoute from "./components/overview-route";
import SuggestedRoutes from "./components/suggested-routes";
import RouteSelectionBar from "./components/route-selection-bar";
import FaceCovering from "../route-details/components/face-covering";
import ArrowBackwardIcon from "../../assets/svgs/arrow-backward-24px";
import BackButton from "../../components/back-button";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
};

export default function RouteSelection(props) {
    const { dark, colors } = useTheme();
    const mapRef = useRef();
    let firstRun = true;
    const containerPadding = 15;
    const wearFaceMask = true;

    const [loading, setLoading] = useState(false);
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const [nearbyStations, setNearbyStations] = useState([]);

    const [destinationName, setDestinationName] = useState(
        props.route.params.destination_name || "",
    );
    const [destinationData, setDestinationData] = useState(
        props.route.params.destination_data || {},
    );
    const [originName, setOriginName] = useState(props.route.params.origin_name || "");
    const [originData, setOriginData] = useState(props.route.params.origin_data || {});

    const [api31Result, setApi31Result] = useState([]);
    const [error31, setError31] = useState(false);

    async function api31Call() {
        try {
            await axios
                .post(`${configs.API_URL}/route/new`, {
                    origin: "coordinates:13.7623641,100.4719031",
                    destination: "coordinates:13.7546154,100.5324766",
                    headers: {
                        Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                    },
                    timeout: 10000,
                })
                .then(function (result) {
                    console.log(result.data);
                    setError31(false);

                    if (result.data.data === undefined || result.data.data === null) {
                        setApi31Result([]);
                    } else {
                        setApi31Result(result.data.data);
                    }
                });
        } catch (error) {
            setError31(true);
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
        },
        maps: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
        backButtonContainer: {
            position: "absolute",
            top: 0,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            zIndex: 10,
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
            top: SCREEN_HEIGHT * 0.22,
            width: "100%",
            height: "100%",
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
        subScrollView: {},
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
        //api31Call();
        setApi31Result(MockupData);
        console.log(api31Result, ":result");
    }, []);

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
                    headers: {
                        Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                    },
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
    function DividerLine() {
        return <View style={styles.line} />;
    }

    /*function BackButton() {
        return (
            <TouchableOpacity style={styles.backIcon}>
                <ArrowBackwardIcon fill={colors.text} />
            </TouchableOpacity>
        );
    }*/

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
            <View style={styles.scrollView}>
                <RouteSelectionBar containerPadding={containerPadding} />
                <DividerLine />
                {wearFaceMask && (
                    <>
                        <FaceCovering containerPadding={containerPadding} />
                        <DividerLine />
                    </>
                )}
                <ScrollView
                    style={styles.subScrollView}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 35,
                    }}
                    keyboardDismissMode="interactive"
                >
                    <OverViewRoute
                        topictextStyle={styles.topictext}
                        containerPadding={containerPadding}
                    />
                    <SuggestedRoutes
                        topictextStyle={styles.topictext}
                        containerPadding={containerPadding}
                    />
                </ScrollView>
            </View>
        </View>
    );
}
//station:BTS_CEN_1
