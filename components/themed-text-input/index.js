import React from "react";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native";

export default function ThemedTextInput(props) {
    const { colors } = useTheme();

    let fontWeight,
        fontStyle,
        fontFamily = "";

    if (props.style) {
        fontWeight = props.style.fontWeight || "";
        fontStyle = props.style.fontStyle || "";
    }

    if (fontWeight === "500" || fontWeight === "medium") {
        if (fontStyle === "italic") fontFamily = "Barlow_500Medium_Italic";
        else fontFamily = "Barlow_500Medium";
    } else if (fontWeight === "600" || fontWeight === "semibold") {
        if (fontStyle === "italic") fontFamily = "Barlow_600SemiBold_Italic";
        else fontFamily = "Barlow_600SemiBold";
    } else if (fontWeight === "700" || fontWeight === "bold") {
        if (fontStyle === "italic") fontFamily = "Barlow_700Bold_Italic";
        else fontFamily = "Barlow_700Bold";
    } else if (fontWeight === "800" || fontWeight === "extrabold") {
        if (fontStyle === "italic") fontFamily = "Barlow_800ExtraBold_Italic";
        else fontFamily = "Barlow_800ExtraBold";
    } else {
        fontFamily = "Barlow_500Medium";
    }

    return (
        <TextInput
            ref={props.inputRef || null}
            style={{
                color: props.color || colors.text,
                fontFamily: fontFamily === "" ? undefined : fontFamily,
                ...props.style,
            }}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            value={props.value}
            onChange={props.onChange}
            onPressIn={props.onPressIn}
            autoFocus={props.autoFocus || false}
        >
            {props.children}
        </TextInput>
    );
}
