import React, { useState } from "react";
import { StyleSheet, View, Platform, NativeModules,ScrollView,Text,FlatList } from "react-native";
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
        scrollView: {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            paddingVertical: 22,
        },item: {
            padding: 10,
            fontSize: 18,
            height: 44,
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
                <SafeAreaView style={styles.body} edges={["bottom"]}>
                <FlatList style={styles.scrollView}
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <ThemedText style={styles.item}>{item.key}</ThemedText>}
      />
                </SafeAreaView>
            </SafeAreaView>
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