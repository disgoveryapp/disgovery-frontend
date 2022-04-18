import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import ThemedTextMarquee from "../../../../components/themed-text-marquee";
import CollapseIcon from "../../../../assets/svgs/collapse-icon";
import ExpandDownIcon from "../../../../assets/svgs/expand-down-icon";
import TransitLine from "../../../../components/transit-line";
import TransitLineForFares from "../fares/components/index";

function Fares(props) {
    const DATA = props.data;

    const { dark, colors } = useTheme();
    const [isExpandClick, setExpandClick] = useState(false);
    const CONTENT = [
        {
            isExpanded: false,
            content: "AAAAA",
        },
    ];
    const size = "large";

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: props.containerPadding,
            justifyContent: "flex-start",
            paddingVertical: 19,
        },
        transit: {
            paddingVertical: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        fare_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            textAlign: "right",
            width: "100%",
        },
        fare_container_exoanded: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            textAlign: "right",
            width: "100%",
            marginBottom: 5,
        },
        text_container: {
            fontSize: size === "small" ? 16 : 18,
            fontWeight: size === "small" ? "500" : "600",
            marginLeft: size === "small" ? 22 : 0,
        },
        subtitleText: {
            flexDirection: "row",
        },
        expand_sign: {
            display: "flex",
            flexDirection: "row",
        },
        text: {
            fontSize: 18,
            fontWeight: size === "small" ? "500" : "600",
            color: colors.text,
        },
        timeText: {
            fontWeight: "600",
            fontSize: 16,
            color: colors.subtitle,
        },
    });

    function expandClick() {
        if (isExpandClick == true) {
            setExpandClick(false);
        } else {
            setExpandClick(true);
        }
    }

    const Item = ({ linename, fare, item }) => (
        <View style={styles.transit}>
            <TransitLineForFares data={item} linename={linename} />
            <ThemedText style={styles.timeText}>
                {fare.adult} {fare.currency}
            </ThemedText>
        </View>
    );

    const renderItem = (item) => {
        return <Item linename={item.from.station.id} fare={item.fare} item={item} />;
    };

    return (
        <View style={styles.container}>
            <View>
                {isExpandClick ? (
                    <>
                        <View style={styles.fare_container_exoanded}>
                            <TouchableOpacity onPress={expandClick}>
                                <View style={styles.expand_sign}>
                                    <ThemedText style={styles.text}>Fares</ThemedText>
                                    <CollapseIcon></CollapseIcon>
                                </View>
                            </TouchableOpacity>
                            <ThemedText style={styles.text}>
                                {DATA.total_fares.adult} {DATA.total_fares.currency}
                            </ThemedText>
                        </View>
                        <View>
                            {Object.keys(DATA.fares).map((key) => {
                                return <>{renderItem(DATA.fares[key])}</>;
                            })}
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.fare_container}>
                            <TouchableOpacity onPress={expandClick}>
                                <View style={styles.expand_sign}>
                                    <ThemedText style={styles.text}>Fares</ThemedText>
                                    <ExpandDownIcon></ExpandDownIcon>
                                </View>
                            </TouchableOpacity>
                            <ThemedText style={styles.text}>
                                {DATA.total_fares.adult} {DATA.total_fares.currency}
                            </ThemedText>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}

export default Fares;
