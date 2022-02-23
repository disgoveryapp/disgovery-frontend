import React from "react";
import {
    TouchableOpacity,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    Dimensions,
} from "react-native";
import ThemedText from "../themed-text";
import { darkTheme, lightTheme } from "../../themes/themes";
import BusIcon from "../../assets/svgs/bus-icon";
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";
import { useTheme } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DATA = [
    {
        id: "1",
        title: "Victory Monument",
        line: "333",
        time: 10,
    },
    {
        id: "2",
        title: "Rangsit",
        line: "333",
        time: 10,
    },
    {
        id: "3",
        title: "Lam Lukka",
        line: "333",
        time: 10,
    },
    {
        id: "4",
        title: "Lam Lukka",
        line: "59",
        time: 10,
    },
];

export default function BottomCardFlatList() {
    const { colors } = useTheme();

    const renderItem = ({ item }) => <Item title={item.title} time={item.time} line={item.line} />;

    const ItemDivider = () => {
        return <View style={styles.devider} />;
    };

    const Item = ({ title, time, line }) => (
        <TouchableOpacity style={styles.lower_container}>
            <View style={styles.sub_container}>
                <View style={styles.transport}>
                    <BusIcon style={styles.icon} />
                    <ThemedText style={styles.line}>{line}</ThemedText>
                </View>
                <ArrowIcon style={styles.arrow} />
                <View style={styles.item}>
                    <ThemedText style={styles.title}>{title}</ThemedText>
                </View>
            </View>
            <View style={styles.timeSection}>
                <ThemedText style={styles.time}>{time}</ThemedText>
                <ThemedText style={styles.time}>min</ThemedText>
            </View>
        </TouchableOpacity>
    );

    const styles = StyleSheet.create({
        lower_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.background,
            padding: SCREEN_HEIGHT/45,
        },
        sub_container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        item: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
        container: {},
        transport: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: colors.text,
            width: 80,
            borderRadius: 5,
        },
        icon: {
            width: 25,
            height: 25,
            marginLeft: 4,
            marginTop: 8,
            marginBottom: 6,
        },
        line: {
            marginTop: 2,
            fontSize: 25,
            color: colors.red,
        },
        arrow: {
            marginLeft: 5,
            marginRight: 5,
        },
        title: {
            fontSize: 18,
            color: colors.text,
        },
        timeSection: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        time: {
            fontSize: 25,
            marginRight: 2,
            marginTop: 3,
            textAlign: "right",
            color: colors.text,
        },
        devider: {
            height: 0.5,
            backgroundColor: colors.upper_background,
        },
    });
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemDivider}
            />
        </SafeAreaView>
    );
}

