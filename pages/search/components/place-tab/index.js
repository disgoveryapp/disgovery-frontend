import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../../components/themed-text";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import HomeIcon from "../../../../assets/svgs/home-icon";
import MyLocationIcon from "../../../../assets/svgs/my-location-icon";
import WorkIcon from "../../../../assets/svgs/work-icon";
import { useTheme } from "@react-navigation/native";

function PlaceTab(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 71,
            backgroundColor: colors.background,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 20,
            borderBottomColor: "grey",
            borderBottomWidth: 2,
        },
        placeholderContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        title: {
            maxWidth: 320,
            fontWeight: "600",
            fontSize: 18,
            marginLeft: 15,
            color: colors.text,
        },
        subtitle: {
            maxWidth: 320,
            fontWeight: "500",
            fontSize: 14,
            marginLeft: 15,
            color: colors.subtitle,
        },
    });

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.placeholderContainer}>
                {(() => {
                    if (props.icon == "my-location") {
                        return <MyLocationIcon />;
                    } else if (props.icon == "home") {
                        return <HomeIcon />;
                    } else if (props.icon == "work") {
                        return <WorkIcon />;
                    } else {
                        return <PlaceIcon />;
                    }
                })()}
                <View>
                    <ThemedText style={styles.title} numberOfLines={1}>
                        {props.place}
                    </ThemedText>
                    <ThemedText style={styles.subtitle} numberOfLines={1}>
                        {props.address}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default PlaceTab;
