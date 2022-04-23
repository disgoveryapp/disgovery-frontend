import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import ThemedText from "../../../../components/themed-text";
import PropTypes from "prop-types";
import RouteNotFoundIcon from "../../../../assets/svgs/route-not-found-icon";
import LocationOffIcon from "../../../../assets/svgs/location-off-icon";

function LocationAccessDeniedModal(props) {
    const { colors } = useTheme();

    const onDismiss = props.onDismiss || function () {};

    const styles = StyleSheet.create({
        container: {
            backgroundColor: `${colors.shadow}88`,
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
                        <LocationOffIcon fill={colors.yellow} />
                        <View style={styles.titleTextContainer}>
                            <ThemedText style={styles.titleText}>No location access</ThemedText>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ThemedText style={styles.bodyText}>
                            You cannot navigate to places without precise location access. Please
                            allow precise location access in the device settings.
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

LocationAccessDeniedModal.propTypes = {
    onDismiss: PropTypes.func,
};

export default LocationAccessDeniedModal;
