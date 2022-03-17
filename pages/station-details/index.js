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
import ThemedText from "../../components/themed-text";
import TransitLine from "../../components/transit-line";
import OriginToDestinationTitle from "../../components/origin-to-destination-title";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

const STATION_ID = "BTS_N9";
const SCREEN_WIDTH = Dimensions.get("screen").width;

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
    relativeTime: {
        future: "%s",
        past: "",
        s: "%d seconds ",
        m: "minute ",
        mm: "%d minutes ",
        h: "hour ",
        hh: "%d hours ",
        d: "day ",
        dd: "%d days ",
        M: "month ",
        MM: "%d months ",
        y: "year ",
        yy: "%d years ",
    },
});

export default function StationDetails(props) {
    const { colors } = useTheme();
    const mapRef = useRef();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [stationData, setStationData] = useState({});
    const [routesAvailable, setRoutesAvailable] = useState([]);
    const [routesScrollViewScrollable, setRoutesScrollViewScrollable] = useState(false);

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
            width: "100%",
            fontWeight: "600",
            fontSize: 24,
            marginTop: 10,
            color: colors.text,
        },
        titleContainer: {
            display: "flex",
            flexDirection: "row",
            width: "80%",
        },
        subtitle: {
            fontWeight: "600",
            fontSize: 18,
            color: colors.subtitle,
        },
        stationInContainer: {
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
        },
        transitLine: {
            marginLeft: 7,
        },
        divider: {
            width: "150%",
            height: 1,
            backgroundColor: colors.divider,
            marginVertical: 15,
        },
        subheader: {
            fontWeight: "600",
            fontSize: 16,
            color: colors.subtitle,
        },
        connectsToContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
        },
        connectsToTransitLine: {
            marginRight: 10,
        },
        connectsToStationName: {
            fontWeight: "600",
            fontSize: 18,
            color: colors.text,
            flex: 1,
        },
        nextDepartures: {
            marginVertical: 7,
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
                        formatRoutesAvailable(response.data.data);
                    }
                }

                setLoading(false);
            })
            .catch((error) => {
                if (error) setLoadError(true);
                setLoading(false);
            });
    }

    function formatRoutesAvailable(data) {
        if (data.routes.length === 0) return;

        let tempRoutesAvailable = [];

        Object.keys(data.routes).map((key) => {
            tempRoutesAvailable.push({
                id: data.routes[key].route_id,
                name: data.routes[key].route_name,
                color: data.routes[key].route_color,
            });
        });

        setRoutesAvailable([...tempRoutesAvailable]);
    }

    function onRoutesScrollViewLayout(event) {
        console.log(event.nativeEvent);
        setRoutesScrollViewScrollable(event.nativeEvent.layout.width >= SCREEN_WIDTH - 80);
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
                            <View style={styles.titleContainer}>
                                <ThemedTextMarquee style={styles.title}>
                                    {stationData.name.en}
                                </ThemedTextMarquee>
                            </View>

                            {routesAvailable.length !== 0 && (
                                <>
                                    <View style={styles.stationInContainer}>
                                        <ThemedText style={styles.subtitle}>Station in</ThemedText>
                                        <ScrollView
                                            horizontal
                                            onLayout={onRoutesScrollViewLayout}
                                            scrollEnabled={routesScrollViewScrollable}
                                        >
                                            {Object.keys(routesAvailable).map((key) => (
                                                <>
                                                    <TransitLine
                                                        style={styles.transitLine}
                                                        line={routesAvailable[key]}
                                                    />
                                                </>
                                            ))}

                                            {}
                                        </ScrollView>
                                    </View>
                                </>
                            )}

                            {stationData.transfers.length !== 0 && (
                                <>
                                    <View style={styles.divider} />

                                    <View>
                                        <ThemedText style={styles.subheader}>
                                            Connects to
                                        </ThemedText>

                                        {Object.keys(stationData.transfers).map((key) => (
                                            <>
                                                <View style={styles.connectsToContainer}>
                                                    <TransitLine
                                                        style={styles.connectsToTransitLine}
                                                        line={{
                                                            id: stationData.transfers[key].route
                                                                .route_id,
                                                            name: stationData.transfers[key].route
                                                                .route_name,
                                                            color: stationData.transfers[key].route
                                                                .route_color,
                                                        }}
                                                    />

                                                    <ThemedTextMarquee
                                                        style={styles.connectsToStationName}
                                                    >
                                                        {stationData.transfers[key].name.en}
                                                    </ThemedTextMarquee>
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                </>
                            )}

                            {stationData.lines.length !== 0 && (
                                <>
                                    <View style={styles.divider} />

                                    <View>
                                        <ThemedText style={styles.subheader}>
                                            Next departures
                                        </ThemedText>

                                        {Object.keys(stationData.lines).map((key) => (
                                            <>
                                                <OriginToDestinationTitle
                                                    style={styles.nextDepartures}
                                                    destination={
                                                        stationData.lines[key].destination.name.en
                                                    }
                                                    origin=""
                                                    subtitle={`Departing in ${stationData.lines[key].arriving_in} seconds`}
                                                    size="small"
                                                />
                                            </>
                                        ))}
                                    </View>
                                </>
                            )}
                        </ScrollView>
                    </>
                )}

                {loading && (
                    <>
                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 30 }}
                            width={0.8 * Dimensions.get("screen").width}
                            height={30}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        ></SvgAnimatedLinearGradient>

                        <SvgAnimatedLinearGradient
                            style={{ marginTop: 10 }}
                            width={0.5 * Dimensions.get("screen").width}
                            height={20}
                            primaryColor={colors.linear_gradient_primary}
                            secondaryColor={colors.linear_gradient_secondary}
                        ></SvgAnimatedLinearGradient>
                    </>
                )}
            </View>
        </View>
    );
}
