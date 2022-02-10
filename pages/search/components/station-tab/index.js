import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../../components/themed-text";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import InfoIcon from "../../../../assets/svgs/info-icon";
import BusIcon from "../../../../assets/svgs/bus-icon";
import SubwayIcon from "../../../../assets/svgs/subway-icon";
import { useTheme } from "@react-navigation/native";

function StationTab(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 71,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "grey",
            borderBottomWidth: 2,
        },
        placeholderContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        title: {
            maxWidth: 300,
            fontWeight: "600",
            fontSize: 18,
            marginLeft: 15,
            color: colors.text,
        },
        subtitle: {
            maxWidth: 300,
            fontWeight: "500",
            fontSize: 14,
            marginLeft: 15,
            color: colors.subtitle,
        },
        iconContainer: {
            width: 24,
            height: 24,
            borderRadius: 6,
            backgroundColor: colors.text,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        subcontainer: {
            width: "100%",
            height: 71,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.subcontainer} onPress={props.onPress}>
                <View style={styles.placeholderContainer}>
                    <View style={styles.iconContainer}>
                        {(() => {
                            if (props.icon == "bus") {
                                return <BusIcon />;
                            } else if (props.icon == "train") {
                                return <SubwayIcon />;
                            } else {
                                return <PlaceIcon fill={colors.background} />;
                            }
                        })()}
                    </View>
                    <View>
                        <ThemedText style={styles.title} numberOfLines={1}>
                            {props.place}
                        </ThemedText>
                        <ThemedText style={styles.subtitle} numberOfLines={1}>
                            {props.type}
                        </ThemedText>
                    </View>
                </View>
                <TouchableOpacity onPress={props.onPress}>
                    <InfoIcon />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

export default StationTab;
