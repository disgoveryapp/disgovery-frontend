import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const CloudOffIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={150} height={114} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.563 0 18.75 8.813l17.313 17.312h-2.626C14.625 28.125 0 44.063 0 63.375c0 20.688 16.813 37.5 37.5 37.5h73.312l12.5 12.5 8.813-8.813L27.562 0ZM150 69.625c0-16.5-12.812-29.875-29.063-31C116.687 17.063 97.75.875 75 .875c-8.313 0-16.063 2.25-22.813 6.063L61.5 16.25c4.188-1.812 8.688-2.875 13.5-2.875 19 0 34.375 15.375 34.375 34.375v3.125h9.375c10.375 0 18.75 8.375 18.75 18.75 0 6.188-3 11.563-7.563 15l8.813 8.813C145.562 87.688 150 79.25 150 69.625Zm-137.5-6.25c0 13.813 11.188 25 25 25h60.813l-50-50H37.5c-13.813 0-25 11.188-25 25Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default CloudOffIcon;
