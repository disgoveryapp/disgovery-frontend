import { StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import ThemedText from "../themed-text";
import { useTheme } from "@react-navigation/native";

function TransitLine(props) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            width: "auto",
            alignSelf: "flex-start",
            borderRadius: 6,
            paddingVertical: 3,
            paddingHorizontal: 8,
            backgroundColor: props.line.color ? `#${props.line.color}` : colors.upper_background,
        },
        lineNameText: {
            color: props.text_color ? `#${props.line.text_color}` : colors.white,
            fontWeight: "600",
            fontSize: 16,
        },
    });

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <ThemedText style={styles.lineNameText}>
                {props.type === "short" ? props.line.name.short_name : props.line.name.long_name}
            </ThemedText>
        </View>
    );
}

TransitLine.propTypes = {
    line: PropTypes.exact({
        name: PropTypes.exact({
            short_name: PropTypes.string,
            long_name: PropTypes.string,
        }),
        color: PropTypes.string,
        text_color: PropTypes.string,
    }),
    type: PropTypes.oneOf(["short", "long"]),
};

export default TransitLine;
