import React, { useState } from "react";
import { StyleSheet, View, Platform, NativeModules } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../../components/search-box";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import { configureFonts, Searchbar } from "react-native-paper";

export default function Search() {
    const { colors } = useTheme();
    const { StatusBarManager } = NativeModules;
    const statusbar_height = Platform.OS === "ios" ? 0 : StatusBarManager.HEIGHT;
    const [searchQuery, setSearchQuery] = React.useState("");

    const onChangeSearch = (query) => setSearchQuery(query);

    const theme = {
        dark: true,
        mode: "adaptive",
        roundness: 12,

        colors: {
            primary: "grey",
            text: colors.text,
            surface: "#000000",
            placeholder: "grey",
        },
    };

    const styles = StyleSheet.create({
        searchbox: {
            paddingHorizontal: 12,
            paddingBottom: 12,
        },
        body: {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
        },
        container: {
            flex: 1,
            backgroundColor: colors.upper_background,
        },
        searchbar: {
            backgroundColor: colors.upper_background,
            shadowColor: colors.upper_background,
        },
    });
    return (
        <>
            <SafeAreaView style={styles.container} edges={["top"]}>
                <View style={styles.searchbox}>
                    <Searchbar
                        placeholder="Search destination"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchbar}
                        theme={theme}
                    />
                </View>
                <SafeAreaView style={styles.body} edges={["bottom"]}></SafeAreaView>
            </SafeAreaView>
        </>
    );
}
