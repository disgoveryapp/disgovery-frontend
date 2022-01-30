import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemedText from "../../components/themed-text";
import { useTheme } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import App from "../../components/search-box"

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
        maps: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
            {/* <MapView style={styles.maps}></MapView> */}
            <App/>
        </View>
    );
}
