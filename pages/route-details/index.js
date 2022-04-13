import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    StatusBar,
} from "react-native";
import ThemedText from "../../components/themed-text";
import { useNavigation, useTheme } from "@react-navigation/native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import RecenterButton from "../../components/recenter-button";
import axios from "axios";
import { configs, MockupData, getRouteTypeString, snapToPolyline } from "../../configs/configs";
import ToFrom from "./components/to-from";
import Fares from "./components/fares";
import RouteShowDetails from "./components/route-show-details";
import BackButton from "../../components/back-button";
import NavigateButton from "../../components/navigate-button";
import { decode } from "@googlemaps/polyline-codec";

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

    const [routeData, setRouteData] = useState(props.route.params.routeData || {});

    const [polylines, setPolylines] = useState([]);
    const [directions, setDirections] = useState([]);
    const [currentDirection, setCurrentDirection] = useState([]);
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
        recenter();
    }, [polylines]);

    useEffect(() => {
        mapRef._updateStyle;
    }, [colors]);
    useEffect(() => {
        parseDirections();
        parsePolylines();
        setRouteData(props.route.params.routeData);
        console.log({} === {});
    }, []);

    useEffect(() => {
        console.log(directions, "direction");
    }, [directions]);

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
        return result;
    }

    async function recenter() {
        mapRef.current.animateToRegion(props.route.params.midpoint || INITIAL_MAP_REGION);
        setMapsIsRecentered(true);
    }

    async function parsePolylines() {
        let tempPolylines = [];

        for (let direction of routeData.directions) {
            if (direction.type === "walk") {
                tempPolylines.push({
                    route_id: `walk_from_${direction.from.coordinates.lat}_${direction.from.coordinates.lng}_to_${direction.to.coordinates.lat}_${direction.to.coordinates.lng}`,
                    polyline: decodePolyline(direction.route.overview_polyline.points),
                    color: colors.go_button,
                });
            } else if (direction.type === "board") {
                try {
                    let shapeEncoded = await getShape(
                        direction.via_line.id,
                        direction.from.coordinates,
                        direction.to.coordinates,
                    );

                    tempPolylines.push({
                        route_id: direction.via_line.id,
                        polyline: decodePolyline(shapeEncoded),
                        color: `#${direction.via_line.color}`,
                    });
                } catch (error) {
                    console.error(error.message);
                }
            }
        }

        setPolylines([...tempPolylines]);
    }

    async function getShape(routeId, fromCoordinates, toCoordinates) {
        let response = await axios.get(
            `${configs.API_URL}/shape/${routeId}?from=${fromCoordinates.lat},${fromCoordinates.lng}&to=${toCoordinates.lat},${toCoordinates.lng}`,
            {
                headers: {
                    Authorization: `Bearer ${configs.PERSISTENT_JWT}`,
                },
            },
        );

        if (response.data.data) {
            if (response.data.data.shape_encoded) return response.data.data.shape_encoded;
        }

        return;
    }

    function decodePolyline(polyline) {
        const decoded = decode(polyline, 5);
        let decodedPolyline = [];

        decoded.forEach((element) => {
            decodedPolyline.push({ latitude: element[0], longitude: element[1] });
        });

        return decodedPolyline;
    }

    function parseDirections() {
        let tempDirections = [];

        for (let i in routeData.directions) {
            if (routeData.directions[i].type === "board") {
                let boardDirection = {
                    text: `Board ${getRouteTypeString(
                        routeData.directions[i].via_line.type || "0",
                        false,
                    )} from ${routeData.directions[i].from.station.name.en} to ${
                        routeData.directions[i].to.station.name.en
                    }`,
                };

                let alightDirection = {
                    text: `Alight at ${routeData.directions[i].to.station.name.en}`,
                };

                for (let j in routeData.directions[i].passing) {
                    if (parseInt(j) < routeData.directions[i].passing.length - 2) {
                        let snappedCoordinates = snapToPolyline(polylines, {
                            latitude: routeData.directions[i].passing[j].coordinates.lat,
                            longitude: routeData.directions[i].passing[j].coordinates.lng,
                        });

                        tempDirections.push({
                            ...boardDirection,
                            near: {
                                lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                                lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                            },
                            subtext: `Next: ${
                                routeData.directions[i].passing[parseInt(j) + 1].station.name.en
                            }`,
                        });
                    } else {
                        let snappedCoordinates = snapToPolyline(polylines, {
                            latitude: routeData.directions[i].passing[j].coordinates.lat,
                            longitude: routeData.directions[i].passing[j].coordinates.lng,
                        });

                        tempDirections.push({
                            ...alightDirection,
                            near: {
                                lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                                lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                            },
                        });
                        break;
                    }
                }
            } else if (routeData.directions[i].type === "walk") {
                for (let step of routeData.directions[i].route.steps) {
                    tempDirections.push({
                        distance: { text: `In ${step.distance.text}`, value: step.distance.value },
                        text: htmlToText(step.html_instructions),
                        near: routeData.directions[i].start_location,
                    });
                }
            } else if (routeData.directions[i].type === "transfer") {
                let snappedCoordinates = snapToPolyline(polylines, {
                    latitude: routeData.directions[i].from.coordinates.lat,
                    longitude: routeData.directions[i].from.coordinates.lng,
                });

                tempDirections.push({
                    text: `Transfer from ${routeData.directions[i].from.station.name.en} to ${routeData.directions[i].to.station.name.en}`,
                    near: {
                        lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                        lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                    },
                });
            }

            if (parseInt(i) === routeData.directions.length - 1) {
                if (routeData.directions[routeData.directions.length - 1].type === "walk") {
                    tempDirections.push({
                        text: `You have arrived at ${
                            routeData.directions[routeData.directions.length - 1].to.place.address
                        }`,
                        near: routeData.directions[routeData.directions.length - 1].to.coordinates,
                    });
                } else if (routeData.directions[routeData.directions.length - 1].type === "board") {
                    let snappedCoordinates = snapToPolyline(polylines, {
                        latitude: routeData.destination.coordinates.lat,
                        longitude: routeData.destination.coordinates.lng,
                    });

                    tempDirections.push({
                        text: `You have arrived at ${routeData.destination.station.name.en}`,
                        near: {
                            lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                            lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                        },
                    });
                }
            }
        }

        //console.log(tempDirections, "tempData");
        setDirections([...tempDirections]);
        setCurrentDirection(tempDirections[0]);
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
                mapPadding={{
                    top: Platform.OS === "android" ? StatusBar.currentHeight : 20,
                    right: 0,
                    bottom: 22,
                    left: 0,
                }}
            >
                {polylines !== undefined && polylines !== null && polylines.length !== 0 && (
                    <>
                        {polylines.map((item, key) => (
                            <>
                                <Polyline
                                    key={key}
                                    coordinates={item.polyline}
                                    strokeColor="#fff" // fallback for when `strokeColors` is not supported by the map-provider
                                    strokeColors={[item.color]}
                                    strokeWidth={6}
                                />
                                <Marker coordinate={item.polyline[0]} anchor={{ x: 0.5, y: 0.5 }}>
                                    <View
                                        style={{
                                            ...styles.marker,
                                            backgroundColor: colors.white,
                                            borderColor: colors.middle_grey,
                                        }}
                                    />
                                </Marker>
                                <Marker
                                    coordinate={item.polyline[item.polyline.length - 1]}
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
                    </>
                )}
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
                        <RouteShowDetails containerPadding={containerPadding} data={routeData} />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
