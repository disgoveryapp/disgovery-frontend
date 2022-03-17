import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import axios from "axios";
import { configs } from "../../configs/configs";
import BackButton from "../../components/back-button";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";
import ThemedTextMarquee from "../../components/themed-text-marquee";

const STATION_ID = "BTS_N9";

export default function StationDetails(props) {
    const { colors } = useTheme();
    const mapRef = useRef();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [stationData, setStationData] = useState({});

    useEffect(() => {
        fetchStationDetails();
    }, []);

    const styles = StyleSheet.create({
        backButtonContainer: {
            position: "absolute",
            top: 0,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            zIndex: 10,
        },
        topMap: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 0.35 * Dimensions.get("screen").height,
        },
        bottomCard: {
            height: 0.7 * Dimensions.get("screen").height,
            marginTop: 0.3 * Dimensions.get("screen").height,
            paddingHorizontal: 15,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        title: {
            fontWeight: "600",
            fontSize: 24,
            marginTop: 10,
        },
    });

    function fetchStationDetails() {
        setLoading(true);
        axios
            .get(`${configs.API_URL}/station/id/${STATION_ID}`)
            .then((response) => {
                if (response.data.status) {
                    if (response.data.status.status !== 200) setLoadError(true);
                    else {
                        setStationData(response.data.data);
                        console.log(response.data.data);
                    }
                }

                setLoading(false);
            })
            .catch((error) => {
                if (error) setLoadError(true);
                setLoading(false);
            });
    }

    return (
        <View>
            <View style={styles.backButtonContainer}>
                <SafeAreaView edges={["top"]} />
                <BackButton />
            </View>

            <MapView
                ref={mapRef}
                style={styles.topMap}
                provider={PROVIDER_GOOGLE}
                customMapStyle={googleMapsStyling}
                initialRegion={configs.INITIAL_MAP_REGION}
                mapPadding={{ bottom: 0.05 * Dimensions.get("screen").height }}
                showsUserLocation
            ></MapView>

            <View style={styles.bottomCard}>
                {!loading && (
                    <>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 50,
                                paddingTop: 15,
                            }}
                        >
                            <ThemedTextMarquee style={styles.title}>
                                {stationData.name.en}
                            </ThemedTextMarquee>
                        </ScrollView>
                    </>
                )}

                {loading && (
                    <>
                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 30 }}
                            width={0.8 * Dimensions.get("screen").width}
                            height={40}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        ></SvgAnimatedLinearGradient>
                    </>
                )}
            </View>
        </View>
    );
}
