import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../../components/search-box";
import ThemedText from "../../components/themed-text";

export default function Search() {
    const styles = StyleSheet.create({
        container: { padding: 12 },
    });
    return (
        <SafeAreaView style={styles.container}>
            <SearchBox />
        </SafeAreaView>
    );
}
