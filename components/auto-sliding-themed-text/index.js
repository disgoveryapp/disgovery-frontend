import { StyleSheet, View } from "react-native";
import React from "react";
import ThemedText from "../themed-text";

export default function AutoSlidingThemedText(props) {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            overflow: "hidden",
            flexWrap: "nowrap",
            width: "auto",
        },
        text: {
            alignSelf: "flex-start",
            width: "auto",
        },
    });

    return (
        <View style={styles.container}>
            <ThemedText
                style={{ ...styles.text, ...props.style }}
                numberOfLines={props.numberOfLines || 1}
                onTextLayout={(event) => console.log(event.nativeEvent.lines)}
                // ellipsizeMode="clip"
            >
                {props.children}
            </ThemedText>
        </View>
    );
}
