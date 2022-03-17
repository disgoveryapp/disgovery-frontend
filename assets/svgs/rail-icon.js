import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const RailIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1.667c-3.683 0-6.667.416-6.667 3.333v8.75a2.92 2.92 0 0 0 2.917 2.917L5 17.917v.416h10v-.416l-1.25-1.25a2.92 2.92 0 0 0 2.917-2.917V5c0-2.917-2.984-3.333-6.667-3.333Zm0 1.666c5 0 5 1 5 1.667H5c0-.667 0-1.667 5-1.667Zm5 5.834v-2.5H5v2.5h10ZM6.25 15C5.558 15 5 14.442 5 13.75v-2.917h10v2.917c0 .692-.558 1.25-1.25 1.25h-7.5Zm2.083-2.083c0-.917.75-1.667 1.667-1.667s1.667.75 1.667 1.667c0 .916-.75 1.666-1.667 1.666s-1.667-.75-1.667-1.666Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default RailIcon;
