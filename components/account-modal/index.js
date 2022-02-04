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
import PersonIcon from "../../assets/svgs/person-icon";

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
            width: 24,
            height: 24,
            borderRadius: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        box: {
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: colors.upper_background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        menubox: {
            width: 180,
            height: "auto",
            backgroundColor: colors.upper_background,
            borderRadius: 12,
            alignSelf: "flex-end",
            top: -12,
        },
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
        },
        submenu: {
            width: "auto",
            height: 34,
            alignContent: "center",
            justifyContent: "center",
            marginLeft: 15,
        },
        clickoutside: {
            flex: 1,
            width: width,
            height: height,
        },
    });
    return (
        <View>
            {modalVisible ? (
                <TouchableOpacity
                    style={styles.clickoutside}
                    onPress={() => setModalVisible(false)}
                ></TouchableOpacity>
            ) : (
                <></>
            )}
            <Pressable style={props.accountmodalstyle} onPress={() => setModalVisible(false)}>
                {modalVisible ? (
                    <>
                        <View style={styles.menubox}>
                            {Object.keys(menuItem).map((key, index) => (
                                <TouchableOpacity
                                    key={key}
                                    style={{
                                        ...styles.submenu,
                                        marginTop: index === 0 ? 7 : 5,
                                        marginBottom: index === menuItem.length - 1 ? 7 : 0,
                                    }}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <ThemedText>{menuItem[key].name}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                                <PersonIcon
                                    width={styles.image.width}
                                    height={styles.image.height}
                                    fill={colors.text}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </Pressable>
        </View>
    );
}

/*

*/
