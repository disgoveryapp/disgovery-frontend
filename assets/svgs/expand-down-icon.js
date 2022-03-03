import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ExpandDownIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="m12 15.705 6-6-1.41-1.41-4.59 4.58-4.59-4.58L6 9.705l6 6Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default ExpandDownIcon;
