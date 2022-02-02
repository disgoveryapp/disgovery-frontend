import React, { useEffect, useRef, useState } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { useTheme } from "@react-navigation/native";
import { useDimensions } from "@react-native-community/hooks";
import {
    View,
    Modal,
    Image,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import ThemedText from "../themed-text";
import Person from "../../svg/person";

export default function AccountModal(props) {
    const ref = useRef();
    const { colors } = useTheme();
    const { width, height } = useDimensions().window;
    const [modalVisible, setModalVisible] = useState(false);

    const menuItem = [
        { name: "Account Information", path: "" },
        { name: "Settings", path: "" },
        { name: "Log out", path: "" },
    ];
    const styles = StyleSheet.create({
        image: {
            width: 36,
            height: 36,
            borderRadius: 18,
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
            height: "auto",
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
            marginLeft: 10,
            marginVertical: 3,
        },
        test: {
            flex: 1,
            width: width,
            height: height,
        },
    });
    return (
        <View>
            <TouchableOpacity
                style={styles.test}
                onPress={() => setModalVisible(false)}
            ></TouchableOpacity>
            <View style={props.accountmodalstyle}>
                {modalVisible ? (
                    <>
                        <TouchableOpacity style={styles.menubox}>
                            {Object.keys(menuItem).map((key, index) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.submenu}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <ThemedText>{menuItem[key].name}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </TouchableOpacity>
                    </>
                ) : (
                    <></>
                )}

                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    styles={styles.box}
                >
                    <View style={styles.box}>
                        <View style={styles.image}>
                            {props.image ? (
                                <>
                                    <Image style={styles.image} />
                                </>
                            ) : (
                                <Person
                                    width={styles.image.width}
                                    height={styles.image.height}
                                    borderRadius={styles.borderRadius}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

/*

*/
