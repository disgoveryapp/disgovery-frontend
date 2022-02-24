import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import RecenterButton from "../../components/recenter-button";
import BottomCard from "../../components/bottom-card";
import SearchBox from "../../components/search-box";
import BottomCardFlatList from "../../components/bottom-card-flat-list";
import axios from "axios";
import { configs } from "../../configs/configs";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
};

export default function Home() {
    const { colors } = useTheme();
    const mapRef = useRef();
    let firstRun = true;
    const [mapsIsRecentered, setMapsIsRecentered] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapCurrentLocationRegion, setMapCurrentLocationRegion] = useState({});
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);

    const [nearbyStations, setNearbyStations] = useState([]);

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
        searchbox: {
            width: "100%",
            paddingHorizontal: 15,
            bottom: 25,
        },
        flatlistcontainer: {
            flex: 1,
            bottom: 30,
        },
        bottomcard: {
            top: SCREEN_HEIGHT * (3 / 5),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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

    function decodePolyline() {
        const decoded = decode(polyline, 5);
        console.log(decoded);
        let decodedPolyline = [];

        decoded.forEach((element) => {
            decodedPolyline.push({ latitude: element[0], longitude: element[1] });
        });

        return decodedPolyline;
    }

    function fetchNearbyStations(region) {
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
                console.log("fetched");
                setNearbyStations(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setNearbyStations([]);
            });
    }

    function onMapRegionChangeComplete(region) {
        console.log(region);
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
                customMapStyle={googleMapsStyling}
                onTouchStart={() => setMapsIsRecentered(false)}
                onRegionChangeComplete={(region) => onMapRegionChangeComplete(region)}
                showsUserLocation
            ></MapView>
            <RecenterButton recentered={mapsIsRecentered} onPress={recenter} />
            <View style={styles.bottomcard}>
                <BottomCard>
                    <View style={styles.searchbox}>
                        <SearchBox />
                    </View>
                    <View style={styles.flatlistcontainer}>
                        <BottomCardFlatList
                            latitude={location ? location.latitude : INITIAL_MAP_REGION.latitude}
                            longitude={location ? location.longitude : INITIAL_MAP_REGION.longitude}
                            radius={2000}
                        />
                    </View>
                </BottomCard>
            </View>
        </View>
    );
}
