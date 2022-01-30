import React, { useEffect, useRef, useState } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { useTheme } from "@react-navigation/native";
import {
    View,
    Modal,
    Image,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Text,
    TouchableHighlight,
} from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import ThemedText from "../themed-text";

export default function AccountModal() {
    const ref = useRef();
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);

    const closeModal = () => setModalVisible(false);
    const styles = StyleSheet.create({
        image: {
            width: 36,
            height: 36,
            borderRadius: 18,
            //borderWidth: 1,
            //borderColor: colors.background,
            backgroundColor: "white",
        },
        box: {
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
        },
        menubox: {
            width: 180,
            height: 102,
            backgroundColor: colors.background,
            borderRadius: 12,
            alignSelf: "flex-end",
            top: -12,
        },
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
        },
        submenu: {
            width: "auto",
            height: 34,
            alignContent: "center",
            justifyContent: "center",
        },
    });
    return (
        <View style={styles.container}>
            {modalVisible ? (
                <View style={styles.menubox}>
                    <View style={styles.submenu}>
                        <ThemedText>Account</ThemedText>
                    </View>

                    <ThemedText>Settings</ThemedText>
                    <ThemedText>Log out</ThemedText>
                </View>
            ) : (
                <></>
            )}

            <Pressable onPress={() => setModalVisible(!modalVisible)} styles={styles.box}>
                <View style={styles.box}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/baseline_person_black_48dp.png")}
                    />
                </View>
            </Pressable>
        </View>
    );
}

/*

*/
