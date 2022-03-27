import { StyleSheet, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import axios from "axios";
import { configs, getRouteTypeString, pSBC } from "../../configs/configs";
import { decode } from "@googlemaps/polyline-codec";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowIcon from "../../assets/svgs/arrow-forward-18px";
import dayjs from "dayjs";

const ROUTE_DETAILS = {
    schedule: {
        departing_at: "2022-03-27T20:13:30+07:00",
        arriving_at: "2022-03-27T20:58:42+07:00",
        duration: 2712,
    },
    total_fares: {
        currency: "THB",
        adult: 63,
        elder: 32,
    },
    fares: [
        {
            from: {
                station: {
                    id: "BTS_N8",
                    code: "N8",
                    name: {
                        en: "Mo Chit",
                        th: "หมอชิต",
                    },
                },
                coordinates: {
                    lat: 13.802615434972841,
                    lng: 100.55382956822994,
                },
            },
            to: {
                station: {
                    id: "BTS_S2",
                    code: "S2",
                    name: {
                        en: "Sala Daeng",
                        th: "ศาลาแดง",
                    },
                },
                coordinates: {
                    lat: 13.7285550646488,
                    lng: 100.53431600678,
                },
            },
            fare: {
                currency: "THB",
                adult: 44,
                elder: 22,
            },
        },
        {
            from: {
                station: {
                    id: "MRT_BL26",
                    code: "BL26",
                    name: {
                        en: "Si Lom",
                        th: "สีลม",
                    },
                },
                coordinates: {
                    lat: 13.7292457174137,
                    lng: 100.536537766456,
                },
            },
            to: {
                station: {
                    id: "MRT_BL28",
                    code: "BL28",
                    name: {
                        en: "Hua Lamphong",
                        th: "หัวลำโพง",
                    },
                },
                coordinates: {
                    lat: 13.7378289616559,
                    lng: 100.517166935581,
                },
            },
            fare: {
                currency: "THB",
                adult: 19,
                elder: 10,
            },
        },
    ],
    directions: [
        {
            type: "board",
            from: {
                station: {
                    id: "BTS_N8",
                    code: "N8",
                    name: {
                        en: "Mo Chit",
                        th: "หมอชิต",
                    },
                },
                coordinates: {
                    lat: 13.802615434972841,
                    lng: 100.55382956822994,
                },
            },
            to: {
                station: {
                    id: "BTS_CEN_1",
                    code: "CEN",
                    name: {
                        en: "Siam (Platform 1)",
                        th: "สยาม (ชานชาลา 1)",
                    },
                },
                coordinates: {
                    lat: 13.745611434797254,
                    lng: 100.53418620881983,
                },
            },
            via_line: {
                id: "BTS_SUKHUMVIT",
                type: "0",
                name: {
                    short_name: "Sukhumvit",
                    long_name: "BTS Sukhumvit Line",
                },
                color: "7FBF3A",
            },
            passing: [
                {
                    station: {
                        id: "BTS_N8",
                        code: "N8",
                        name: {
                            en: "Mo Chit",
                            th: "หมอชิต",
                        },
                    },
                    coordinates: {
                        lat: 13.802615434972841,
                        lng: 100.55382956822994,
                    },
                },
                {
                    station: {
                        id: "BTS_N7",
                        code: "N7",
                        name: {
                            en: "Saphan Khwai",
                            th: "สะพานควาย",
                        },
                    },
                    coordinates: {
                        lat: 13.793879907040548,
                        lng: 100.5496767903196,
                    },
                },
                {
                    station: {
                        id: "BTS_N5",
                        code: "N5",
                        name: {
                            en: "Ari",
                            th: "อารีย์",
                        },
                    },
                    coordinates: {
                        lat: 13.779808144931463,
                        lng: 100.54460576640393,
                    },
                },
                {
                    station: {
                        id: "BTS_N4",
                        code: "N4",
                        name: {
                            en: "Sanam Pao",
                            th: "สนามเป้า",
                        },
                    },
                    coordinates: {
                        lat: 13.772679793232186,
                        lng: 100.54202809674733,
                    },
                },
                {
                    station: {
                        id: "BTS_N3",
                        code: "N3",
                        name: {
                            en: "Victory Monument",
                            th: "อนุสาวรีย์ชัยสมรภูมิ",
                        },
                    },
                    coordinates: {
                        lat: 13.762780518406862,
                        lng: 100.53703860517543,
                    },
                },
                {
                    station: {
                        id: "BTS_N2",
                        code: "N2",
                        name: {
                            en: "Phaya Thai",
                            th: "พญาไท",
                        },
                    },
                    coordinates: {
                        lat: 13.75690616569451,
                        lng: 100.53379084328752,
                    },
                },
                {
                    station: {
                        id: "BTS_N1",
                        code: "N1",
                        name: {
                            en: "Ratchathewi",
                            th: "ราชเทวี",
                        },
                    },
                    coordinates: {
                        lat: 13.75187043000799,
                        lng: 100.53154133790939,
                    },
                },
                {
                    station: {
                        id: "BTS_CEN_1",
                        code: "CEN",
                        name: {
                            en: "Siam (Platform 1)",
                            th: "สยาม (ชานชาลา 1)",
                        },
                    },
                    coordinates: {
                        lat: 13.745611434797254,
                        lng: 100.53418620881983,
                    },
                },
            ],
            schedule: {
                departing_at: "2022-03-27T20:13:30+07:00",
                arriving_at: "2022-03-27T20:27:30+07:00",
                duration: 840,
            },
        },
        {
            type: "transfer",
            from: {
                station: {
                    id: "BTS_CEN_1",
                    code: "CEN",
                    name: {
                        en: "Siam (Platform 1)",
                        th: "สยาม (ชานชาลา 1)",
                    },
                },
                coordinates: {
                    lat: 13.745611434797254,
                    lng: 100.53418620881983,
                },
            },
            to: {
                station: {
                    id: "BTS_CEN_3",
                    code: "CEN",
                    name: {
                        en: "Siam (Platform 3)",
                        th: "สยาม (ชานชาลา 3)",
                    },
                },
                coordinates: {
                    lat: 13.745611434797254,
                    lng: 100.53418620881983,
                },
            },
            schedule: {
                departing_at: "2022-03-27T20:27:30+07:00",
                arriving_at: "2022-03-27T20:28:00+07:00",
                duration: 30,
            },
        },
        {
            type: "board",
            from: {
                station: {
                    id: "BTS_CEN_3",
                    code: "CEN",
                    name: {
                        en: "Siam (Platform 3)",
                        th: "สยาม (ชานชาลา 3)",
                    },
                },
                coordinates: {
                    lat: 13.745611434797254,
                    lng: 100.53418620881983,
                },
            },
            to: {
                station: {
                    id: "BTS_S2",
                    code: "S2",
                    name: {
                        en: "Sala Daeng",
                        th: "ศาลาแดง",
                    },
                },
                coordinates: {
                    lat: 13.7285550646488,
                    lng: 100.53431600678,
                },
            },
            via_line: {
                id: "BTS_SILOM",
                type: "0",
                name: {
                    short_name: "Silom",
                    long_name: "BTS Silom Line",
                },
                color: "00817E",
            },
            passing: [
                {
                    station: {
                        id: "BTS_CEN_3",
                        code: "CEN",
                        name: {
                            en: "Siam (Platform 3)",
                            th: "สยาม (ชานชาลา 3)",
                        },
                    },
                    coordinates: {
                        lat: 13.745611434797254,
                        lng: 100.53418620881983,
                    },
                },
                {
                    station: {
                        id: "BTS_S1",
                        code: "S1",
                        name: {
                            en: "Ratchadamri",
                            th: "ราชดำริ",
                        },
                    },
                    coordinates: {
                        lat: 13.7394762774348,
                        lng: 100.539423823356,
                    },
                },
                {
                    station: {
                        id: "BTS_S2",
                        code: "S2",
                        name: {
                            en: "Sala Daeng",
                            th: "ศาลาแดง",
                        },
                    },
                    coordinates: {
                        lat: 13.7285550646488,
                        lng: 100.53431600678,
                    },
                },
            ],
            schedule: {
                departing_at: "2022-03-27T20:32:20+07:00",
                arriving_at: "2022-03-27T20:38:20+07:00",
                duration: 360,
            },
        },
        {
            type: "transfer",
            from: {
                station: {
                    id: "BTS_S2",
                    code: "S2",
                    name: {
                        en: "Sala Daeng",
                        th: "ศาลาแดง",
                    },
                },
                coordinates: {
                    lat: 13.7285550646488,
                    lng: 100.53431600678,
                },
            },
            to: {
                station: {
                    id: "MRT_BL26",
                    code: "BL26",
                    name: {
                        en: "Si Lom",
                        th: "สีลม",
                    },
                },
                coordinates: {
                    lat: 13.7292457174137,
                    lng: 100.536537766456,
                },
            },
            schedule: {
                departing_at: "2022-03-27T20:38:20+07:00",
                arriving_at: "2022-03-27T20:45:20+07:00",
                duration: 420,
            },
        },
        {
            type: "board",
            from: {
                station: {
                    id: "MRT_BL26",
                    code: "BL26",
                    name: {
                        en: "Si Lom",
                        th: "สีลม",
                    },
                },
                coordinates: {
                    lat: 13.7292457174137,
                    lng: 100.536537766456,
                },
            },
            to: {
                station: {
                    id: "MRT_BL28",
                    code: "BL28",
                    name: {
                        en: "Hua Lamphong",
                        th: "หัวลำโพง",
                    },
                },
                coordinates: {
                    lat: 13.7378289616559,
                    lng: 100.517166935581,
                },
            },
            via_line: {
                id: "MRT_BLUE",
                type: "1",
                name: {
                    short_name: "Blue",
                    long_name: "MRT Blue Line",
                },
                color: "1E4F6F",
            },
            passing: [
                {
                    station: {
                        id: "MRT_BL26",
                        code: "BL26",
                        name: {
                            en: "Si Lom",
                            th: "สีลม",
                        },
                    },
                    coordinates: {
                        lat: 13.7292457174137,
                        lng: 100.536537766456,
                    },
                },
                {
                    station: {
                        id: "MRT_BL27",
                        code: "BL27",
                        name: {
                            en: "Sam Yan",
                            th: "สามย่าน",
                        },
                    },
                    coordinates: {
                        lat: 13.7323326639976,
                        lng: 100.52999011779,
                    },
                },
                {
                    station: {
                        id: "MRT_BL28",
                        code: "BL28",
                        name: {
                            en: "Hua Lamphong",
                            th: "หัวลำโพง",
                        },
                    },
                    coordinates: {
                        lat: 13.7378289616559,
                        lng: 100.517166935581,
                    },
                },
            ],
            schedule: {
                departing_at: "2022-03-27T20:45:30+07:00",
                arriving_at: "2022-03-27T20:49:30+07:00",
                duration: 240,
            },
        },
        {
            type: "walk",
            from: {
                place: {
                    address:
                        "Hua Lamphong, Khwaeng Rong Muang, Khet Pathum Wan, Krung Thep Maha Nakhon 10330, Thailand",
                    place_id: "ChIJe_wtyieZ4jAREmfK4u9gWfk",
                },
                coordinates: {
                    lat: 13.7378782,
                    lng: 100.5171448,
                },
            },
            to: {
                place: {
                    address:
                        "841 ซอย จุฬาฯ 36 Khwaeng Wang Mai, Khet Pathum Wan, Krung Thep Maha Nakhon 10330, Thailand",
                    place_id: "ChIJn4rgwimZ4jARt3lEkg-i1Wg",
                },
                coordinates: {
                    lat: 13.735845,
                    lng: 100.5223986,
                },
            },
            schedule: {
                departing_at: "2022-03-27T20:49:30+07:00",
                arriving_at: "2022-03-27T20:58:42+07:00",
                duration: 552,
            },
            route: {
                overview_polyline: {
                    points: "wdzrAcgodRIFJJ\\CvAaFt@wB\\y@f@}An@qBl@qBl@}Bn@uBPk@HYOG_@OCC",
                },
                summary: "ถนนพระรามที่ ๔",
                warnings: [
                    "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths.",
                ],
                distance: {
                    text: "0.7 km",
                    value: 691,
                },
                steps: [
                    {
                        distance: {
                            text: "12 m",
                            value: 12,
                        },
                        duration: {
                            text: "1 min",
                            value: 10,
                        },
                        end_location: {
                            lat: 13.7378914,
                            lng: 100.5170442,
                        },
                        html_instructions: "Head <b>northwest</b>",
                        polyline: {
                            points: "wdzrAcgodRE@CDFJ",
                        },
                        start_location: {
                            lat: 13.7378782,
                            lng: 100.5171448,
                        },
                        travel_mode: "WALKING",
                    },
                    {
                        distance: {
                            text: "31 m",
                            value: 31,
                        },
                        duration: {
                            text: "1 min",
                            value: 32,
                        },
                        end_location: {
                            lat: 13.7377195,
                            lng: 100.5170557,
                        },
                        html_instructions:
                            'Turn <b>left</b> toward <b>ถนนพระรามที่ ๔</b><div style="font-size:0.9em">Take the stairs</div>',
                        maneuver: "turn-left",
                        polyline: {
                            points: "ydzrAofodRB?FADAF?F?",
                        },
                        start_location: {
                            lat: 13.7378914,
                            lng: 100.5170442,
                        },
                        travel_mode: "WALKING",
                    },
                    {
                        distance: {
                            text: "0.6 km",
                            value: 610,
                        },
                        duration: {
                            text: "8 mins",
                            value: 480,
                        },
                        end_location: {
                            lat: 13.7355776,
                            lng: 100.5222603,
                        },
                        html_instructions:
                            'Turn <b>left</b> onto <b>ถนนพระรามที่ ๔</b><div style="font-size:0.9em">Pass by Government Savings Bank (on the left in 150&nbsp;m)</div>',
                        maneuver: "turn-left",
                        polyline: {
                            points: "wczrAsfodRJYNm@HYLi@DML]H[DMHUFWFMZ{@@AJYJWBEFQDQBITo@DMJ[Nc@Lc@BKDQDM\\eABKHYDQXeABGBGJa@@GDMDKFQDODOJ[HY",
                        },
                        start_location: {
                            lat: 13.7377195,
                            lng: 100.5170557,
                        },
                        travel_mode: "WALKING",
                    },
                    {
                        distance: {
                            text: "30 m",
                            value: 30,
                        },
                        duration: {
                            text: "1 min",
                            value: 22,
                        },
                        end_location: {
                            lat: 13.7358177,
                            lng: 100.5223785,
                        },
                        html_instructions: "Turn <b>left</b> onto <b>ซอย</b>",
                        maneuver: "turn-left",
                        polyline: {
                            points: "kvyrAcgpdROGQGMG",
                        },
                        start_location: {
                            lat: 13.7355776,
                            lng: 100.5222603,
                        },
                        travel_mode: "WALKING",
                    },
                    {
                        distance: {
                            text: "8 m",
                            value: 8,
                        },
                        duration: {
                            text: "1 min",
                            value: 8,
                        },
                        end_location: {
                            lat: 13.735845,
                            lng: 100.5223986,
                        },
                        html_instructions: "Slight <b>right</b> onto <b>ซอย จุฬาฯ 36</b>",
                        maneuver: "turn-slight-right",
                        polyline: {
                            points: "{wyrA{gpdRCC",
                        },
                        start_location: {
                            lat: 13.7358177,
                            lng: 100.5223785,
                        },
                        travel_mode: "WALKING",
                    },
                ],
                copyrights: "Map data ©2022 Google",
            },
        },
    ],
    origin: {
        station: {
            id: "BTS_N8",
            code: "N8",
            name: {
                en: "Mo Chit",
                th: "หมอชิต",
            },
        },
        coordinates: {
            lat: 13.802615434972841,
            lng: 100.55382956822994,
        },
    },
    destination: {
        station: {
            id: "MRT_BL28",
            code: "BL28",
            name: {
                en: "Hua Lamphong",
                th: "หัวลำโพง",
            },
        },
        coordinates: {
            lat: 13.7378289616559,
            lng: 100.517166935581,
        },
    },
};

const INITIAL_MAP_REGION = {
    latitude: 13.764889,
    longitude: 100.538266,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
};

const Navigation = () => {
    const { colors, dark } = useTheme();
    let firstRun = true;
    const mapRef = useRef();

    const [location, setLocation] = useState(undefined);
    const [mapsCurrentLocationRegion, setMapCurrentLocationRegion] = useState(undefined);
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);
    const [polylines, setPolylines] = useState([]);
    const [directions, setDirections] = useState([]);
    const [currentDirection, setCurrentDirection] = useState("");

    useEffect(() => {
        if (firstRun) {
            (async () => {
                fetchNewLocation(true);
            })().catch(() => {});
            firstRun = false;

            parsePolylines();
            parseDirections();
        }
    }, []);

    useEffect(() => {
        console.log(location);
    }, [location]);

    async function fetchNewLocation(doRecenter) {
        console.log("fetching location");
        let { status } = await Location.requestForegroundPermissionsAsync().catch(() => {});
        if (status !== "granted") {
            setLocationErrorMessage("Location permission is denied");
            return;
        }

        Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        })
            .then((location) => {
                console.log("location fetched", location);
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
                setMapCurrentLocationRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });

                if (doRecenter) {
                    recenter({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                }

                return {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                };
            })
            .catch(() => {});
    }

    async function recenter(region) {
        console.log("recentring");
        mapRef.current.animateToRegion(region || INITIAL_MAP_REGION);
    }

    function decodePolyline(polyline) {
        const decoded = decode(polyline, 5);
        let decodedPolyline = [];

        decoded.forEach((element) => {
            decodedPolyline.push({ latitude: element[0], longitude: element[1] });
        });

        return decodedPolyline;
    }

    async function parsePolylines() {
        let tempPolylines = [];

        for (let direction of ROUTE_DETAILS.directions) {
            if (direction.type === "walk") {
                tempPolylines.push({
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
        );

        if (response.data.data) {
            if (response.data.data.shape_encoded) return response.data.data.shape_encoded;
        }

        return;
    }

    function parseDirections() {
        let tempDirections = [];

        for (let i in ROUTE_DETAILS.directions) {
            if (ROUTE_DETAILS.directions[i].type === "board") {
                tempDirections.push({
                    text: `Board ${getRouteTypeString(
                        ROUTE_DETAILS.directions[i].via_line.type || "0",
                        false,
                    )} from ${ROUTE_DETAILS.directions[i].from.station.name.en} to ${
                        ROUTE_DETAILS.directions[i].to.station.name.en
                    }`,
                    near: ROUTE_DETAILS.directions[i].from.coordinates,
                });
                tempDirections.push({
                    text: `Alight at ${ROUTE_DETAILS.directions[i].to.station.name.en}`,
                    near: ROUTE_DETAILS.directions[i].to.coordinates,
                });
            } else if (ROUTE_DETAILS.directions[i].type === "walk") {
                for (let step of ROUTE_DETAILS.directions[i].route.steps) {
                    tempDirections.push({
                        distance: { text: `In ${step.distance.text}`, value: step.distance.value },
                        text: htmlToText(step.html_instructions),
                        near: ROUTE_DETAILS.directions[i].start_location,
                    });
                }
            } else if (ROUTE_DETAILS.directions[i].type === "transfer") {
                tempDirections.push({
                    text: `Transfer from ${ROUTE_DETAILS.directions[i].from.station.name.en} to ${ROUTE_DETAILS.directions[i].to.station.name.en}`,
                    near: ROUTE_DETAILS.directions[i].from.coordinates,
                });
            }

            if (parseInt(i) === ROUTE_DETAILS.directions.length - 1) {
                if (ROUTE_DETAILS.directions[ROUTE_DETAILS.directions.length - 1].type === "walk") {
                    tempDirections.push({
                        text: `You have arrived at ${
                            ROUTE_DETAILS.directions[ROUTE_DETAILS.directions.length - 1].to.place
                                .address
                        }`,
                        near: ROUTE_DETAILS.directions[ROUTE_DETAILS.directions.length - 1].to
                            .coordinates,
                    });
                } else if (
                    ROUTE_DETAILS.directions[ROUTE_DETAILS.directions.length - 1].type === "board"
                ) {
                    tempDirections.push({
                        text: `You have arrived at ${ROUTE_DETAILS.destination.station.name.en}`,
                        near: ROUTE_DETAILS.destination.coordinates,
                    });
                }
            }
        }

        console.log(tempDirections);
        setDirections([...tempDirections]);
        setCurrentDirection(tempDirections[0]);
    }

    function htmlToText(html) {
        let response = html.replaceAll(`<div style=\"font-size:0.9em\">`, "<div> ");
        response = response.replaceAll(/<[^>]+>/g, "");
        response = response.replaceAll("&nbsp;", " ");

        return response;
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
        marker: {
            width: 20,
            height: 20,
            borderRadius: 30,
            borderWidth: 2.5,
        },
        topNavigationPanelContainerWithSafeAreaContainer: {
            position: "absolute",
            top: 0,
            width: "100%",
            paddingHorizontal: 10,
        },
        topNavigationPanelContainer: {
            width: "100%",
            borderRadius: 12,
            backgroundColor: colors.background,
            padding: 18,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        bottomNavigationPanelContainerWithSafeAreaContainer: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingHorizontal: 10,
        },
        bottomNavigationPanelContainer: {
            width: "100%",
            borderRadius: 12,
            backgroundColor: colors.background,
            padding: 18,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        bottomNavigationPanelTitle: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        bottomNaviationPanelTitleArrowIcon: {
            marginLeft: 5,
        },
        onGoingNavigationText: {
            color: colors.subtitle,
            fontSize: 16,
        },
        bottomNavigationPanelArrivingInContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
        },
        bottomNavigationPanelArrivingInText: {
            color: colors.text,
            fontWeight: "600",
            fontSize: 24,
        },
        bottomNavigationPanelTimeText: {
            color: colors.primary,
            fontWeight: "600",
            fontSize: 24,
            marginLeft: 5,
        },
        bottomNavigationPanelETAText: {
            color: colors.subtitle,
            fontWeight: "600",
            fontSize: 24,
            marginLeft: 5,
        },
        topNavigationPanelDistanceText: {
            color: colors.subtitle,
            fontWeight: "600",
            fontSize: 18,
        },
        topNavigationPanelDirectionText: {
            color: colors.text,
            fontWeight: "600",
            fontSize: 24,
        },
    });

    const TopNavigationPanel = () => (
        <>
            <View style={styles.topNavigationPanelContainerWithSafeAreaContainer}>
                <SafeAreaView edges={["top"]} />
                <View style={styles.topNavigationPanelContainer}>
                    {currentDirection.distance && (
                        <ThemedText style={styles.topNavigationPanelDistanceText}>
                            {currentDirection.distance.text}
                        </ThemedText>
                    )}
                    {currentDirection.text && (
                        <ThemedText style={styles.topNavigationPanelDirectionText}>
                            {currentDirection.text}
                        </ThemedText>
                    )}
                </View>
            </View>
        </>
    );

    const BottomNavigationPanel = () => (
        <View style={styles.bottomNavigationPanelContainerWithSafeAreaContainer}>
            <View style={styles.bottomNavigationPanelContainer}>
                <View style={styles.bottomNavigationPanelTitle}>
                    <ThemedText style={styles.onGoingNavigationText}>
                        On-going navigation
                    </ThemedText>
                    <ArrowIcon style={styles.bottomNaviationPanelTitleArrowIcon} />
                </View>
                <View style={styles.bottomNavigationPanelArrivingInContainer}>
                    <ThemedText style={styles.bottomNavigationPanelArrivingInText}>
                        Arriving in
                    </ThemedText>
                    <ThemedText style={styles.bottomNavigationPanelTimeText}>
                        {Math.round(ROUTE_DETAILS.schedule.duration / 60)} min
                    </ThemedText>
                    <ThemedText style={styles.bottomNavigationPanelETAText}>
                        · {dayjs(ROUTE_DETAILS.schedule.arriving_at).format("HH:mm")}
                    </ThemedText>
                </View>
            </View>
            <SafeAreaView edges={["bottom"]} />
        </View>
    );

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.maps}
                initialRegion={INITIAL_MAP_REGION}
                provider="google"
                customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                showsUserLocation
            >
                {Object.keys(polylines).map((key) => (
                    <>
                        <Marker coordinate={polylines[key].polyline[0]} anchor={{ x: 0.5, y: 0.5 }}>
                            <View
                                style={{
                                    ...styles.marker,
                                    backgroundColor: colors.white,
                                    borderColor: colors.middle_grey,
                                }}
                            />
                        </Marker>
                        <Polyline
                            coordinates={polylines[key].polyline}
                            strokeWidth={14}
                            strokeColor={pSBC(
                                -0.5,
                                polylines[key].color
                                    ? polylines[key].color
                                    : colors.upper_background,
                            )}
                        />
                        <Polyline
                            coordinates={polylines[key].polyline}
                            strokeWidth={8}
                            strokeColor={polylines[key].color}
                        />
                        <Marker
                            coordinate={polylines[key].polyline[polylines[key].polyline.length - 1]}
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

            <TopNavigationPanel />
            <BottomNavigationPanel />
        </View>
    );
};

export default Navigation;
