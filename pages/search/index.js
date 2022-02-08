import React, { useState } from "react";
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
import SearchBox from "../../components/search-box";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import Searchbar from "./components/search-bar";

export default function Search() {
    const { colors } = useTheme();
    const [text, onChangeText] = useState("");

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
                        <View>
                            <ThemedText style={styles.topictext}>Favourite location</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={styles.topictext}>Recent</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={styles.topictext}>stations</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={styles.topictext}>Places</ThemedText>
                        </View>
                    </ScrollView>
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

      <FlatList
                        style={styles.flatList}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 35, paddingTop: 12 }}
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
*/
