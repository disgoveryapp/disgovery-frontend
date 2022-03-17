import React from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import ThemedText from "../themed-text";
import ArrowIcon from "../../assets/svgs/arrow_forward-icon";
import ThemedTextMarquee from "../themed-text-marquee";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function ScheduleList(props) {
    const { colors } = useTheme();

    const renderItem = (item) => {
        return (
            <Item
                destination={item.lines[0].destination.name}
            />
        );
        console.log(item);
    };

    const Item = ({ destination }) => (
        <View styles={styles.container}>
            <ArrowIcon style={styles.arrow} />
            <View styles={styles.namecontainer}>
                <ThemedText styles={styles.name}>
                    {destination.name.short_name}
                </ThemedText>
            </View>
            <View styles={styles.timecontainer}>
                <ThemedText styles={styles.time}>
                    Schedule for every 5 minutes until
                </ThemedText>
            </View>
        </View>
    );

    const styles = StyleSheet.create({
        destination: {
            flex: 1,
            justifyContent: "center",
            marginLeft: 5,
        },
        arrow: {
            marginLeft: 5,
            marginRight: 5,
        },
        timecontainer: {
            alignItems: "flex-start",
        },
        name: {
            fontSize: 20,
            color: colors.text,
        },
        timecontainer: {
            alignItems: "flex-end",
        },
        time: {
            fontSize: 20,
            textAlign: "right",
            color: colors.text,
        },
        Container: {
            width: "30%",
        },
    });

    return (
        <SafeAreaView style={{ width: "100%" }}>
            <ScrollView>
                {Object.keys(props.ScheduleDetails).map((key) => {
                    return <>{renderItem(props.ScheduleDetails[key])}</>;
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
