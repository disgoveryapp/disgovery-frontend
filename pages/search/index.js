import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import Searchbar from "./components/search-bar";
import axios from "axios";
import PlaceTab from "./components/place-tab";
import { useDebounce } from "use-lodash-debounce";
import StationTab from "./components/station-tab";
import { configs } from "../../configs/configs";
import BadConnectionComponent from "./components/bad-connection";

export default function Search() {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [api22Result, setApi22Result] = useState([]);
    const [api21Result, setApi21Result] = useState([]);
    const debouncedValue = useDebounce(text, 200);
    const [error21, setError21] = useState(false);
    const [error22, setError22] = useState(false);
    const [loading, setLoading] = useState(false);
    const simpleApi22Call = async (str) => {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/stations?query=${text}&max_result=4`,
                headers: {},
            });
            setError22(false);
            if (result.data.data === undefined && result.data.data === null) {
                setApi22Result([]);
            } else {
                setApi22Result(result.data.data);
            }
        } catch (error) {
            setError22(true);
        }
    };
    const simpleApi21Call = async (str) => {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/places?query=${text}`,
                headers: {},
            });
            setError21(false);
            if (result.data === undefined && result.data === null) {
                setApi21Result([]);
            } else {
                setApi21Result(result.data);
            }
        } catch (error) {
            setError21(true);
        }
    };

    useEffect(() => {
        if (text === "") {
            setApi22Result([]);
        } else {
            setLoading(true);
            simpleApi22Call();
            setLoading(false);
            console.log(api22Result);
        }
    }, [text]);

    useEffect(() => {
        if (text === "") {
            setApi21Result([]);
            setApi22Result([]);
        } else {
            simpleApi21Call();
        }
    }, [debouncedValue]);

    const styles = StyleSheet.create({
        searchbox: {
            paddingVertical: 5,
            paddingHorizontal: 12,
            paddingBottom: 12,
        },
        container: {
            flex: 1,
            backgroundColor: colors.upper_background,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        scrollView: {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
        },
        flatList: {
            height: "100%",
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
        topictext: {
            color: "grey",
            paddingHorizontal: 15,
        },
        tabbarcontainer: {
            paddingBottom: 12,
        },
    });

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.searchbox}>
                    <Searchbar
                        placeholder="Search destination"
                        onChangeText={onChangeText}
                        value={text}
                    />
                </View>
                <TouchableOpacity onPress={() => onChangeText}></TouchableOpacity>

                <View style={styles.scrollView}>
                    {loading ? (
                        <></>
                    ) : (
                        <>
                            {!(error21 && error22) ? (
                                <ScrollView
                                    style={styles.scrollView}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 35, paddingTop: 12 }}
                                >
                                    {(api22Result !== undefined &&
                                        api22Result !== null &&
                                        api22Result.length !== 0) ||
                                    (api21Result !== undefined &&
                                        api21Result !== null &&
                                        api21Result.length !== 0) ? (
                                        <>
                                            {api22Result !== undefined &&
                                            api22Result !== null &&
                                            api22Result.length !== 0 ? (
                                                <>
                                                    <ThemedText style={styles.topictext}>
                                                        Stations
                                                    </ThemedText>
                                                    <View style={styles.tabbarcontainer}>
                                                        <>
                                                            {api22Result.map((item, key) => (
                                                                <StationTab
                                                                    key={key}
                                                                    place={item.name.en}
                                                                    trip={item.trips}
                                                                ></StationTab>
                                                            ))}
                                                        </>
                                                    </View>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {api21Result !== undefined &&
                                            api21Result !== null &&
                                            api21Result.length !== 0 ? (
                                                <View>
                                                    <ThemedText style={styles.topictext}>
                                                        Places
                                                    </ThemedText>
                                                    <View style={styles.tabbarcontainer}>
                                                        {api21Result.map((item, key) => (
                                                            <PlaceTab
                                                                key={key}
                                                                place={item.name.en}
                                                                address={item.address.en}
                                                            ></PlaceTab>
                                                        ))}
                                                    </View>
                                                </View>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </ScrollView>
                            ) : (
                                <BadConnectionComponent />
                            )}
                        </>
                    )}
                </View>
            </View>
        </>
    );
}
/*
{item.name.en}
*/
