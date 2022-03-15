import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="M9 3 7.942 4.058l4.185 4.192H3v1.5h9.127l-4.185 4.193L9 15l6-6-6-6Z"
                fill={props.fill || colors.subtitle}
            />
        </Svg>
    );
};

export default ArrowIcon;
