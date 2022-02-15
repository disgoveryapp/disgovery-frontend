import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/themed-text";

export default function TransportName(props) {
    const styles = StyleSheet.create({
        container: {
            alignItems: "baseline",
        },
        subcontainer: {
            backgroundColor: `#${props.color}`,
            borderRadius: 6,
            justifyContent: "center",
            paddingHorizontal: 5,
            paddingVertical: 2,
        },
        text: {
            fontWeight: "bold",
        },
    });
    return (
        <>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <ThemedText style={styles.text}>{props.name}</ThemedText>
                </View>
            </View>
        </>
    );
}
