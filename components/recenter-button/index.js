import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import RecenterIcon from "../../assets/svgs/recenter-icon";
import { useTheme } from "@react-navigation/native";

export default function RecenterButton(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
            borderRadius: 30,
            marginLeft: "auto",
            marginRight: 15,
            marginTop: 0,
            marginBottom: "auto",
            zIndex: 1,

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress || function () {}}>
                <RecenterIcon fill={props.recentered ? colors.primary : colors.subtitle} />
            </TouchableOpacity>
        </View>
    );
}
