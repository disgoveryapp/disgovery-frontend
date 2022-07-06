import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";
import InfoIcon from "../../../assets/svgs/info-icon";
import ThemedText from "../../../components/themed-text";

function ChangeOfServiceModal(props) {
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
                        <InfoIcon fill={colors.yellow} />
                        <View style={styles.titleTextContainer}>
                            <ThemedText style={styles.titleText}>Change of Service</ThemedText>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ThemedText style={styles.bodyText}>
                            Since this project had been done, from 19 June 2022 onwards, the state
                            of the application will be frozen. This means that the update of this
                            application might or might not be released, and the application might
                            stop working at any time.{"\n"}
                            {"\n"}However, you can still use our application and continue providing
                            feedback. We are keen to hear from you!{"\n"}
                            {"\n"}For further enquiries or requests, please contact us via email:{" "}
                            <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL("mailto:contact@disgovery.app");
                                }}
                            >
                                <ThemedText style={styles.bodyText} color={colors.primary}>
                                    contact@disgovery.app
                                </ThemedText>
                            </TouchableOpacity>
                            .
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

ChangeOfServiceModal.propTypes = {
    onDismiss: PropTypes.func,
};

export default ChangeOfServiceModal;
