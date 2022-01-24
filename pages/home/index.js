import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";

export default function Home() {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontSize: 32,
            fontWeight: "bold",
        },
    });

    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>Hello</ThemedText>
        </View>
    );
}
