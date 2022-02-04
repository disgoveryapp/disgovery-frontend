import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/themed-text";
import SearchIcon from "../../assets/svgs/search-icon";
import StarBorderIcon from "../../assets/svgs/star-border-icon";
import { useTheme } from "@react-navigation/native";

const SearchBox = () => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 44,
            backgroundColor: colors.upper_background,
            borderRadius: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
        },
        placeholderContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        placeholder: {
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 5,
            color: colors.text,
        },
    });

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.placeholderContainer}>
                <SearchIcon />
                <ThemedText style={styles.placeholder}>Search destination</ThemedText>
            </View>

            <StarBorderIcon />
        </TouchableOpacity>
    );
};

export default SearchBox;
