import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const CloseIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={21} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="m16.625 5.609-1.234-1.234L10.5 9.266 5.609 4.375 4.375 5.609 9.266 10.5l-4.891 4.891 1.234 1.234 4.891-4.891 4.891 4.891 1.234-1.234-4.891-4.891 4.891-4.891Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default CloseIcon;
