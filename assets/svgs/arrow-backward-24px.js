import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowBackwardIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="m17.835 3.87-1.78-1.77-9.89 9.9 9.9 9.9 1.77-1.77L9.705 12l8.13-8.13Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default ArrowBackwardIcon;
