import React from "react";
import ThemedText from "../../../../components/themed-text";
import { View, StyleSheet } from "react-native";
import CloudOffIcon from "../../../../assets/svgs/cloud-off";

export default function BadConnectionComponent(props) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontWeight: "600",
            fontSize: 18,
            padding: 12,
        },
    });
    return (
        <>
            <View style={styles.container}>
                <CloudOffIcon />
                <ThemedText style={styles.text}>The server can't be reached :(</ThemedText>
            </View>
        </>
    );
}
