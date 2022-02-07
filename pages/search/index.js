import React, { useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, SafeAreaView,Platform, StatusBar } from "react-native";
import SearchBox from "../../components/search-box";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";

export default function Search() {
    const { colors } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

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
            paddingVertical: 5,
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
            backgroundColor: colors.upper_background,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        },
        searchbar: {
            backgroundColor: colors.upper_background,
            shadowColor: colors.upper_background,
        },
        scrollView: {
            height: "100%",
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            paddingHorizontal: 15,
        },
        flatList: {
            paddingTop: 15,
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
    });

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.searchbox}>
                    <Searchbar
                        placeholder="Search destination"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchbar}
                        theme={theme}
                    />
                </View>

                <View style={styles.scrollView}>
                    <FlatList
                        style={styles.flatList}
                        data={[
                            { key: "Devin" },
                            { key: "Dan" },
                            { key: "Dominic" },
                            { key: "Jackson" },
                            { key: "James" },
                            { key: "Joel" },
                            { key: "John" },
                            { key: "Jillian" },
                            { key: "Jimmy" },
                            { key: "Julie" },
                        ]}
                        renderItem={({ item }) => (
                            <ThemedText style={styles.item}>{item.key}</ThemedText>
                        )}
                    />
                </View>
            </View>
        </>
    );
}
/*
<ScrollView style={styles.scrollView}>
        <ThemedText >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ThemedText>
      </ScrollView>
*/
