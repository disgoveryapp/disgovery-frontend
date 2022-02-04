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
} from "react-native";
import ThemedText from "../themed-text";
import BusIcon from "../../assets/bus-icon";
import ArrowIcon from "../../assets/arrow_forward-icon";

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

export default function BottomCardFlatList() {
    // const { colors } = useTheme();

    const renderItem = ({ item }) => <Item title={item.title} time={item.time} line={item.line} />;

    const ItemDivider = () => {
        return <View style={styles.devider} />;
    };

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

const styles = StyleSheet.create({
    lower_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#282828",
        padding: 10,
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
        backgroundColor: "white",
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
        color: "red",
    },
    arrow: {
        marginLeft: 5,
        marginRight: 5,
    },
    title: {
        fontSize: 18,
        color: "white",
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
        color: "white",
        textAlign: "right",
    },
    devider: {
        height: 0.5,
        backgroundColor: "gray",
    },
});
