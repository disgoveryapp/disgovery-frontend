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
import SearchOriginBar from "./components/search-origin-bar";

export default function Search() {
    const { colors } = useTheme();

    const [text, onChangeText] = useState("");
    const [api22Result, setApi22Result] = useState([]);
    const [api21Result, setApi21Result] = useState([]);
    const [error21, setError21] = useState(false);
    const [error22, setError22] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clickDestination, setClickDestination] = useState(false);
    const [searchOrigin, setSearchOrigin] = useState(false);
    const [searchDestination, setSearchDestination] = useState(false);
    const [originData, setOriginData] = useState([]);
    const [destinationData, setDestinationData] = useState([]);
    const [originInput, setOriginInput] = useState("");
    const [destinationInput, setDestinationInput] = useState("");

    const numberOfApi22Data = 4;

    const debouncedtextValue = useDebounce(text, 200);
    const debouncedOriginValue = useDebounce(originInput, 200);
    const debouncedDestinationValue = useDebounce(destinationInput, 200);

    async function simpleApi22Call(searchText) {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/stations?query=${searchText}&max_result=${numberOfApi22Data}`,
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
    }

    async function simpleApi21Call(searchText) {
        try {
            const result = await axios({
                method: "get",
                url: `${configs.API_URL}/autocomplete/places?query=${searchText}`,
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
    }
    async function setsearchText() {
        if (clickDestination) {
            if (searchDestination) {
                setTextSearch(originInput);
            } else {
                setTextSearch(destinationInput);
            }
        } else {
            setTextSearch(text);
        }
    }
    useEffect(() => {
        if (text === "") {
            setApi22Result([]);
        } else {
            console.log("he");
            setLoading(true);
            simpleApi22Call(text);
            setLoading(false);
        }
    }, [text]);
    useEffect(() => {
        setSearchDestination(false);
        if (originInput === "") {
            console.log("hello");

            setApi22Result([]);
        } else {
            setLoading(true);
            simpleApi22Call(originInput);
            setLoading(false);
        }
    }, [originInput]);
    useEffect(() => {
        setSearchDestination(true);
        console.log(text);
        console.log(destinationInput);
        if (destinationInput === "") {
            setApi22Result([]);
        } else if (text !== "") {
            console.log("hell");
            setApi21Result([]);
            setApi22Result([]);
        } else {
            setLoading(true);
            simpleApi22Call(destinationInput);
            setLoading(false);
        }
    }, [destinationInput]);

    useEffect(() => {
        if (text === "") {
            setApi21Result([]);
            setApi22Result([]);
        } else {
            simpleApi21Call(text);
        }
    }, [debouncedtextValue]);
    useEffect(() => {
        if (originInput === "") {
            setApi21Result([]);
            setApi22Result([]);
        } else {
            simpleApi21Call(originInput);
        }
    }, [debouncedOriginValue]);
    useEffect(() => {
        if (destinationInput === "") {
            setApi21Result([]);
            setApi22Result([]);
        } else if (text !== "") {
            console.log("hel");
            setApi21Result([]);
            setApi22Result([]);
            onChangeText("");
        } else {
            simpleApi21Call(destinationInput);
        }
    }, [debouncedDestinationValue]);

    useEffect(() => {
        setApi21Result([]);
        setApi22Result([]);
    }, [clickDestination]);

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
                    {clickDestination ? (
                        <>
                            <SearchOriginBar
                                placeholder="Search Origin"
                                placeholderLocation="No Location"
                                onChangeText={setOriginInput}
                                value={originInput}
                                onChangeTextLocation={setDestinationInput}
                                valueLocation={destinationInput}
                                onPressDestination={() => {
                                    setSearchDestination(true);
                                }}
                                onPressOrigin={() => {
                                    setSearchDestination(false);
                                }}
                                autoFocus={true}
                            />
                        </>
                    ) : (
                        <Searchbar
                            placeholder="Search destination"
                            onChangeText={onChangeText}
                            value={text}
                        />
                    )}
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
                                                                    onPress={() => {
                                                                        if (
                                                                            !clickDestination ||
                                                                            searchDestination
                                                                        ) {
                                                                            setDestinationInput(
                                                                                item.name.en,
                                                                            );
                                                                            setClickDestination(
                                                                                true,
                                                                            );
                                                                            setDestinationData(
                                                                                item,
                                                                            );
                                                                        } else {
                                                                            setOriginInput(
                                                                                item.name.en,
                                                                            );
                                                                            setOriginData(item);
                                                                        }
                                                                    }}
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
                                                                onPress={() => {
                                                                    if (!clickDestination) {
                                                                        setClickDestination(true);
                                                                        setDestinationInput(
                                                                            item.name.en,
                                                                        );
                                                                        setDestinationData(item);
                                                                    } else if (searchDestination) {
                                                                        setDestinationInput(
                                                                            item.name.en,
                                                                        );
                                                                        setDestinationData(item);
                                                                    } else {
                                                                        setOriginInput(
                                                                            item.name.en,
                                                                        );
                                                                        setOriginData(item);
                                                                    }
                                                                }}
                                                            ></PlaceTab>
                                                        ))}
                                                    </View>
                                                </View>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {clickDestination ? (
                                                <>
                                                    <PlaceTab
                                                        place="Your Location"
                                                        address="Somewhere over the rainbow"
                                                        onPress={() => {
                                                            if (searchDestination) {
                                                                setDestinationInput(
                                                                    "Your Location",
                                                                );
                                                                setDestinationData([
                                                                    { name: "my-location" },
                                                                ]);
                                                            } else {
                                                                setOriginInput("Your Location");
                                                                setOriginData([
                                                                    { name: "my-location" },
                                                                ]);
                                                            }
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </>
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
