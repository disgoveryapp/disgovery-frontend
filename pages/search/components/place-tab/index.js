import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../../components/themed-text";
import PlaceIcon from "../../../../assets/svgs/place-icon";
import HomeIcon from "../../../../assets/svgs/home-icon";
import MyLocationIcon from "../../../../assets/svgs/my-location-icon";
import WorkIcon from "../../../../assets/svgs/work-icon";
import YourLocationIcon from "../../../../assets/svgs/your-location-icon";
import { useTheme } from "@react-navigation/native";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";

function PlaceTab(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 71,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottomColor: colors.divider,
            borderBottomWidth: 1,
        },
        placeholderContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        title: {
            fontWeight: "600",
            fontSize: 18,
            color: colors.text,
        },
        subtitle: {
            fontWeight: "500",
            fontSize: 14,
            color: colors.subtitle,
        },
        subcontainer: {
            width: "100%",
            height: 71,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 15,
            borderBottomColor: colors.divider,
            borderBottomWidth: 1,
        },
        datacontainer: {
            flex: 1,
            paddingLeft: 15,
        },
    });

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <TouchableOpacity style={styles.subcontainer} onPress={props.onPress}>
                <View style={styles.placeholderContainer}>
                    <View>
                        {(() => {
                            if (props.icon == "my-location") {
                                return <MyLocationIcon />;
                            } else if (props.icon == "home") {
                                return <HomeIcon />;
                            } else if (props.icon == "work") {
                                return <WorkIcon />;
                            } else if (props.icon == "your-location") {
                                return <YourLocationIcon />;
                            } else {
                                return <PlaceIcon />;
                            }
                        })()}
                    </View>
                    {props.address ? (
                        <View style={styles.datacontainer}>
                            <ThemedTextMarquee style={styles.title} numberOfLines={1}>
                                {props.place}
                            </ThemedTextMarquee>
                            <ThemedText style={styles.subtitle} numberOfLines={1}>
                                {props.address}
                            </ThemedText>
                        </View>
                    ) : (
                        <View style={styles.datacontainer}>
                            <ThemedTextMarquee style={styles.title} numberOfLines={1}>
                                {props.place}
                            </ThemedTextMarquee>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default PlaceTab;
