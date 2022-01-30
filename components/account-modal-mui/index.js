import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import ThemedText from "../themed-text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountMenu() {
    const { colors } = useTheme();

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
            height: 145,
            backgroundColor: colors.background,
            borderRadius: 12,
            alignContent: "flex-start",
            top: "88%",
        },
        container: {
            justifyContent: "flex-end",
            alignItems: "flex-end",
        },
    });
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    return (
        <View style={styles.container}>
            <Menu
                style={styles.menubox}
                visible={visible}
                anchor={
                    <Pressable style={styles.box} onPress={showMenu}>
                        <Image
                            style={styles.image}
                            source={require("../../assets/baseline_person_black_48dp.png")}
                        />
                    </Pressable>
                }
                onRequestClose={hideMenu}
                animationDuration={200}
            >
                <MenuItem onPress={hideMenu}>
                    <ThemedText>Account information</ThemedText>
                </MenuItem>
                <MenuItem onPress={hideMenu}>
                    <ThemedText>Settings</ThemedText>
                </MenuItem>
                <MenuItem onPress={hideMenu}>
                    <ThemedText>Log out</ThemedText>
                </MenuItem>
            </Menu>
        </View>
    );
}
