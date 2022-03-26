import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemedText from "../themed-text";
import NavigateIcon from "../../assets/svgs/navigate-icon";

const NavigateButton = (props) => {
    const { colors } = useTheme();

    const onPress = props.onPress || function () {};

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.goButton,
            paddingHorizontal: 15,
            paddingVertical: 12,
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
        navigateText: {
            fontWeight: "600",
            fontSize: 18,
            marginLeft: 5,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={onPress}
            underlayColor={colors.goButton}
        >
            <>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <NavigateIcon />
                    <ThemedText style={styles.navigateText}>Go</ThemedText>
                </View>
            </>
        </TouchableOpacity>
    );
};

NavigateButton.propTypes = {
    onPress: PropTypes.func,
};

export default NavigateButton;
