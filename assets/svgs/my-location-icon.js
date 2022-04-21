import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const MyLocationIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 8.367 20 0l-8.378 20h-1.089L7.6 12.4 0 9.456v-1.09ZM11.144 15.4l4.711-11.256L4.6 8.844l3.811 1.478.911.356.356.922 1.466 3.8Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default MyLocationIcon;
