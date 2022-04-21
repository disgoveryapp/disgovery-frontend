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
import {
    configs,
    MockupData,
    getRouteTypeString,
    snapToPolyline,
    pSBC,
} from "../../configs/configs";
import ToFrom from "./components/to-from";
import Fares from "./components/fares";
import RouteShowDetails from "./components/route-show-details";
import BackButton from "../../components/back-button";
import NavigateButton from "../../components/navigate-button";
import { decode } from "@googlemaps/polyline-codec";
import FaceCovering from "./components/face-covering";

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
    const wearFaceMask = true;

    const [loading, setLoading] = useState(false);
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const [routeData, setRouteData] = useState(props.route.params.routeData || {});

    const [polylines, setPolylines] = useState([]);
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
        line: {
            height: 1,
            backgroundColor: colors.divider,
        },
        faresContainer: {
            height: 58,
            justifyContent: "center",
        },
    });

    useEffect(() => {
        recenter();
    }, [polylines]);

    useEffect(() => {
        mapRef._updateStyle;
    }, [colors]);

    useEffect(() => {
        parsePolylines();
        setRouteData(props.route.params.routeData);
        console.log({} === {});
        console.log(polylines);
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

    function DividerLine() {
        return <View style={styles.line} />;
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
            } else if (direction.type === "transfer") {
                if (direction.encoded_polyline) {
                    tempPolylines.push({
                        route_id: `transfer_from_${direction.from.coordinates.lat}_${direction.from.coordinates.lng}_to_${direction.to.coordinates.lat}_${direction.to.coordinates.lng}`,
                        polyline: decodePolyline(direction.encoded_polyline),
                        color: colors.go_button,
                    });
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

    function onNavigateButtonPress() {
        console.log(routeData);
        navigation.navigate("Navigation", {
            route_data: routeData,
        });
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
                // provider="google"
                showsMyLocationButton={false}
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
                                    key={`${key}_outer`}
                                    zIndex={10}
                                    coordinates={item.polyline}
                                    strokeWidth={14}
                                    strokeColor={pSBC(-0.5, item.color)}
                                />
                                <Polyline
                                    key={`${key}_inner`}
                                    zIndex={11}
                                    coordinates={item.polyline}
                                    strokeWidth={8}
                                    strokeColor={item.color}
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
                    <NavigateButton onPress={onNavigateButtonPress} />
                </View>
                <View style={styles.scrollView}>
                    <ToFrom containerPadding={containerPadding} data={routeData} />
                    <DividerLine />
                    <Fares containerPadding={containerPadding} data={routeData} />
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
                        <RouteShowDetails
                            containerPadding={containerPadding}
                            data={routeData}
                            polyline={polylines}
                        />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
