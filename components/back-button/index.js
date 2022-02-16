import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ArrowBackwardIcon from "../../assets/svgs/arrow-backward-24px";
import PropTypes from "prop-types";
import { TouchableHighlight } from "react-native-gesture-handler";

const BackButton = (props) => {
    const { colors } = useTheme();

    const onPress = props.onPress || function () {};

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
            width: 40,
            height: 40,
            paddingRight: 2,
            borderRadius: 60,

            shadowColor: "#000",
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
        <TouchableHighlight
            style={[styles.container, props.style]}
            onPress={onPress}
            underlayColor={colors.upper_background}
        >
            <ArrowBackwardIcon />
        </TouchableHighlight>
    );
};

BackButton.propTypes = {
    onPress: PropTypes.func,
};

export default BackButton;
