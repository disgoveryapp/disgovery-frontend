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
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";
import BusIcon from "../../assets/svgs/bus-icon";
import BTSIcon from "../../assets/svgs/BTS-icon";
import ShipIcon from "../../assets/svgs/ship-icon";
import ARLIcon from "../../assets/svgs/ARL-icon";
import BRTIcon from "../../assets/svgs/BRT-icon";
import SubwayIcon from "../../assets/svgs/subway-icon";
import MLineIcon from "../../assets/svgs/MLine-icon";
import RedLineIcon from "../../assets/svgs/RedLine-icon";
import { Dimensions, Platform, PixelRatio } from 'react-native';


const raw_Data = {
    data: [
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            lines: [
                {
                    name: {
						short_name: "REDFFFLAGH",
						long_name: "333",
					},
                    headsign: "Subway",
                    destination: {
						uid: "A",
						name: "Victory",
					},
                    color: "#7FBF3A",
                    arriving_in: 2222,
                }
            ],
        },
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            lines: [
                {
                    name: {
						short_name: "333",
						long_name: "333",
					},
                    headsign: "MLine",
                    destination: {
						uid: "A",
						name: "Rangsit",
					},
                    color: "blue",
                    arriving_in: 3600,
                }
            ],
        },
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            lines: [
                {
                    name: {
						short_name: "333",
						long_name: "333",
					},
                    headsign: "Ship",
                    destination: {
						uid: "A",
						name: "Lam Lukka",
					},
                    color: "red",
                    arriving_in: 3600,
                }
            ],
        },
        {
            name: "Victory",
            uid: "12",
            code: "AAA",
            lines: [
                {
                    name: {
						short_name: "59",
						long_name: "333",
					},
                    headsign: "BRT",
                    destination: {
						uid: "A",
						name: "Lam Lukka",
					},
                    color: "red",
                    arriving_in: 2000,
                }
            ],
        }
    ]
};

const data = raw_Data["data"];
const size = Object.keys(data).length;
let result = [];
for(let i=0; i < size; i++){
  let object = {};
  object['name'] = data[i]['lines'][0]["destination"]["name"];
  object['line'] = data[i]['lines'][0]["name"]["short_name"];
  object['type'] = data[i]['lines'][0]["headsign"];
  object['time'] = Math.floor(data[i]['lines'][0]["arriving_in"]/60);
  object['color'] = data[i]['lines'][0]["color"];
  result.push(object);
};

const DATA = result;

const Item = ({ name, time, line, type, color }) => (
    <TouchableOpacity style={styles.lower_container}>
        <View style={styles.sub_container}>
            <View style={{display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    backgroundColor: "white",
                    padding:2,
                    width: 110,
                    borderRadius: 5,
                    borderWidth: 5,
                    borderColor:color,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,}}>
                {type == 'Bus'? <BusIcon style={styles.icon}/>: null }
                {type == 'Ship'? <ShipIcon style={styles.Shipicon}/>: null }
                {type == 'Subway'? <SubwayIcon style={styles.Subwayicon}/>: null }
                {type == 'BTS'? <BTSIcon style={styles.icon}/>: null }
                {type == 'MLine'? <MLineIcon style={styles.MLineicon} fill={color}/>: null }
                {type == 'BRT'? <BRTIcon style={styles.icon}/>: null }
                {type == 'RedLine'? <RedLineIcon style={styles.RedLineicon} fill={color}/>: null }
                {type == 'ARL'? <ARLIcon style={styles.icon}/>: null }
                <View style={styles.linecont}>
                    {/* <ThemedText style={styles.line}>{line}</ThemedText> */}
                    {line.length <= 4 ? <ThemedText style={styles.line_short}>{line}</ThemedText>
                        : line.length <= 10 ? <ThemedText style={styles.line_middle}>{line}</ThemedText>: 
                            line.length > 10? <ThemedText style={styles.line_long}>{line}</ThemedText>: null  }
                </View>
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

    const renderItem = ({ item }) => <Item name={item.name} time={item.time} line={item.line} type={item.type} color={item.color}/>;

    const ItemDivider = () => {
        return <View style={styles.devider} />;
    };

    return (
        <SafeAreaView style={{ width: "100%",}}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemDivider}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    lower_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#282828",
        padding: 7,
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
        borderWidth: 5,
        // borderColor:{color},
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 4,
        marginTop: 8,
        marginBottom: 6,
    },
    MLineicon:{
        width: 25,
        height: 25,
        marginLeft: 0,
        marginTop: 4,
        marginBottom: 3,
    },
    RedLineicon:{
        width: 25,
        height: 25,
        marginLeft: 0,
        marginTop: 3,
        marginBottom: 2,
    },
    Shipicon:{
        width: 25,
        height: 25,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 2,
    },
    Subwayicon:{
        width: 25,
        height: 25,
        marginLeft: 4,
        marginTop: 0,
        marginBottom: 2,
    },
    linecont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    line_short:{
        marginTop: 2,
        fontSize: 23,
        color: "black",
        textAlign:"right",
    },
    line_middle:{
        textAlignVertical:"center",
        marginTop: 4,
        fontSize: 10,
        color: "black",
        textAlign:"right",
    },
    line_long:{
        fontSize: 12,
        color: "black",
        textAlign:"right",
        width: "70%",
    },
    line: {
        color: "black",
        textAlign:"right",
        width: "60%",
    },
    arrow: {
        marginLeft: 5,
        marginRight: 5,
    },
    name: {
        fontSize: 20,
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
