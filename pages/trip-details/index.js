import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing,
} from "react-native";
import { configs, pSBC } from "../../configs/configs";
import axios from "axios";
import ThemedText from "../../components/themed-text";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import { useTheme } from "@react-navigation/native";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import OriginToDestinationTitle from "../../components/origin-to-destination-title";
import TransitLine from "../../components/transit-line";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import WarningIcon from "../../assets/svgs/warning-icon";
import ThemedTextMarquee from "../../components/themed-text-marquee";
import ExpandDownIcon from "../../assets/svgs/expand-down-icon";
import BackButton from "../../components/back-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { decode } from "@googlemaps/polyline-codec";
import { LinearGradient } from "expo-linear-gradient";
import ArrowIcon24 from "../../assets/svgs/arrow-forward-24px";
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";

const TRIP = "BTS_SUKHUMVIT_WD_E15_N24";
const ORIGIN = "BTS_N9";

const MARGIN_BETWEEN_STATION = 25;
const MARGIN_BETWEEN_STATION_TITLE_AND_CIRCLE = 10;
const STATION_CIRCLE_DIAMETER = 17;
const PLATFORM_FONT_SIZE = 21;

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

function TripDetails(props) {
    const { colors } = useTheme();

    const mapRef = useRef(null);

    const [tripDetails, setTripDetails] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [approximateTime, setApproximateTime] = useState(false);
    const [showPreviousStops, setShowPreviousStops] = useState(false);
    const [nextStationLineHeights, setNextStationLineHeight] = useState([]);
    const [previousStationLineHeights, setPreviousStationLineHeights] = useState([]);

    const scrollY = new Animated.Value(0);

    const [shape, setShape] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetchTripDetails();
    }, []);

    async function recenter(latitude, longitude, latitudeDelta, longitudeDelta) {
        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta || 0.005,
            longitudeDelta: longitudeDelta || 0.005,
        });
    }

    function formatSeconds(seconds) {
        seconds = parseInt(seconds);
        const dayInSeconds = Math.floor(seconds / (60 * 60 * 24)) * 60 * 60 * 24;
        seconds -= dayInSeconds;
        const hoursInSeconds = Math.floor(seconds / (60 * 60)) * 60 * 60;
        seconds -= dayInSeconds;
        const minutesInSeconds = Math.floor(seconds / 60) * 60;
        seconds -= minutesInSeconds;

        return `${dayjs.duration(dayInSeconds, "seconds").humanize(true)}${dayjs
            .duration(hoursInSeconds, "seconds")
            .humanize(true)}${dayjs.duration(minutesInSeconds, "seconds").humanize(true)}${dayjs
            .duration(parseInt(seconds), "seconds")
            .humanize(true)}`;
    }

    function formatTime(time) {
        return dayjs(time).format("HH:mm");
    }

    function fetchTripDetails() {
        setLoading(true);
        axios
            .get(`${configs.API_URL}/trip/${TRIP}?origin=${ORIGIN}`)
            .then((response) => {
                let responseData = response.data.data;
                let approximateTime = false;

                setTripDetails(responseData);
                setLoading(false);

                if (typeof responseData === "object") {
                    fetchRouteShape(
                        responseData.meta.line.id,
                        responseData.origin.coordinates.lat,
                        responseData.origin.coordinates.lng,
                        responseData.destination.coordinates.lat,
                        responseData.destination.coordinates.lng,
                    );

                    recenter(
                        responseData.origin.coordinates.lat,
                        responseData.origin.coordinates.lng,
                    );

                    for (let previousStop of responseData.previous) {
                        if (previousStop.approximate_time) {
                            approximateTime = true;
                            setApproximateTime(true);
                            break;
                        }
                    }

                    if (!approximateTime) {
                        for (let nextStop of responseData.next) {
                            if (nextStop.approximate_time) {
                                approximateTime = true;
                                setApproximateTime(true);
                                break;
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                console.log("An error occured while getting trip details" + error);
                setTripDetails("error");
                setLoading(false);
            });
    }

    function fetchRouteShape(route_id, origin_lat, origin_lng, destination_lat, destination_lng) {
        axios
            .get(
                `${configs.API_URL}/shape/${route_id}?from=${origin_lat},${origin_lng}&to=${destination_lat},${destination_lng}`,
            )
            .then((response) => {
                let responseData = response.data.data;

                let decodedShape = [];
                let formattedDecodedShape = [];

                if (responseData)
                    if (responseData.shape_encoded) {
                        decodedShape = decode(responseData.shape_encoded, 5);

                        decodedShape.forEach((element) => {
                            formattedDecodedShape.push({
                                latitude: element[0],
                                longitude: element[1],
                            });
                        });

                        setShape(formattedDecodedShape);

                        if (formattedDecodedShape.length !== 0)
                            setMarkers([
                                formattedDecodedShape[0],
                                formattedDecodedShape[formattedDecodedShape.length - 1],
                            ]);
                    }
            })
            .catch((error) => {
                console.log("An error occured while getting shapes" + error);
                setShape([]);
            });
    }

    function onPolylinePressed() {
        recenter(
            (parseFloat(tripDetails.origin.coordinates.lat) +
                parseFloat(tripDetails.destination.coordinates.lat)) /
                2,
            (parseFloat(tripDetails.origin.coordinates.lng) +
                parseFloat(tripDetails.destination.coordinates.lng)) /
                2,
            (tripDetails.destination.coordinates.lat - tripDetails.origin.coordinates.lat) * 1.5,
            (tripDetails.destination.coordinates.lng - tripDetails.origin.coordinates.lng) * 1.5,
        );
    }

    function onMarkerPressed(latitude, longitude) {
        recenter(latitude, longitude);
    }

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
            marginTop: 10,
        },
        transitLine: {
            marginTop: 10,
        },
        scheduledText: {
            marginTop: 7,
            fontSize: 16,
            fontWeight: "600",
            color: colors.subtitle,
        },
        approximateTimeContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
        },
        approximateTimeIcon: {
            height: "100%",
        },
        approximateTimeText: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.yellow,
            marginLeft: 7,
        },
        stationAndTimeContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginBottom: MARGIN_BETWEEN_STATION,
        },
        stationTitleSubtitleAndCircleContainer: {
            width: "75%",
        },
        stationTitleAndCircleContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        stationTimeContainer: {
            flex: 1,
        },
        stationTimeText: {
            textAlign: "right",
            fontSize: 18,
            fontWeight: "600",
        },
        previousStationTimeText: {
            textAlign: "right",
            fontSize: 18,
            fontWeight: "600",
            color: colors.subtitle,
        },
        stationTextContainer: {
            width: "100%",
            marginLeft: MARGIN_BETWEEN_STATION_TITLE_AND_CIRCLE,
        },
        stationText: {
            fontSize: 18,
            fontWeight: "600",
        },
        previousStationText: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.subtitle,
        },
        stationSubtitleTextContainer: {
            width: "100%",
            marginLeft: 30 + MARGIN_BETWEEN_STATION_TITLE_AND_CIRCLE,
        },
        stationSubtitleText: {
            fontSize: PLATFORM_FONT_SIZE - 5,
            fontWeight: "600",
            color: colors.subtitle,
        },
        previousStationText: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.subtitle,
        },
        previousStationTimeText: {
            textAlign: "right",
            fontSize: 18,
            fontWeight: "600",
            color: colors.subtitle,
        },
        seePreviousStopsButton: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
        },
        seePreviousStopsButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.subtitle,
            marginLeft: 5,
        },
        stationCircle: {
            borderRadius: 50,
            width: STATION_CIRCLE_DIAMETER,
            height: STATION_CIRCLE_DIAMETER,
            borderWidth: 2,
            borderColor: colors.middle_grey,
            backgroundColor: colors.white,
            alignSelf: "center",
        },
        stationCircleAndLineContainer: {
            width: 30,
            height: STATION_CIRCLE_DIAMETER,
            display: "flex",
        },
        unableToLoadView: {
            height: 0.7 * Dimensions.get("screen").height,
            marginTop: 0.3 * Dimensions.get("screen").height,
            paddingHorizontal: 15,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            paddingTop: 100,
            display: "flex",
            alignItems: "center",
        },
        unableToLoadTheTripText: {
            fontSize: 18,
            fontWeight: "600",
        },
        goBackText: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.primary,
        },
        marker: {
            width: 20,
            height: 20,
            borderRadius: 30,
            borderWidth: 2.5,
        },
        titleOnScrollContainer: {
            position: "absolute",
            paddingHorizontal: 15,
            top: 0,
            zIndex: 1,
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            height: 60,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
        },
        titleOnScrollOriginStationNameContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        titleOnScrollDestinationStationNameContainer: {
            flex: 1,
        },
        titleOnScrollArrowIcon: {
            width: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 1,
        },
        titleOnScrollStationNameText: {
            width: "100%",
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
        },
    });

    const approximateTimeWarning = (
        <View style={styles.approximateTimeContainer}>
            <View style={styles.approximateTimeIcon}>
                <WarningIcon fill={colors.yellow} />
            </View>
            <ThemedText style={styles.approximateTimeText}>
                Showing approximate schedule. Real timetable might differ from what are shown.
            </ThemedText>
        </View>
    );

    const seePreviousStopsButton = (previous) => (
        <>
            <View style={{ marginTop: 25 }} />
            {previous.length > 0 && (
                <TouchableOpacity
                    style={styles.seePreviousStopsButton}
                    onPress={() => setShowPreviousStops(!showPreviousStops)}
                >
                    <ExpandDownIcon
                        style={{ transform: [{ rotate: showPreviousStops ? "180deg" : "0deg" }] }}
                        fill={colors.subtitle}
                    />
                    <ThemedText style={styles.seePreviousStopsButtonText}>
                        {showPreviousStops ? "Hide" : "See"} previous stops
                    </ThemedText>
                </TouchableOpacity>
            )}
        </>
    );

    const nextStops = (stop, origin, destination, iteration, color) => (
        <>
            <View
                style={styles.stationAndTimeContainer}
                onLayout={(event) => {
                    setNextStationLineHeight([
                        ...nextStationLineHeights,
                        event.nativeEvent.layout.height,
                    ]);
                }}
            >
                <View style={styles.stationTitleSubtitleAndCircleContainer}>
                    <View style={styles.stationTitleAndCircleContainer}>
                        <View style={styles.stationCircleAndLineContainer}>
                            <View style={styles.stationCircle} />

                            {!destination && nextStationLineHeights[iteration] && (
                                <Animated.View
                                    style={{
                                        position: "absolute",
                                        alignSelf: "center",
                                        width: 13,
                                        height: origin
                                            ? nextStationLineHeights[iteration] +
                                              MARGIN_BETWEEN_STATION +
                                              PLATFORM_FONT_SIZE
                                            : nextStationLineHeights[iteration] +
                                              MARGIN_BETWEEN_STATION,
                                        top: STATION_CIRCLE_DIAMETER / 2,
                                        backgroundColor: `#${color}` || colors.upper_background,
                                        borderColor: pSBC(
                                            -0.5,
                                            color ? `#${color}` : colors.upper_background,
                                        ),
                                        borderWidth: 2.5,
                                        zIndex: -1,
                                    }}
                                />
                            )}
                        </View>

                        <View style={styles.stationTextContainer}>
                            <ThemedTextMarquee style={styles.stationText}>
                                {stop.name.en}
                            </ThemedTextMarquee>
                        </View>
                    </View>

                    <View style={styles.stationSubtitleTextContainer}>
                        {(origin || destination) && stop.platform && (
                            <>
                                {stop.platform.name && (
                                    <View>
                                        <ThemedTextMarquee style={styles.stationSubtitleText}>
                                            {origin
                                                ? `Departing from ${stop.platform.name.en}`
                                                : destination
                                                ? `Arriving at ${stop.platform.name.en}`
                                                : ""}
                                        </ThemedTextMarquee>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </View>

                <View style={styles.stationTimeContainer}>
                    <ThemedText style={styles.stationTimeText}>{formatTime(stop.time)}</ThemedText>
                </View>
            </View>
        </>
    );

    const previousStops = (stop, origin, iteration, color) => (
        <>
            <View
                style={styles.stationAndTimeContainer}
                onLayout={(event) => {
                    setPreviousStationLineHeights([
                        ...nextStationLineHeights,
                        event.nativeEvent.layout.height,
                    ]);
                }}
            >
                <>
                    <View style={styles.stationTitleSubtitleAndCircleContainer}>
                        <View style={styles.stationTitleAndCircleContainer}>
                            <View style={styles.stationCircleAndLineContainer}>
                                <View style={styles.stationCircle} />

                                {previousStationLineHeights[iteration] && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            alignSelf: "center",
                                            width: 15,
                                            height: origin
                                                ? nextStationLineHeights[iteration] +
                                                  MARGIN_BETWEEN_STATION +
                                                  PLATFORM_FONT_SIZE
                                                : nextStationLineHeights[iteration] +
                                                  MARGIN_BETWEEN_STATION,
                                            top: STATION_CIRCLE_DIAMETER / 2,
                                            backgroundColor: colors.upper_background,
                                            borderColor: pSBC(-0.5, colors.upper_background),
                                            zIndex: -1,
                                        }}
                                    />
                                )}
                            </View>

                            <View style={styles.stationTextContainer}>
                                <ThemedTextMarquee style={styles.previousStationText}>
                                    {stop.name.en}
                                </ThemedTextMarquee>
                            </View>
                        </View>
                    </View>

                    <View style={styles.stationTimeContainer}>
                        <ThemedText style={styles.previousStationTimeText}>
                            {formatTime(stop.time)}
                        </ThemedText>
                    </View>
                </>
            </View>
        </>
    );

    const titleOnScrollOpacity = scrollY.interpolate({
        inputRange: [50, 125],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    const TitleOnScroll = () => (
        <Animated.View style={[styles.titleOnScrollContainer, { opacity: titleOnScrollOpacity }]}>
            <LinearGradient
                style={styles.titleOnScrollContainer}
                colors={[colors.background, `${colors.background}00`]}
                start={{ x: 0.5, y: 0.7 }}
            >
                <View style={styles.titleOnScrollOriginStationNameContainer}>
                    <ThemedText style={styles.titleOnScrollStationNameText}>
                        {tripDetails.origin.name.en}
                    </ThemedText>
                </View>

                <View style={styles.titleOnScrollArrowIcon}>
                    <ArrowIcon />
                </View>

                <View style={styles.titleOnScrollDestinationStationNameContainer}>
                    <ThemedTextMarquee style={styles.titleOnScrollStationNameText}>
                        {tripDetails.destination.name.en}
                    </ThemedTextMarquee>
                </View>
            </LinearGradient>
        </Animated.View>
    );

    return (
        <>
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
                >
                    {!loading && typeof tripDetails === "object" && (
                        <>
                            {Object.keys(markers).map((key) => (
                                <Marker
                                    coordinate={markers[key]}
                                    anchor={{ x: 0.5, y: 0.5 }}
                                    tappable
                                    onPress={() =>
                                        onMarkerPressed(
                                            markers[key].latitude,
                                            markers[key].longitude,
                                        )
                                    }
                                >
                                    <View
                                        style={{
                                            ...styles.marker,
                                            backgroundColor: colors.white,
                                            borderColor: colors.middle_grey,
                                        }}
                                    />
                                </Marker>
                            ))}

                            <Polyline
                                coordinates={shape}
                                strokeWidth={14}
                                strokeColor={pSBC(
                                    -0.5,
                                    tripDetails.meta.line.color
                                        ? `#${tripDetails.meta.line.color}`
                                        : colors.upper_background,
                                )}
                                tappable
                                onPress={() => onPolylinePressed()}
                            />
                            <Polyline
                                coordinates={shape}
                                strokeWidth={8}
                                strokeColor={`#${tripDetails.meta.line.color}`}
                                tappable
                                onPress={() => onPolylinePressed()}
                            />
                        </>
                    )}
                </MapView>

                {!loading && (
                    <>
                        {typeof tripDetails === "object" && (
                            <>
                                <View style={styles.bottomCard}>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{
                                            paddingBottom: 50,
                                            paddingTop: 15,
                                        }}
                                        scrollEventThrottle={32}
                                        onScroll={(event) =>
                                            scrollY.setValue(event.nativeEvent.contentOffset.y)
                                        }
                                    >
                                        <>
                                            <OriginToDestinationTitle
                                                style={styles.title}
                                                origin={tripDetails.origin.name.en}
                                                destination={tripDetails.destination.name.en}
                                                time={tripDetails.meta.arriving_in}
                                                subTime={"On time"}
                                                subTimeColor={colors.primary}
                                            />

                                            <TransitLine
                                                style={styles.transitLine}
                                                line={tripDetails.meta.line}
                                            />

                                            {tripDetails.meta.headway.headway_secs && (
                                                <ThemedText style={styles.scheduledText}>
                                                    Scheduled for every{" "}
                                                    {formatSeconds(
                                                        tripDetails.meta.headway.headway_secs,
                                                    )}
                                                    until {formatTime(tripDetails.meta.headway.to)}
                                                </ThemedText>
                                            )}

                                            {approximateTime && approximateTimeWarning}

                                            {seePreviousStopsButton(tripDetails.previous)}

                                            {showPreviousStops && (
                                                <>
                                                    {Object.keys(tripDetails.previous).map(
                                                        (key, iteration) => (
                                                            <>
                                                                {tripDetails.previous[key] &&
                                                                    previousStops(
                                                                        tripDetails.previous[key],
                                                                        iteration === 0,
                                                                        iteration,
                                                                    )}
                                                            </>
                                                        ),
                                                    )}
                                                </>
                                            )}

                                            {Object.keys(tripDetails.next).map((key, iteration) => (
                                                <>
                                                    {tripDetails.next[key] &&
                                                        nextStops(
                                                            tripDetails.next[key],
                                                            iteration === 0,
                                                            iteration ===
                                                                tripDetails.next.length - 1,
                                                            iteration,
                                                            tripDetails.meta.line.color,
                                                        )}
                                                </>
                                            ))}
                                        </>
                                    </ScrollView>
                                    <TitleOnScroll />
                                </View>
                            </>
                        )}

                        {typeof tripDetails !== "object" && (
                            <>
                                <View style={styles.unableToLoadView}>
                                    <ThemedText style={styles.unableToLoadTheTripText}>
                                        Unable to load the trip
                                    </ThemedText>
                                    <TouchableOpacity>
                                        <ThemedText style={styles.goBackText}>Go back</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </>
                )}

                {loading && (
                    <>
                        <View>
                            <View style={styles.bottomCard}>
                                <SvgAnimatedLinearGradient
                                    style={{ marginTop: 30 }}
                                    width={0.8 * Dimensions.get("screen").width}
                                    height={40}
                                    primaryColor={colors.background}
                                    secondaryColor={colors.upper_background}
                                ></SvgAnimatedLinearGradient>

                                <SvgAnimatedLinearGradient
                                    style={{ marginTop: 10 }}
                                    width={0.5 * Dimensions.get("screen").width}
                                    height={30}
                                    primaryColor={colors.background}
                                    secondaryColor={colors.upper_background}
                                ></SvgAnimatedLinearGradient>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </>
    );
}

export default TripDetails;
