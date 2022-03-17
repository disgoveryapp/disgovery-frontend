import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const MyLocationIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={27} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.558 12.375a10.119 10.119 0 0 0-8.933-8.933V1.125h-2.25v2.317a10.119 10.119 0 0 0-8.933 8.933H1.125v2.25h2.317a10.119 10.119 0 0 0 8.933 8.933v2.317h2.25v-2.317a10.119 10.119 0 0 0 8.933-8.933h2.317v-2.25h-2.317ZM13.5 9A4.499 4.499 0 0 0 9 13.5c0 2.486 2.014 4.5 4.5 4.5s4.5-2.014 4.5-4.5S15.986 9 13.5 9Zm-7.875 4.5a7.87 7.87 0 0 0 7.875 7.875 7.87 7.87 0 0 0 7.875-7.875A7.87 7.87 0 0 0 13.5 5.625 7.87 7.87 0 0 0 5.625 13.5Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default MyLocationIcon;
