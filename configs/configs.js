import { API_URL, PERSISTENT_JWT } from "@env";

export const configs = {
    API_URL: API_URL || "https://apiportal.disgovery.app",
    PERSISTENT_JWT: PERSISTENT_JWT || "",
    INITIAL_MAP_REGION: {
        latitude: 13.764889,
        longitude: 100.538266,
        latitudeDelta: 0.035,
        longitudeDelta: 0.035,
    },
};

export function pSBC(p, c0, c1, l) {
    let r,
        g,
        b,
        P,
        f,
        t,
        h,
        i = parseInt,
        m = Math.round,
        a = typeof c1 == "string";
    if (
        typeof p != "number" ||
        p < -1 ||
        p > 1 ||
        typeof c0 != "string" ||
        (c0[0] != "r" && c0[0] != "#") ||
        (c1 && !a)
    )
        return null;
    if (!this.pSBCr)
        this.pSBCr = (d) => {
            let n = d.length,
                x = {};
            if (n > 9) {
                ([r, g, b, a] = d = d.split(",")), (n = d.length);
                if (n < 3 || n > 4) return null;
                (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
                    (x.g = i(g)),
                    (x.b = i(b)),
                    (x.a = a ? parseFloat(a) : -1);
            } else {
                if (n == 8 || n == 6 || n < 4) return null;
                if (n < 6)
                    d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                d = i(d.slice(1), 16);
                if (n == 9 || n == 5)
                    (x.r = (d >> 24) & 255),
                        (x.g = (d >> 16) & 255),
                        (x.b = (d >> 8) & 255),
                        (x.a = m((d & 255) / 0.255) / 1000);
                else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
            }
            return x;
        };
    (h = c0.length > 9),
        (h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h),
        (f = this.pSBCr(c0)),
        (P = p < 0),
        (t =
            c1 && c1 != "c"
                ? this.pSBCr(c1)
                : P
                ? { r: 0, g: 0, b: 0, a: -1 }
                : { r: 255, g: 255, b: 255, a: -1 }),
        (p = P ? p * -1 : p),
        (P = 1 - p);
    if (!f || !t) return null;
    if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
    else
        (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
            (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
            (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
    (a = f.a),
        (t = t.a),
        (f = a >= 0 || t >= 0),
        (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
    if (h)
        return (
            "rgb" +
            (f ? "a(" : "(") +
            r +
            "," +
            g +
            "," +
            b +
            (f ? "," + m(a * 1000) / 1000 : "") +
            ")"
        );
    else
        return (
            "#" +
            (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
                .toString(16)
                .slice(1, f ? undefined : -2)
        );
}

/**
 *
 * @param {"0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"11"|"12"} type
 * @param {boolean} plural
 * @returns
 */
export function getRouteTypeString(type, plural) {
    if (!plural) plural = false;

    switch (type) {
        case "0":
            return plural ? "trains" : "a train";
        case "1":
            return plural ? "trains" : "a train";
        case "2":
            return plural ? "trains" : "a train";
        case "3":
            return plural ? "buses" : "a bus";
        case "4":
            return plural ? "ferries" : "a ferry";
        case "5":
            return plural ? "trams" : "a tram";
        case "6":
            return plural ? "cable cars" : "a cable car";
        case "7":
            return plural ? "funiculars" : "a funicular";
        case "11":
            return plural ? "buses" : "a bus";
        case "12":
            return plural ? "train" : "a train";
        default:
            return "";
    }
}
export const MockupData = [
    {
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
    },
];

const INTERPOLATION_ITERATION = 10;
const OFF_ROAD_DISTANCE_KM = 0.05;

export function snapToPolyline(polylines, currentCoordinates) {
    if (!currentCoordinates) return;

    let allPolylines = [];

    for (let i = 0; i < polylines.length; i++) {
        allPolylines.push(...polylines[i].polyline);
    }

    let minDistance = Infinity;
    let closestPoint = {
        latitude: 0,
        longitude: 0,
        index: 0,
    };

    for (let i = 0; i < allPolylines.length; i++) {
        let distance = getDistanceFromLatLonInKm(
            allPolylines[i].latitude,
            allPolylines[i].longitude,
            currentCoordinates.latitude,
            currentCoordinates.longitude,
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestPoint.latitude = allPolylines[i].latitude;
            closestPoint.longitude = allPolylines[i].longitude;
            closestPoint.index = i;
        }
    }

    let interpolatedCoordinatesOnPolyline = interpolatePolyline(
        allPolylines,
        closestPoint,
        currentCoordinates,
        undefined,
        INTERPOLATION_ITERATION,
    );

    let distanceBetweenCurrentAndInterpolated = getDistanceFromLatLonInKm(
        interpolatedCoordinatesOnPolyline.latitude,
        interpolatedCoordinatesOnPolyline.longitude,
        currentCoordinates.latitude,
        currentCoordinates.longitude,
    );

    let distanceToDestination = 0;

    for (let i = interpolatedCoordinatesOnPolyline.index; i < allPolylines.length; i++) {
        if (i === interpolatedCoordinatesOnPolyline.index) {
            distanceToDestination += getDistanceFromLatLonInKm(
                interpolatedCoordinatesOnPolyline.latitude,
                interpolatedCoordinatesOnPolyline.longitude,
                allPolylines[i].latitude,
                allPolylines[i].longitude,
            );
        }

        if (i !== allPolylines.length - 1) {
            distanceToDestination += getDistanceFromLatLonInKm(
                allPolylines[i].latitude,
                allPolylines[i].longitude,
                allPolylines[i + 1].latitude,
                allPolylines[i + 1].longitude,
            );
        }
    }

    return {
        interpolatedCoordinatesOnPolyline: interpolatedCoordinatesOnPolyline,
        distance: distanceBetweenCurrentAndInterpolated,
        distanceToDestination: distanceToDestination,
        offRoad: distanceBetweenCurrentAndInterpolated > OFF_ROAD_DISTANCE_KM,
    };
}

function interpolatePolyline(allPolylines, closestPoint, currentLocation, candidate, iteration) {
    if (iteration === 0) return closestPoint;

    if (allPolylines.length === 0) {
        return closestPoint;
    }

    if (!candidate) {
        candidate = {
            latitude: 0,
            longitude: 0,
            index: 0,
        };

        if (closestPoint.index === 0) {
            candidate.latitude = allPolylines[closestPoint.index + 1].latitude;
            candidate.longitude = allPolylines[closestPoint.index + 1].longitude;
            candidate.index = closestPoint.index + 1;
        } else if (closestPoint.index === allPolylines.length - 1) {
            candidate.latitude = allPolylines[closestPoint.index - 1].latitude;
            candidate.longitude = allPolylines[closestPoint.index - 1].longitude;
            candidate.index = closestPoint.index - 1;
        } else {
            let distance = getDistanceFromLatLonInKm(
                allPolylines[closestPoint.index - 1].latitude,
                allPolylines[closestPoint.index - 1].longitude,
                currentLocation.latitude,
                currentLocation.longitude,
            );

            let distance2 = getDistanceFromLatLonInKm(
                allPolylines[closestPoint.index + 1].latitude,
                allPolylines[closestPoint.index + 1].longitude,
                currentLocation.latitude,
                currentLocation.longitude,
            );

            if (distance < distance2) {
                candidate.latitude = allPolylines[closestPoint.index - 1].latitude;
                candidate.longitude = allPolylines[closestPoint.index - 1].longitude;
                candidate.index = closestPoint.index - 1;
            } else {
                candidate.latitude = allPolylines[closestPoint.index + 1].latitude;
                candidate.longitude = allPolylines[closestPoint.index + 1].longitude;
                candidate.index = closestPoint.index + 1;
            }
        }
    }

    let middlePoint = {
        latitude: (closestPoint.latitude + candidate.latitude) / 2,
        longitude: (closestPoint.longitude + candidate.longitude) / 2,
        index: closestPoint.index > candidate.index ? closestPoint.index : candidate.index,
    };

    let closest, secondClosest;

    let closestDistance = getDistanceFromLatLonInKm(
        closestPoint.latitude,
        closestPoint.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
    );
    let middlePointDistance = getDistanceFromLatLonInKm(
        middlePoint.latitude,
        middlePoint.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
    );
    let candidateDistance = getDistanceFromLatLonInKm(
        candidate.latitude,
        candidate.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
    );

    if (closestDistance < middlePointDistance && closestDistance < candidateDistance) {
        closest = "closest";
    } else if (middlePointDistance < closestDistance && middlePointDistance < candidateDistance) {
        closest = "middle";
    } else {
        closest = "candidate";
    }

    if (closest === "closest" || closest === "candidate") {
        secondClosest = "middle";
    } else {
        if (closestDistance < candidateDistance) {
            secondClosest = "closest";
        } else {
            secondClosest = "candidate";
        }
    }

    let closestCoordinates, secondClosestCoordinates;

    if (closest === "closest") {
        closestCoordinates = closestPoint;
    } else if (closest === "candidate") {
        closestCoordinates = candidate;
    } else {
        closestCoordinates = middlePoint;
    }

    if (secondClosest === "closest") {
        secondClosestCoordinates = closestPoint;
    } else if (secondClosest === "candidate") {
        secondClosestCoordinates = candidate;
    } else {
        secondClosestCoordinates = middlePoint;
    }

    return interpolatePolyline(
        allPolylines,
        closestCoordinates,
        currentLocation,
        secondClosestCoordinates,
        iteration - 1,
    );
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
