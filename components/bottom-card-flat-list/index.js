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
import BusIcon from "../../assets/svgs/bus-icon";
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";

const raw_Data = {
    data: [
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            arriving_in: 10,
            lines: [
                {
                    name: {
						short_name: "333",
						long_name: "333",
					},
                    destination: {
						uid: "A",
						name: "Victory",
					},
                    color: "red",
                }
            ],
        },
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            arriving_in: 10,
            lines: [
                {
                    name: {
						short_name: "333",
						long_name: "333",
					},
                    destination: {
						uid: "A",
						name: "Rangsit",
					},
                    color: "red",
                }
            ],
        },
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            arriving_in: 10,
            lines: [
                {
                    name: {
						short_name: "333",
						long_name: "333",
					},
                    destination: {
						uid: "A",
						name: "Lam Lukka",
					},
                    color: "red",
                }
            ],
        },
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            arriving_in: 20,
            lines: [
                {
                    name: {
						short_name: "59",
						long_name: "333",
					},
                    destination: {
						uid: "A",
						name: "Lam Lukka",
					},
                    color: "red",
                }
            ],
        }
    ]
};

const data = raw_Data["data"];
const size = Object.keys(data).length;
let result = [];
for(i=0; i < size; i++){
  let object = {};
  object['name'] = data[i]['lines'][0]["destination"]["name"];
  object['time'] = data[i]['arriving_in'];
  object['line'] = data[i]['lines'][0]["name"]["short_name"];
  result.push(object);
};

const DATA = result;

const Item = ({ name, time, line }) => (
    <TouchableOpacity style={styles.lower_container}>
        <View style={styles.sub_container}>
            <View style={styles.transport}>
                <BusIcon style={styles.icon} />
                <ThemedText style={styles.line}>{line}</ThemedText>
            </View>
            <ArrowIcon style={styles.arrow} />
            <View style={styles.item}>
                <ThemedText style={styles.name}>{name}</ThemedText>
            </View>
        </View>
        <View style={styles.timeSection}>
            <ThemedText style={styles.time}>{time}</ThemedText>
            <ThemedText style={styles.time}>min</ThemedText>
        </View>
    </TouchableOpacity>
);

export default function BottomCardFlatList() {

    const renderItem = ({ item }) => <Item name={item.name} time={item.time} line={item.line} />;

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
    container: {
        width: "100%",
    },
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
    name: {
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
