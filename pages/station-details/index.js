import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
import ScheduleList from "../../components/schedule-list";
import NavigateBotton from "../../components/navigate-button";

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
    const { dark, colors } = useTheme();
    const mapRef = useRef();

    const [loading, setLoading] = useState(formatRoutesAvailable);
    const [loadError, setLoadError] = useState(false);
    //const [stationData, setStationData] = useState({});
    const [routesAvailable, setRoutesAvailable] = useState([]);
    const [routesScrollViewScrollable, setRoutesScrollViewScrollable] = useState(false);

    const [marker, setMarker] = useState({ latitude: 0, longitude: 0 });
    const stationData = 
    {
    "name": {
      "en": "Saphan Khwai",
      "th": "สะพานควาย"
    },
    "id": "BTS_N7",
    "code": "N7",
    "lines": [
      {
        "route_id": "BTS_SUKHUMVIT",
        "route_name": {
          "short_name": "Sukhumvit",
          "long_name": "BTS Sukhumvit Line"
        },
        "route_color": "7FBF3A",
        "route_type": "0",
        "route_feq": 5,
        "route_lasttrain": "2022-03-25T17:34:38+07:00",
        "trip_id": "BTS_SUKHUMVIT_WD_E23_N24",
        "arriving_in": 40,
        "destination": {
          "id": "BTS_N24",
          "name": {
            "en": "Khu Khot",
            "th": "คูคต"
          },
          "code": "N24"
        }
      },
      {
        "route_id": "BTS_SUKHUMVIT",
        "route_name": {
          "short_name": "Sukhumvit",
          "long_name": "BTS Sukhumvit Line"
        },
        "route_color": "7FBF3A",
        "route_type": "0",
        "route_feq": 5,
        "route_lasttrain": "2022-03-25T17:34:38+07:00",
        "trip_id": "BTS_SUKHUMVIT_WD_N24_E23",
        "arriving_in": 40,
        "destination": {
          "id": "BTS_E23",
          "name": {
            "en": "Kheha",
            "th": "เคหะฯ"
          },
          "code": "E23"
        }
      },
      {
        "route_id": "BTS_SUKHUMVIT",
        "route_name": {
          "short_name": "Sukhumvit",
          "long_name": "BTS Sukhumvit Line"
        },
        "route_color": "7FBF3A",
        "route_type": "0",
        "route_feq": 5,
        "route_lasttrain": "2022-03-25T17:34:38+07:00",
        "trip_id": "BTS_SUKHUMVIT_WD_E15_N24",
        "arriving_in": 70,
        "destination": {
          "id": "BTS_N24",
          "name": {
            "en": "Khu Khot",
            "th": "คูคต"
          },
          "code": "N24"
        }
      }
    ],
    "transfers": [],
    "routes": [
      {
        "route_id": "BTS_SUKHUMVIT",
        "route_name": {
          "short_name": "Sukhumvit",
          "long_name": "BTS Sukhumvit Line"
        },
        "route_type": "0",
        "route_color": "7FBF3A"
      }
    ],
    "coordinates": {
      "lat": "13.793879907040548",
      "lng": "100.549676790319600"
    }
  }
    useEffect(() => {
        formatRoutesAvailable(stationData)
    }, []);

    const styles = StyleSheet.create({
        backButtonContainer: {
            position: "absolute",
            top: 0,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            zIndex: 10,
        },
        navigateButtonContainer: {
            position: "absolute",
            marginTop: 0.02 * Dimensions.get("screen").height,
            alignSelf: "flex-end",
            paddingHorizontal: 5,
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
        stationSignAndNavigateButtonContainer: {
            marginTop: -70,
        },
        stationSignContainer: {
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: colors.white,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        stationSignText: {
            color: "black",
            fontWeight: "600",
            fontSize: 24,
        },
        marker: {
            width: 20,
            height: 20,
            borderRadius: 30,
            borderWidth: 2.5,
        },
    });

    async function recenter(latitude, longitude, latitudeDelta, longitudeDelta) {
        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta || 0.005,
            longitudeDelta: longitudeDelta || 0.005,
        });
    }

    // function fetchStationDetails() {
    //     setLoading(true);

    //     axios
    //         .get(`${configs.API_URL}/station/id/${STATION_ID}`)
    //         .then(async (response) => {
    //             if (response.data.status) {
    //                 if (response.data.status.status !== 200) setLoadError(true);
    //                 else {
    //                     setStationData(response.data.data);
    //                     formatRoutesAvailable(response.data.data);

    //                     if (response.data.data.coordinates) {
    //                         await recenter(
    //                             parseFloat(response.data.data.coordinates.lat),
    //                             parseFloat(response.data.data.coordinates.lng),
    //                         );

    //                         setMarker({
    //                             latitude: parseFloat(response.data.data.coordinates.lat),
    //                             longitude: parseFloat(response.data.data.coordinates.lng),
    //                         });
    //                     }
    //                 }
    //             }

    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             if (error) setLoadError(true);
    //             setLoading(false);
    //         });
    // }

    function formatRoutesAvailable(data) {
        if (0 === 0) return;

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

    function onMarkerPressed(lat, lng) {
        recenter(lat, lng);
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
                customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                initialRegion={configs.INITIAL_MAP_REGION}
                mapPadding={{ bottom: 0.05 * Dimensions.get("screen").height }}
                showsUserLocation
            >
                {!loading && !!stationData.coordinates && (
                    <Marker
                        coordinate={marker}
                        anchor={{ x: 0.5, y: 0.5 }}
                        tappable
                        onPress={() => onMarkerPressed(marker.latitude, marker.longitude)}
                    >
                        <View
                            style={{
                                ...styles.marker,
                                backgroundColor: colors.white,
                                borderColor: colors.middle_grey,
                            }}
                        />
                    </Marker>
                )}
            </MapView>

            <View style={styles.bottomCard}>
                {!loading && (
                    <>
                        {!!stationData.code && (
                            <View style={styles.stationSignAndNavigateButtonContainer}>
                                <View
                                    style={{
                                        ...styles.stationSignContainer,
                                        borderWidth: 5,
                                        borderColor:
                                            routesAvailable.length !== 0
                                                ? `#${routesAvailable[0].color}`
                                                : colors.subtitle,
                                    }}
                                >
                                    <ThemedText style={styles.stationSignText}>
                                        {stationData.code}
                                    </ThemedText>
                                </View>
                                <View style={styles.navigateButtonContainer}>
                                    <NavigateBotton />
                                </View>
                            </View>
                        )}

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
                            {stationData.lines.length !== 0 && (
                                <>
                                    <View style={styles.divider} />

                                    <View>
                                        <ThemedText style={styles.subheader}>
                                            Schedules
                                        </ThemedText>

                                        {Object.keys(stationData.lines).map((key) => (
                                            <>
                                                <ScheduleList
                                                    style={styles.nextDepartures}
                                                    destination={
                                                        stationData.lines[key].destination.name.en
                                                    }
                                                    subtitle={`Scheduled for every ${stationData.lines[key].route_feq} minutes until `}
                                                    time={stationData.lines[key].route_lasttrain}
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
