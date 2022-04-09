import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import ThemedText from "../../components/themed-text";
import { useNavigation, useTheme } from "@react-navigation/native";
import MapView, { Polyline, Marker } from "react-native-maps";
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

export default function RouteDetails(props) {
    const { dark, colors } = useTheme();
    const mapRef = useRef();
    let firstRun = true;
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const [api31Result, setApi31Result] = useState([]);
    const [nearbyStations, setNearbyStations] = useState([]);
    const routeData = props.route.params.routeData || {};
    const containerPadding = 15;

    const originLatLng = {
        lat: MockupData[0].origin.coordinates.lat,
        lng: MockupData[0].origin.coordinates.lng,
    };
    const destinationLatLng = {
        lat: MockupData[0].destination.coordinates.lat,
        lng: MockupData[0].destination.coordinates.lng,
    };

    function goBack() {
        navigation.pop();
    }

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
            alignSelf: "flex-end",
            paddingHorizontal: 15,
            paddingBottom: 10,
            zIndex: 10,
        },
        maps: {
            flex: 2,
            width: "100%",
            height: "auto",
            marginBottom: -80,
        },
        bottomDetail: {
            flex: 3,
            width: "100%",
            height: "auto",
        },
        scrollView: {
            flex: 2,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            width: "100%",
            height: "auto",
            zIndex: 5,
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
        subScrollView: {
            flex: 1,
        },
        marker: {
            width: 20,
            height: 20,
            borderRadius: 30,
            borderWidth: 2.5,
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
        mapRef._updateStyle;
    }, [colors]);
    useEffect(() => {
        console.log(routeData);
    }, []);

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

    function getAllCoordinate(lookData) {
        let result = [];
        lookData = lookData || [];
        for (let i = 0; i < lookData.length; i++) {
            result.push({
                latitude: lookData[i].coordinates.lat,
                longitude: lookData[i].coordinates.lng,
            });
        }
        console.log(result);
        return result;
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
                provider="google"
                customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                onTouchStart={() => setMapsIsRecentered(false)}
                onRegionChangeComplete={(region) => onMapRegionChangeComplete(region)}
                showsUserLocation
            >
                {MockupData[0].directions.map((item, key) => (
                    <>
                        {item.type === "board" ? (
                            <Polyline
                                coordinates={getAllCoordinate(item.passing)}
                                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeColors={[`#${item.via_line.color}`]}
                                strokeWidth={6}
                            />
                        ) : (
                            <></>
                        )}
                        <Marker
                            coordinate={{
                                latitude: item.from.coordinates.lat,
                                longitude: item.from.coordinates.lng,
                            }}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <View
                                style={{
                                    ...styles.marker,
                                    backgroundColor: colors.white,
                                    borderColor: colors.middle_grey,
                                }}
                            />
                        </Marker>
                        <Marker
                            coordinate={{
                                latitude: item.to.coordinates.lat,
                                longitude: item.to.coordinates.lng,
                            }}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <View
                                style={{
                                    ...styles.marker,
                                    backgroundColor: colors.white,
                                    borderColor: colors.middle_grey,
                                }}
                            />
                        </Marker>
                    </>
                ))}
            </MapView>
            <View style={styles.bottomDetail}>
                <View style={styles.navigateButtonContainer}>
                    <NavigateButton />
                </View>
                <View style={styles.scrollView}>
                    <ScrollView
                        style={styles.subScrollView}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 35,
                        }}
                        keyboardDismissMode="interactive"
                    >
                        {/* <ToFrom containerPadding={containerPadding} data={routeData}/>
                        <Fares containerPadding={containerPadding} data={routeData}/> */}
                        <RouteShowDetails containerPadding={containerPadding} />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
