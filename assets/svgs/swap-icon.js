import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const SwapIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 17.01 15 21l-4-3.99h3V10h2v7.01h3ZM9 3l4 3.99h-3V14H8V6.99H5L9 3Z"
                fill={props.fill || colors.subtitle}
            />
        </Svg>
    );
};

export default SwapIcon;
