import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { TouchableHighlight } from "react-native-gesture-handler";
import ThemedText from "../themed-text";

const NavigateBotton = (props) => {
    const { colors } = useTheme();

    const onPress = props.onPress || function () {};

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.red,
            width: 89,
            height: 40,
            borderRadius: 12,

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
            <ThemedText style={styles.time}>
                Navigate
            </ThemedText>
        </TouchableHighlight>
    );
};

NavigateBotton.propTypes = {
    onPress: PropTypes.func,
};

export default NavigateBotton;
