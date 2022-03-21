import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const YourLocationIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={27} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 11.295 27 0 15.69 27h-1.47l-3.96-10.26L0 12.765v-1.47Zm15.045 9.495 6.36-15.195L6.21 11.94l5.145 1.995 1.23.48.48 1.245 1.98 5.13Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default YourLocationIcon;
