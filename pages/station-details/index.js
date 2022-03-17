import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import BottomCard from "../../components/bottom-card";
import axios from "axios";
import { configs } from "../../configs/configs";
import NavigateBotton from "../../components/navigate-button";
import BackButton from "../../components/back-button";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import ScheduleList from "../../components/shedule-list";

const STATION = "BTS_N9";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
};

export default function StationDetails() {
    const { colors } = useTheme();
    const mapRef = useRef();
    const [stationDetails, setStationDetails] = useState(undefined);
    const [schedulesDetails, setSchedulesDetails] = useState([]);

    useEffect(() => {
        fetchStationDetails();
        fetchScheduleDetails(stationDetails);
    }, []);

    async function recenter(latitude, longitude) {
        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
        });
    }

    function fetchStationDetails() {
        axios.get(`${configs.API_URL}/station/id/${STATION}`)
            .then((response) => {
                let responseData = response.data.data;
                console.log(response.data.data);
                setStationDetails(responseData);

                recenter(
                    responseData.coordinates.lat,
                    responseData.coordinates.lng,
                );
                
            })
            .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
            });
    }

    function fetchScheduleDetails(stationDetails) {
        axios.get(`${configs.API_URL}/nearby?lat=${stationDetails.coordinates.lat}&lng=${stationDetails.coordinates.lng}`)
            .then((response) => {
                let responseData = response.data.data;
                console.log(response.data.data);
                setSchedulesDetails(responseData);              
            })
            .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
            });
    }


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
        bottomCard: {
            top: SCREEN_HEIGHT * (3.5 / 5),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
        navigateButtonContainer:{
            bottom: 50,
            left: 325,
        },
        backButtonContainer: {
            position: "absolute",
            top: 0,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            zIndex: 10,
        },
        StationIdOuterContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `#${stationDetails.line.color}`,
            width: 48,
            height: 48,
            borderRadius: 24,
            bottom: 44,
            right: 310,
        },
        StationIdContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white,
            width: 36,
            height: 36,
            borderRadius: 18,
        },
        StationIdText: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 23,
        },
    });

    const StationIcon = (
        <View style={styles.StationIdOuterContainer}>
            <View style={styles.StationIdContainer}>
                <ThemedText style={styles.StationIdText}>
                    {stationDetails.id}
                </ThemedText>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <SafeAreaView edges={["top"]} />
                <BackButton />
            </View>
            <MapView
                ref={mapRef}
                style={styles.maps}
                initialRegion={INITIAL_MAP_REGION}
                provider="google"
            ></MapView>
            
            <View style={styles.bottomCard}>
                <BottomCard>
                    <View style={styles.navigateButtonContainer}>
                        <NavigateBotton/>
                        {StationIcon}
                    </View>
                    <View style={styles.scheduleListcontainer}>
                        <ScheduleList schedulesDetails={schedulesDetails} />
                    </View>
                </BottomCard>
            </View>
        </View>
    );
}
