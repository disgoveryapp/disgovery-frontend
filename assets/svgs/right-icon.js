import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const RightIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={25} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="M10.11 6 8.64 7.41 13.412 12l-4.77 4.59L10.109 18l6.25-6-6.25-6Z"
                fill={props.fill || colors.subtitle}
            />
        </Svg>
    );
};

export default RightIcon;
