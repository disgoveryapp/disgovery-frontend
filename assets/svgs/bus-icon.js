import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const BusIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.333 5.417C3.333 2.5 6.317 2.083 10 2.083s6.667.417 6.667 3.334v8.333c0 .733-.325 1.392-.834 1.85v1.483a.836.836 0 0 1-.833.834h-.833a.836.836 0 0 1-.834-.834v-.833H6.667v.833a.836.836 0 0 1-.834.834H5a.836.836 0 0 1-.833-.834V15.6a2.488 2.488 0 0 1-.834-1.85V5.417ZM10 3.75c-3.075 0-4.258.383-4.717.825h9.434c-.459-.442-1.642-.825-4.717-.825Zm5 2.492V8.75H5V6.242h10Zm-.525 8.341.242-.225A.807.807 0 0 0 15 13.75v-3.333H5v3.333c0 .308.175.517.283.608l.242.225h8.95ZM7.083 11.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.584 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default BusIcon;
