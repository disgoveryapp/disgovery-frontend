import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { configs } from "../../configs/configs";
import axios from "axios";
import ThemedText from "../../components/themed-text";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import { useTheme } from "@react-navigation/native";
import OriginToDestinationTitle from "../../components/origin-to-destination-title";
import { ScrollView } from "react-native-gesture-handler";

const TRIP = "BTS_SUKHUMVIT_WD_E15_N24";
const ORIGIN = "BTS_N13";

function TripDetails(props) {
    const { colors } = useTheme();
    const [tripDetails, setTripDetails] = useState(undefined);
    const [approximateTime, setApproximateTime] = useState(false);

    useEffect(() => {
        fetchTripDetails();
    }, []);

    function fetchTripDetails() {
        axios.get(`${configs.API_URL}/trip/${TRIP}?origin=${ORIGIN}`).then((response) => {
            let responseData = response.data.data;
            let approximateTime = false;

            setTripDetails(responseData);

            for (let previousStop of responseData.previous) {
                if (previousStop.approximate_time) {
                    approximateTime = true;
                    setApproximateTime(true);
                    break;
                }
            }

            if (approximateTime) return;

            for (let nextStop of responseData.next) {
                if (nextStop.approximate_time) {
                    approximateTime = true;
                    setApproximateTime(true);
                    break;
                }
            }
        });
    }

    const styles = StyleSheet.create({
        topMap: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 0.35 * Dimensions.get("screen").height,
        },
        bottomCard: {
            height: "100%",
            marginTop: 0.3 * Dimensions.get("screen").height,
            paddingHorizontal: 15,
            paddingTop: 15,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
        },
        title: {
            marginTop: 10,
        },
    });

    return (
        <View>
            {/* <SafeAreaView edges={["top"]} /> */}
            <MapView
                style={styles.topMap}
                provider={PROVIDER_GOOGLE}
                customMapStyle={googleMapsStyling}
                initialRegion={configs.INITIAL_MAP_REGION}
                mapPadding={{ bottom: 0.05 * Dimensions.get("screen").height }}
            ></MapView>

            <ScrollView style={styles.bottomCard}>
                {tripDetails && (
                    <>
                        <OriginToDestinationTitle
                            style={styles.title}
                            origin={tripDetails.origin.name.en}
                            destination={tripDetails.destination.name.en}
                            time={tripDetails.meta.arriving_in}
                            subTime={"On time"}
                            subTimeColor={colors.primary}
                        />
                        {/* 
                        <ThemedText>Approximate Time</ThemedText>
                        <ThemedText>{approximateTime ? "Yes" : "No"}</ThemedText>
                        <ThemedText>Previous</ThemedText>
                        {Object.keys(tripDetails.previous).map((key) => (
                            <ThemedText>{tripDetails.previous[key].name.en}</ThemedText>
                        ))}
                        <ThemedText>Next</ThemedText>
                        {Object.keys(tripDetails.next).map((key) => (
                            <ThemedText>{tripDetails.next[key].name.en}</ThemedText>
                        ))} */}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

export default TripDetails;
