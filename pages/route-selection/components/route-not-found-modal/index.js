import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import PropTypes from "prop-types";
import RouteNotFoundIcon from "../../../../assets/svgs/subway-icon copy";
function RouteNotFoundModal(props) {
    const { colors } = useTheme();

    const onDismiss = props.onDismiss || function () {};

    const styles = StyleSheet.create({
        container: {
            backgroundColor: `${colors.background}88`,
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: "100%",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
        },
        cautionContainer: {
            borderRadius: 12,
            backgroundColor: colors.background,
            padding: 20,
            width: "80%",

            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        },
        titleContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        titleTextContainer: {
            marginLeft: 5,
        },
        titleText: {
            fontSize: 20,
            fontWeight: "600",
            color: colors.yellow,
        },
        bodyContainer: {
            marginTop: 10,
        },
        bodyText: {
            fontSize: 16,
        },
        dismissButton: {
            alignSelf: "flex-end",
            marginTop: 20,
        },
        dismissText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary,
        },
    });

    return (
        <>
            <View style={styles.container}>
                <View style={styles.cautionContainer}>
                    <View style={styles.titleContainer}>
                        <RouteNotFoundIcon fill={colors.yellow} />
                        <View style={styles.titleTextContainer}>
                            <ThemedText style={styles.titleText}>Route not found</ThemedText>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ThemedText style={styles.bodyText}>
                            When the routes are not available, this can either be because:
                            {"\n"}
                            {"\n"}- all stations near you is now closed,
                            {"\n"}- you are trying to head from one station to the same station,
                            {"\n"}- the stations you're trying to reach are not connected to any of
                            your nearby stations, or
                            {"\n"}- the server is unreachable.
                            {"\n"}
                            {"\n"}You can try again in a few moments.
                        </ThemedText>
                    </View>
                    <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
                        <ThemedText style={styles.dismissText}>OK</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

RouteNotFoundModal.propTypes = {
    onDismiss: PropTypes.func,
};

export default RouteNotFoundModal;
