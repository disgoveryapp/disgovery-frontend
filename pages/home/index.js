import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import AccountModal from "../../components/account-modal";
import AccountMenu from "../../components/account-modal-mui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        text: {
            fontSize: 32,
            fontWeight: "bold",
        },
        maps: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
        searchbox: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: 12,
        },
        accountbox: {
            position: "absolute",
            right: 0,
            bottom: 25,
            alignItems: "flex-end",
        },
    });

    function decodePolyline() {
        const decoded = decode(polyline, 5);
        console.log(decoded);
        let decodedPolyline = [];

        decoded.forEach((element) => {
            decodedPolyline.push({ latitude: element[0], longitude: element[1] });
        });

        return decodedPolyline;
    }

    return (
        <View style={styles.container}>
            {<MapView style={styles.maps}></MapView>}
            <View style={styles.searchbox}>
                <AccountModal accountmodalstyle={styles.accountbox} />
            </View>
        </View>
    );
}
