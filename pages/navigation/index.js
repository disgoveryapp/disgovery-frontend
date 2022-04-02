import { StyleSheet, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { AnimatedRegion, Marker, Polyline } from "react-native-maps";
import { googleMapsStyling } from "../../maps/google-maps-styling";
import * as Location from "expo-location";
import axios from "axios";
import { configs, getRouteTypeString, pSBC } from "../../configs/configs";
import { decode } from "@googlemaps/polyline-codec";
import ArrowIcon from "../../assets/svgs/arrow-forward-18px";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import { getDistanceFromLatLonInKm, snapToPolyline } from "./util";
import RecenterButton from "../../components/recenter-button";
import ExpandDownIcon18px from "../../assets/svgs/expand-down-icon-18px";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient/src";

const CHECKPOINT_SNAP_DISTANCE = 0.1;

const ROUTE_DETAILS = {
    schedule: {
        departing_at: "2022-03-29T15:23:00+07:00",
        arriving_at: "2022-03-29T16:22:00+07:00",
        duration: 3540,
    },
    total_fares: {
        currency: "THB",
        adult: 42,
        elder: 21,
    },
    fares: [
        {
            from: {
                station: {
                    id: "BTS_N23",
                    code: "N23",
                    name: {
                        en: "Yaek Kor Por Aor",
                        th: "แยก คปอ.",
                    },
                },
                coordinates: {
                    lat: 13.924938513614808,
                    lng: 100.62572026868564,
                },
            },
            to: {
                station: {
                    id: "BTS_N9",
                    code: "N9",
                    name: {
                        en: "Ha Yaek Lat Phrao",
                        th: "ห้าแยกลาดพร้าว",
                    },
                },
                coordinates: {
                    lat: 13.816690839481044,
                    lng: 100.5619793192045,
                },
            },
            fare: {
                currency: "THB",
                adult: 0,
                elder: 0,
            },
        },
        {
            from: {
                station: {
                    id: "MRT_BL14",
                    code: "BL14",
                    name: {
                        en: "Phahon Yothin",
                        th: "พหลโยธิน",
                    },
                },
                coordinates: {
                    lat: 13.8142085106656,
                    lng: 100.560132803287,
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
                adult: 42,
                elder: 21,
            },
        },
    ],
    directions: [
        {
            type: "board",
            from: {
                station: {
                    id: "BTS_N23",
                    code: "N23",
                    name: {
                        en: "Yaek Kor Por Aor",
                        th: "แยก คปอ.",
                    },
                    platform: {
                        id: "BTS_N23_1",
                        name: {
                            en: "Yaek Kor Por Aor (Platform 1)",
                            th: "แยก คปอ. (ชานชาลา 1)",
                        },
                        code: "1",
                    },
                },
                coordinates: {
                    lat: 13.924938513614808,
                    lng: 100.62572026868564,
                },
            },
            to: {
                station: {
                    id: "BTS_N9",
                    code: "N9",
                    name: {
                        en: "Ha Yaek Lat Phrao",
                        th: "ห้าแยกลาดพร้าว",
                    },
                    platform: {
                        id: "BTS_N9_1",
                        name: {
                            en: "Ha Yaek Lat Phrao (Platform 1)",
                            th: "ห้าแยกลาดพร้าว (ชานชาลา 1)",
                        },
                        code: "1",
                    },
                },
                coordinates: {
                    lat: 13.816690839481044,
                    lng: 100.5619793192045,
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
                        id: "BTS_N23",
                        code: "N23",
                        name: {
                            en: "Yaek Kor Por Aor",
                            th: "แยก คปอ.",
                        },
                        platform: {
                            id: "BTS_N23_1",
                            name: {
                                en: "Yaek Kor Por Aor (Platform 1)",
                                th: "แยก คปอ. (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.924938513614808,
                        lng: 100.62572026868564,
                    },
                },
                {
                    station: {
                        id: "BTS_N22",
                        code: "N22",
                        name: {
                            en: "Royal Thai Airforce Museum",
                            th: "พิพิธภัณฑ์กองทัพอากาศ",
                        },
                        platform: {
                            id: "BTS_N22_1",
                            name: {
                                en: "Royal Thai Airforce Museum (Platform 1)",
                                th: "พิพิธภัณฑ์กองทัพอากาศ (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.917942688365379,
                        lng: 100.62160135792054,
                    },
                },
                {
                    station: {
                        id: "BTS_N21",
                        code: "N21",
                        name: {
                            en: "Bhumibol Adulyadej Hospital",
                            th: "โรงพยาบาลภูมิพลอดุลยเดช",
                        },
                        platform: {
                            id: "BTS_N21_1",
                            name: {
                                en: "Bhumibol Adulyadej Hospital (Platform 1)",
                                th: "โรงพยาบาลภูมิพลอดุลยเดช (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.910710869054808,
                        lng: 100.61731830624466,
                    },
                },
                {
                    station: {
                        id: "BTS_N20",
                        code: "N20",
                        name: {
                            en: "Saphan Mai",
                            th: "สะพานใหม่",
                        },
                        platform: {
                            id: "BTS_N20_1",
                            name: {
                                en: "Saphan Mai (Platform 1)",
                                th: "สะพานใหม่ (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.89666944098239,
                        lng: 100.60904003089944,
                    },
                },
                {
                    station: {
                        id: "BTS_N19",
                        code: "N19",
                        name: {
                            en: "Sai Yud",
                            th: "สายหยุด",
                        },
                        platform: {
                            id: "BTS_N19_1",
                            name: {
                                en: "Sai Yud (Platform 1)",
                                th: "สายหยุด (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.888421956192447,
                        lng: 100.60419498964164,
                    },
                },
                {
                    station: {
                        id: "BTS_N18",
                        code: "N18",
                        name: {
                            en: "Phahon Yothin 59",
                            th: "พหลโยธิน 59",
                        },
                        platform: {
                            id: "BTS_N18_1",
                            name: {
                                en: "Phahon Yothin 59 (Platform 1)",
                                th: "พหลโยธิน 59 (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.882500693705808,
                        lng: 100.60068410311486,
                    },
                },
                {
                    station: {
                        id: "BTS_N17",
                        code: "N17",
                        name: {
                            en: "Wat Phra Sri Mahathat",
                            th: "วัดพระศรีมหาธาตุ",
                        },
                        platform: {
                            id: "BTS_N17_1",
                            name: {
                                en: "Wat Phra Sri Mahathat (Platform 1)",
                                th: "วัดพระศรีมหาธาตุ (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.875230077248888,
                        lng: 100.59666752589236,
                    },
                },
                {
                    station: {
                        id: "BTS_N16",
                        code: "N16",
                        name: {
                            en: "11th Infantry Regiment",
                            th: "กรมทหารราบที่ 11",
                        },
                        platform: {
                            id: "BTS_N16_1",
                            name: {
                                en: "11th Infantry Regiment (Platform 1)",
                                th: "กรมทหารราบที่ 11 (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.867478250607485,
                        lng: 100.59187717720759,
                    },
                },
                {
                    station: {
                        id: "BTS_N15",
                        code: "N15",
                        name: {
                            en: "Bang Bua",
                            th: "บางบัว",
                        },
                        platform: {
                            id: "BTS_N15_1",
                            name: {
                                en: "Bang Bua (Platform 1)",
                                th: "บางบัว (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.856061906697821,
                        lng: 100.58511366172296,
                    },
                },
                {
                    station: {
                        id: "BTS_N14",
                        code: "N14",
                        name: {
                            en: "Royal Forest Department",
                            th: "กรมป่าไม้",
                        },
                        platform: {
                            id: "BTS_N14_1",
                            name: {
                                en: "Royal Forest Department (Platform 1)",
                                th: "กรมป่าไม้ (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.850295266429645,
                        lng: 100.58172939530321,
                    },
                },
                {
                    station: {
                        id: "BTS_N13",
                        code: "N13",
                        name: {
                            en: "Kasetsart University",
                            th: "มหาวิทยาลัยเกษตรศาสตร์",
                        },
                        platform: {
                            id: "BTS_N13_1",
                            name: {
                                en: "Kasetsart University (Platform 1)",
                                th: "มหาวิทยาลัยเกษตรศาสตร์ (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.842248742628222,
                        lng: 100.57706512026469,
                    },
                },
                {
                    station: {
                        id: "BTS_N12",
                        code: "N12",
                        name: {
                            en: "Sena Nikhom",
                            th: "เสนานิคม",
                        },
                        platform: {
                            id: "BTS_N12_1",
                            name: {
                                en: "Sena Nikhom (Platform 1)",
                                th: "เสนานิคม (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.836450238030753,
                        lng: 100.57356882938164,
                    },
                },
                {
                    station: {
                        id: "BTS_N11",
                        code: "N11",
                        name: {
                            en: "Ratchayothin",
                            th: "รัชโยธิน",
                        },
                        platform: {
                            id: "BTS_N11_1",
                            name: {
                                en: "Ratchayothin (Platform 1)",
                                th: "รัชโยธิน (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.829726472207925,
                        lng: 100.5697300791462,
                    },
                },
                {
                    station: {
                        id: "BTS_N10",
                        code: "N10",
                        name: {
                            en: "Phahon Yothin 24",
                            th: "พหลโยธิน 24",
                        },
                        platform: {
                            id: "BTS_N10_1",
                            name: {
                                en: "Phahon Yothin 24 (Platform 1)",
                                th: "พหลโยธิน 24 (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.824095797577469,
                        lng: 100.56633347495789,
                    },
                },
                {
                    station: {
                        id: "BTS_N9",
                        code: "N9",
                        name: {
                            en: "Ha Yaek Lat Phrao",
                            th: "ห้าแยกลาดพร้าว",
                        },
                        platform: {
                            id: "BTS_N9_1",
                            name: {
                                en: "Ha Yaek Lat Phrao (Platform 1)",
                                th: "ห้าแยกลาดพร้าว (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.816690839481044,
                        lng: 100.5619793192045,
                    },
                },
            ],
            schedule: {
                departing_at: "2022-03-29T15:23:00+07:00",
                arriving_at: "2022-03-29T15:47:00+07:00",
                duration: 1440,
            },
        },
        {
            type: "transfer",
            from: {
                station: {
                    id: "BTS_N9",
                    code: "N9",
                    name: {
                        en: "Ha Yaek Lat Phrao",
                        th: "ห้าแยกลาดพร้าว",
                    },
                    platform: {
                        id: "BTS_N9_1",
                        name: {
                            en: "Ha Yaek Lat Phrao (Platform 1)",
                            th: "ห้าแยกลาดพร้าว (ชานชาลา 1)",
                        },
                        code: "1",
                    },
                },
                coordinates: {
                    lat: 13.816690839481044,
                    lng: 100.5619793192045,
                },
            },
            to: {
                station: {
                    id: "MRT_BL14",
                    code: "BL14",
                    name: {
                        en: "Phahon Yothin",
                        th: "พหลโยธิน",
                    },
                    platform: {
                        id: "MRT_BL14_1",
                        name: {
                            en: "Phahon Yothin (Platform 1)",
                            th: "พหลโยธิน (ชานชาลา 1)",
                        },
                        code: "1",
                    },
                },
                coordinates: {
                    lat: 13.8142085106656,
                    lng: 100.560132803287,
                },
            },
            schedule: {
                departing_at: "2022-03-29T15:47:00+07:00",
                arriving_at: "2022-03-29T15:54:00+07:00",
                duration: 420,
            },
        },
        {
            type: "board",
            from: {
                station: {
                    id: "MRT_BL14",
                    code: "BL14",
                    name: {
                        en: "Phahon Yothin",
                        th: "พหลโยธิน",
                    },
                    platform: {
                        id: "MRT_BL14_1",
                        name: {
                            en: "Phahon Yothin (Platform 1)",
                            th: "พหลโยธิน (ชานชาลา 1)",
                        },
                        code: "1",
                    },
                },
                coordinates: {
                    lat: 13.8142085106656,
                    lng: 100.560132803287,
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
                    platform: {
                        id: "MRT_BL28_1",
                        name: {
                            en: "Hua Lamphong (Platform 1)",
                            th: "หัวลำโพง (ชานชาลา 1)",
                        },
                        code: "1",
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
                        id: "MRT_BL14",
                        code: "BL14",
                        name: {
                            en: "Phahon Yothin",
                            th: "พหลโยธิน",
                        },
                        platform: {
                            id: "MRT_BL14_1",
                            name: {
                                en: "Phahon Yothin (Platform 1)",
                                th: "พหลโยธิน (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.8142085106656,
                        lng: 100.560132803287,
                    },
                },
                {
                    station: {
                        id: "MRT_BL15",
                        code: "BL15",
                        name: {
                            en: "Lat Phrao",
                            th: "ลาดพร้าว",
                        },
                        platform: {
                            id: "MRT_BL15_1",
                            name: {
                                en: "Lat Phrao (Platform 1)",
                                th: "ลาดพร้าว (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.8060711937521,
                        lng: 100.573647416364,
                    },
                },
                {
                    station: {
                        id: "MRT_BL16",
                        code: "BL16",
                        name: {
                            en: "Ratchadaphisek",
                            th: "รัชดาภิเษก",
                        },
                        platform: {
                            id: "MRT_BL16_1",
                            name: {
                                en: "Ratchadaphisek (Platform 1)",
                                th: "รัชดาภิเษก (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7991069760265,
                        lng: 100.574605697172,
                    },
                },
                {
                    station: {
                        id: "MRT_BL17",
                        code: "BL17",
                        name: {
                            en: "Sutthisan",
                            th: "สุทธิสาร",
                        },
                        platform: {
                            id: "MRT_BL17_1",
                            name: {
                                en: "Sutthisan (Platform 1)",
                                th: "สุทธิสาร (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7897325246411,
                        lng: 100.574172947968,
                    },
                },
                {
                    station: {
                        id: "MRT_BL18",
                        code: "BL18",
                        name: {
                            en: "Huai Khwang",
                            th: "ห้วยขวาง",
                        },
                        platform: {
                            id: "MRT_BL18_1",
                            name: {
                                en: "Huai Khwang (Platform 1)",
                                th: "ห้วยขวาง (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7784766279861,
                        lng: 100.573647154132,
                    },
                },
                {
                    station: {
                        id: "MRT_BL19",
                        code: "BL19",
                        name: {
                            en: "Thailand Cultural Centre",
                            th: "ศูนย์วัฒนธรรมแห่งประเทศไทย",
                        },
                        platform: {
                            id: "MRT_BL19_1",
                            name: {
                                en: "Thailand Cultural Centre (Platform 1)",
                                th: "ศูนย์วัฒนธรรมแห่งประเทศไทย (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7658363356662,
                        lng: 100.570027783412,
                    },
                },
                {
                    station: {
                        id: "MRT_BL20",
                        code: "BL20",
                        name: {
                            en: "Phra Ram 9",
                            th: "พระราม 9",
                        },
                        platform: {
                            id: "MRT_BL20_1",
                            name: {
                                en: "Phra Ram 9 (Platform 1)",
                                th: "พระราม 9 (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7572048760308,
                        lng: 100.56512724284,
                    },
                },
                {
                    station: {
                        id: "MRT_BL21",
                        code: "BL21",
                        name: {
                            en: "Phetchaburi",
                            th: "เพชรบุรี",
                        },
                        platform: {
                            id: "MRT_BL21_1",
                            name: {
                                en: "Phetchaburi (Platform 1)",
                                th: "เพชรบุรี (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7486586715538,
                        lng: 100.563117377548,
                    },
                },
                {
                    station: {
                        id: "MRT_BL22",
                        code: "BL22",
                        name: {
                            en: "Sukhumvit",
                            th: "สุขุมวิท",
                        },
                        platform: {
                            id: "MRT_BL22_1",
                            name: {
                                en: "Sukhumvit (Platform 1)",
                                th: "สุขุมวิท (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7384692796515,
                        lng: 100.561458228836,
                    },
                },
                {
                    station: {
                        id: "MRT_BL23",
                        code: "BL23",
                        name: {
                            en: "Queen Sirikit National Convention Centre",
                            th: "ศูนย์การประชุมแห่งชาติสิริกิติ์",
                        },
                        platform: {
                            id: "MRT_BL23_1",
                            name: {
                                en: "Queen Sirikit National Convention Centre (Platform 1)",
                                th: "ศูนย์การประชุมแห่งชาติสิริกิติ์ (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7230937363456,
                        lng: 100.560104582209,
                    },
                },
                {
                    station: {
                        id: "MRT_BL24",
                        code: "BL24",
                        name: {
                            en: "Khlong Toei",
                            th: "คลองเตย",
                        },
                        platform: {
                            id: "MRT_BL24_1",
                            name: {
                                en: "Khlong Toei (Platform 1)",
                                th: "คลองเตย (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7222631817782,
                        lng: 100.553907385336,
                    },
                },
                {
                    station: {
                        id: "MRT_BL25",
                        code: "BL25",
                        name: {
                            en: "Lumphini",
                            th: "ลุมพินี",
                        },
                        platform: {
                            id: "MRT_BL25_1",
                            name: {
                                en: "Lumphini (Platform 1)",
                                th: "ลุมพินี (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7257270940915,
                        lng: 100.54565723233,
                    },
                },
                {
                    station: {
                        id: "MRT_BL26",
                        code: "BL26",
                        name: {
                            en: "Si Lom",
                            th: "สีลม",
                        },
                        platform: {
                            id: "MRT_BL26_1",
                            name: {
                                en: "Si Lom (Platform 1)",
                                th: "สีลม (ชานชาลา 1)",
                            },
                            code: "1",
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
                        platform: {
                            id: "MRT_BL27_1",
                            name: {
                                en: "Sam Yan (Platform 1)",
                                th: "สามย่าน (ชานชาลา 1)",
                            },
                            code: "1",
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
                        platform: {
                            id: "MRT_BL28_1",
                            name: {
                                en: "Hua Lamphong (Platform 1)",
                                th: "หัวลำโพง (ชานชาลา 1)",
                            },
                            code: "1",
                        },
                    },
                    coordinates: {
                        lat: 13.7378289616559,
                        lng: 100.517166935581,
                    },
                },
            ],
            schedule: {
                departing_at: "2022-03-29T15:54:00+07:00",
                arriving_at: "2022-03-29T16:22:00+07:00",
                duration: 1680,
            },
        },
    ],
    origin: {
        station: {
            id: "BTS_N23",
            code: "N23",
            name: {
                en: "Yaek Kor Por Aor",
                th: "แยก คปอ.",
            },
            platform: {
                id: "BTS_N23_1",
                name: {
                    en: "Yaek Kor Por Aor (Platform 1)",
                    th: "แยก คปอ. (ชานชาลา 1)",
                },
                code: "1",
            },
        },
        coordinates: {
            lat: 13.924938513614808,
            lng: 100.62572026868564,
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
            platform: {
                id: "MRT_BL28_1",
                name: {
                    en: "Hua Lamphong (Platform 1)",
                    th: "หัวลำโพง (ชานชาลา 1)",
                },
                code: "1",
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
    const mapRef = useRef(null);
    const currentLocationMarkerRef = useRef(null);
    const SAFE_AREA = useSafeAreaInsets();

    const [isRecentered, setIsRecentered] = useState(true);

    const [location, setLocation] = useState(undefined);
    const [mapsCurrentLocationRegion, setMapCurrentLocationRegion] = useState(undefined);
    const [locationErrorMessage, setLocationErrorMessage] = useState(null);
    const [polylines, setPolylines] = useState([]);
    const [passedPolylines, setPassedPolylines] = useState([]);
    const [directions, setDirections] = useState([]);
    const [currentDirection, setCurrentDirection] = useState(undefined);
    const [nearestPointOnPolyline, setNearestPointOnPolyline] = useState(undefined);
    const [nearestPointOnPolylineAnimated, setNearestPointOnPolylineAnimated] = useState(undefined);
    const [offRoad, setOffRoad] = useState(false);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            if (firstRun) {
                (async () => {
                    fetchNewLocation(true);
                    parsePolylines();
                })().catch(() => {});
                firstRun = false;
            }

            setInterval(async () => fetchNewLocation(false), 100);
        }

        return () => {
            subscribed = false;
        };
    }, []);

    useEffect(() => {
        parseDirections();
    }, [polylines]);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            if (polylines.length !== 0 && location) {
                let snapped = snapToPolyline(polylines, location);
                if (snapped) {
                    if (
                        !nearestPointOnPolylineAnimated ||
                        (nearestPointOnPolylineAnimated.latitude !==
                            snapped.interpolatedCoordinatesOnPolyline.latitude &&
                            nearestPointOnPolylineAnimated.longitude !==
                                snapped.interpolatedCoordinatesOnPolyline.longitude)
                    ) {
                        if (!nearestPointOnPolylineAnimated) {
                            setNearestPointOnPolylineAnimated(
                                new AnimatedRegion({
                                    ...snapped.interpolatedCoordinatesOnPolyline,
                                }),
                            );
                        } else {
                            if (Platform.OS === "android") {
                                if (marker) {
                                    currentLocationMarkerRef.animateMarkerToCoordinate(
                                        snapped.interpolatedCoordinatesOnPolyline,
                                        10,
                                    );
                                }
                                addToPassedPolylines(snapped.interpolatedCoordinatesOnPolyline);
                            } else {
                                nearestPointOnPolylineAnimated
                                    .timing({
                                        latitude:
                                            snapped.interpolatedCoordinatesOnPolyline.latitude,
                                        longitude:
                                            snapped.interpolatedCoordinatesOnPolyline.longitude,
                                        duration: 50,
                                    })
                                    .start((finished) => {
                                        if (finished) {
                                            addToPassedPolylines(
                                                snapped.interpolatedCoordinatesOnPolyline,
                                            );
                                        }
                                    });
                            }
                        }

                        setNearestPointOnPolyline({
                            latitude: snapped.interpolatedCoordinatesOnPolyline.latitude,
                            longitude: snapped.interpolatedCoordinatesOnPolyline.longitude,
                        });
                        setOffRoad(snapped.offRoad);
                        determineCurrentDirection();
                    }
                }
            }
        }

        return () => {
            subscribed = false;
        };
    }, [location]);

    useEffect(() => {
        if (nearestPointOnPolyline) {
            console.log(nearestPointOnPolyline);
        }
    }, [nearestPointOnPolyline]);

    async function fetchNewLocation(doRecenter) {
        let { status } = await Location.requestForegroundPermissionsAsync().catch(() => {});
        if (status !== "granted") {
            setLocationErrorMessage("Location permission is denied");
            return;
        }

        Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        })
            .then((location) => {
                // console.log("location fetched", location);
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
        setIsRecentered(true);
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

    function determineCurrentDirection() {
        if (nearestPointOnPolyline) {
            let nearestDistance = Infinity;
            let nearestKey = "";

            Object.keys(directions).map((key) => {
                let distance = getDistanceFromLatLonInKm(
                    directions[key].near.lat,
                    directions[key].near.lng,
                    nearestPointOnPolyline.latitude,
                    nearestPointOnPolyline.longitude,
                );

                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestKey = key;
                }
            });

            if (!currentDirection) {
                setCurrentDirection(directions[nearestKey]);
                return;
            }

            if (nearestDistance <= CHECKPOINT_SNAP_DISTANCE) {
                if (
                    currentDirection.near.lat !== directions[nearestKey].near.lat &&
                    currentDirection.near.lng !== directions[nearestKey].near.lng
                ) {
                    setCurrentDirection(directions[nearestKey]);
                }
            }
        }
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

    function parseDirections() {
        let tempDirections = [];

        for (let i in ROUTE_DETAILS.directions) {
            if (ROUTE_DETAILS.directions[i].type === "board") {
                let boardDirection = {
                    text: `Board ${getRouteTypeString(
                        ROUTE_DETAILS.directions[i].via_line.type || "0",
                        false,
                    )} from ${ROUTE_DETAILS.directions[i].from.station.name.en} to ${
                        ROUTE_DETAILS.directions[i].to.station.name.en
                    }`,
                };

                let alightDirection = {
                    text: `Alight at ${ROUTE_DETAILS.directions[i].to.station.name.en}`,
                };

                for (let j in ROUTE_DETAILS.directions[i].passing) {
                    if (parseInt(j) < ROUTE_DETAILS.directions[i].passing.length - 2) {
                        let snappedCoordinates = snapToPolyline(polylines, {
                            latitude: ROUTE_DETAILS.directions[i].passing[j].coordinates.lat,
                            longitude: ROUTE_DETAILS.directions[i].passing[j].coordinates.lng,
                        });

                        tempDirections.push({
                            ...boardDirection,
                            near: {
                                lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                                lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                            },
                            subtext: `Next: ${
                                ROUTE_DETAILS.directions[i].passing[parseInt(j) + 1].station.name.en
                            }`,
                        });
                    } else {
                        let snappedCoordinates = snapToPolyline(polylines, {
                            latitude: ROUTE_DETAILS.directions[i].passing[j].coordinates.lat,
                            longitude: ROUTE_DETAILS.directions[i].passing[j].coordinates.lng,
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
            } else if (ROUTE_DETAILS.directions[i].type === "walk") {
                for (let step of ROUTE_DETAILS.directions[i].route.steps) {
                    tempDirections.push({
                        distance: { text: `In ${step.distance.text}`, value: step.distance.value },
                        text: htmlToText(step.html_instructions),
                        near: ROUTE_DETAILS.directions[i].start_location,
                    });
                }
            } else if (ROUTE_DETAILS.directions[i].type === "transfer") {
                let snappedCoordinates = snapToPolyline(polylines, {
                    latitude: ROUTE_DETAILS.directions[i].from.coordinates.lat,
                    longitude: ROUTE_DETAILS.directions[i].from.coordinates.lng,
                });

                tempDirections.push({
                    text: `Transfer from ${ROUTE_DETAILS.directions[i].from.station.name.en} to ${ROUTE_DETAILS.directions[i].to.station.name.en}`,
                    near: {
                        lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                        lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                    },
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
                    let snappedCoordinates = snapToPolyline(polylines, {
                        latitude: ROUTE_DETAILS.destination.coordinates.lat,
                        longitude: ROUTE_DETAILS.destination.coordinates.lng,
                    });

                    tempDirections.push({
                        text: `You have arrived at ${ROUTE_DETAILS.destination.station.name.en}`,
                        near: {
                            lat: snappedCoordinates.interpolatedCoordinatesOnPolyline.latitude,
                            lng: snappedCoordinates.interpolatedCoordinatesOnPolyline.longitude,
                        },
                    });
                }
            }
        }

        console.log(tempDirections);
        setDirections([...tempDirections]);
    }

    function addToPassedPolylines(coordinates) {
        setPassedPolylines([...passedPolylines, coordinates]);
    }

    function htmlToText(html) {
        let response = html.replaceAll(`<div style=\"font-size:0.9em\">`, "<div> ");
        response = response.replaceAll(/<[^>]+>/g, "");
        response = response.replaceAll("&nbsp;", " ");

        return response;
    }

    function onMapRegionChange() {
        setIsRecentered(false);
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
            paddingTop: SAFE_AREA.top,
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
            paddingBottom: SAFE_AREA.bottom,
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
        offRoadContainer: {
            alignSelf: "flex-end",
            marginTop: 10,
            borderRadius: 12,
            backgroundColor: colors.upper_background,
            padding: 15,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        offRoadText: {
            color: colors.text,
            fontWeight: "600",
            fontSize: 18,
        },
        recenterButton: {
            marginBottom: 10,
            marginRight: 0,
        },
        topNavigationPanelSubtextContainer: {
            width: "auto",
            borderRadius: 12,
            backgroundColor: colors.background,
            paddingHorizontal: 18,
            paddingVertical: 14,
            marginTop: 5,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        topNavigationPanelSubtext: {
            marginTop: 5,
            color: colors.subtitle,
            fontWeight: "600",
            fontSize: 16,
        },
        bottomNavigationExpandUpIcon: {
            alignSelf: "flex-end",
            marginRight: 0,
            marginLeft: "auto",
        },
        currentLocationMarker: {
            width: 20,
            height: 20,
            borderRadius: 30,
            borderWidth: 2.5,
            backgroundColor: colors.go_button,
            borderColor: colors.white,
            zIndex: 100,
        },
    });

    const TopNavigationPanel = () => (
        <>
            <View style={styles.topNavigationPanelContainerWithSafeAreaContainer}>
                <View style={styles.topNavigationPanelContainer}>
                    {currentDirection && (
                        <>
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

                            {currentDirection.subtext && (
                                <ThemedText style={styles.topNavigationPanelSubtext}>
                                    {currentDirection.subtext}
                                </ThemedText>
                            )}
                        </>
                    )}
                    {!currentDirection && (
                        <>
                            <SvgAnimatedLinearGradient
                                width="80%"
                                height={20}
                                primaryColor={colors.upper_background}
                                secondaryColor={colors.background}
                            />
                            <SvgAnimatedLinearGradient
                                style={{ marginTop: 5 }}
                                width="50%"
                                height={16}
                                primaryColor={colors.upper_background}
                                secondaryColor={colors.background}
                            />
                        </>
                    )}
                </View>

                {offRoad && (
                    <View style={styles.offRoadContainer}>
                        <ThemedText style={styles.offRoadText}>Off road</ThemedText>
                    </View>
                )}
            </View>
        </>
    );

    const BottomNavigationPanel = () => (
        <View style={styles.bottomNavigationPanelContainerWithSafeAreaContainer}>
            {!isRecentered && (
                <RecenterButton
                    style={styles.recenterButton}
                    recentered={isRecentered}
                    onPress={() => {
                        recenter({
                            ...nearestPointOnPolylineAnimated,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        });
                    }}
                />
            )}
            <View style={styles.bottomNavigationPanelContainer}>
                <View style={styles.bottomNavigationPanelTitle}>
                    <ThemedText style={styles.onGoingNavigationText}>
                        On-going navigation
                    </ThemedText>
                    <ArrowIcon style={styles.bottomNaviationPanelTitleArrowIcon} />
                    <ExpandDownIcon18px style={styles.bottomNavigationExpandUpIcon} />
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
        </View>
    );

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.maps}
                initialRegion={INITIAL_MAP_REGION}
                // provider="google"
                customMapStyle={dark ? googleMapsStyling.dark : googleMapsStyling.light}
                onTouchEnd={onMapRegionChange}
                showsUserLocation={offRoad}
                followsUserLocation={isRecentered}
            >
                {nearestPointOnPolylineAnimated && (
                    <Marker.Animated
                        ref={currentLocationMarkerRef}
                        coordinate={nearestPointOnPolylineAnimated}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View style={styles.currentLocationMarker} />
                    </Marker.Animated>
                )}

                {Object.keys(directions).map((key) => (
                    <Marker
                        style={styles.marker}
                        key={`marker_test_${key}`}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={{
                            latitude: directions[key].near.lat,
                            longitude: directions[key].near.lng,
                        }}
                    >
                        <View
                            key={`marker_test_view_${key}`}
                            style={{
                                ...styles.marker,
                                backgroundColor: colors.white,
                                borderColor: colors.middle_grey,
                            }}
                        />
                    </Marker>
                ))}

                {Object.keys(polylines).map((key) => (
                    <>
                        <Marker
                            key={`marker_start_${polylines[key].polyline[0]}`}
                            coordinate={polylines[key].polyline[0]}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <View
                                key={`marker_start_view_${polylines[key].polyline[0]}`}
                                style={{
                                    ...styles.marker,
                                    backgroundColor: colors.white,
                                    borderColor: colors.middle_grey,
                                }}
                            />
                        </Marker>
                        <Polyline
                            key={`polyline_outer_${polylines[key].polyline[0]}`}
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
                            key={`polyline_inner_${polylines[key].polyline[0]}`}
                            coordinates={polylines[key].polyline}
                            strokeWidth={8}
                            strokeColor={polylines[key].color}
                        />
                        <Marker
                            key={`marker_end_${
                                polylines[key].polyline[polylines[key].polyline.length - 1]
                            }`}
                            coordinate={polylines[key].polyline[polylines[key].polyline.length - 1]}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <View
                                key={`marker_end_view_${
                                    polylines[key].polyline[polylines[key].polyline.length - 1]
                                }`}
                                style={{
                                    ...styles.marker,
                                    backgroundColor: colors.white,
                                    borderColor: colors.middle_grey,
                                }}
                            />
                        </Marker>
                    </>
                ))}

                {passedPolylines.length !== 0 && (
                    <>
                        <Polyline
                            style={{ zIndex: 50 }}
                            coordinates={passedPolylines}
                            strokeWidth={14}
                            strokeColor={pSBC(-0.5, colors.middle_grey)}
                        />
                        <Polyline
                            style={{ zIndex: 51 }}
                            coordinates={passedPolylines}
                            strokeWidth={8}
                            strokeColor={colors.middle_grey}
                            interval={10}
                        />
                    </>
                )}
            </MapView>

            <TopNavigationPanel />
            <BottomNavigationPanel />
        </View>
    );
};

export default Navigation;
