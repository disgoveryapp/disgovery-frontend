import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
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

export default function Search() {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");
    const [api22Result, setApi22Result] = useState([
        {
            location: {
                coords: {
                    lat: "",
                    lon: "",
                },
            },
            name: {
                en: "",
                th: "",
            },
            station_id: "",
        },
    ]);
    const [api21Result, setApi21Result] = useState([
        {
            address: {
                en: "",
                th: "",
            },
            name: {
                en: "",
                th: "",
            },
            place_id: "",
        },
    ]);
    const debouncedValue = useDebounce(text, 300);

    useEffect(() => {
        const simpleApi22Call = async (str) => {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/stations?query=${text}&max_result=4`,
                headers: {},
            });
            setApi22Result(result.data.data);
        };
        const simpleApi21Call = async (str) => {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/places?query=${text}`,
                headers: {},
            });
            if (debouncedValue) {
                setApi21Result(result.data);
            }
        };
        console.log(text);
        simpleApi22Call();
        simpleApi21Call();
        console.log(api22Result);
        console.log(api21Result);
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
            paddingHorizontal: 8,
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
                    <ScrollView
                        style={styles.scrollView}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 35, paddingTop: 12 }}
                    >
                        {api22Result !== undefined && api21Result !== undefined ? (
                            <>
                                <View>
                                    <ThemedText style={styles.topictext}>Stations</ThemedText>
                                    <View style={styles.tabbarcontainer}>
                                        {api22Result ? (
                                            <>
                                                {api22Result.map((item, key) => (
                                                    <StationTab
                                                        key={key}
                                                        icon="train"
                                                        place={item.name.en}
                                                        type="train"
                                                    ></StationTab>
                                                ))}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                </View>

                                <View>
                                    <ThemedText style={styles.topictext}>Places</ThemedText>
                                    <View style={styles.tabbarcontainer}>
                                        {api21Result !== undefined ? (
                                            <>
                                                {api21Result.map((item, key) => (
                                                    <PlaceTab
                                                        key={key}
                                                        place={item.name.en}
                                                        address={item.address.en}
                                                    ></PlaceTab>
                                                ))}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                <View>
                                    <ThemedText style={styles.topictext}>
                                        Favourite location
                                    </ThemedText>
                                </View>
                                <View>
                                    <ThemedText style={styles.topictext}>Recent</ThemedText>
                                </View>
                            </>
                        )}
                    </ScrollView>
                </View>
            </View>
        </>
    );
}
