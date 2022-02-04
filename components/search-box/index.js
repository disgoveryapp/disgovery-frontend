import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/themed-text";
import SearchIcon from "../../assets/svgs/search-icon";
import StarBorderIcon from "../../assets/svgs/star-border-icon";
import { useTheme } from "@react-navigation/native";

function SearchBox(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            width: "100%",
            height: 44,
            borderRadius: 12,
            backgroundColor: colors.upper_background,
            paddingHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        placeholderText: {
            fontWeight: "500",
            fontSize: 16,
            color: colors.text,
            marginLeft: 5,
        },
        searchIconAndPlaceholder: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        favouriteIcon: {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
        },
    });

    return (
        <TouchableOpacity style={{ ...styles.container, ...props.style }}>
            <View style={styles.searchIconAndPlaceholder}>
                <SearchIcon />
                <ThemedText style={styles.placeholderText}>Search destination</ThemedText>
            </View>
            <View style={styles.favouriteIcon}>
                <StarBorderIcon />
            </View>
        </TouchableOpacity>
    );
}

export default SearchBox;
