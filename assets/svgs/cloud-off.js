import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const CloudOffIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={85} height={65} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m15.619 0-4.994 5.052 9.81 9.926h-1.487C8.288 16.125 0 25.262 0 36.334c0 11.86 9.527 21.5 21.25 21.5h41.544L69.877 65l4.994-5.052L15.619 0ZM85 39.917c0-9.46-7.26-17.128-16.469-17.773C66.123 9.782 55.391.502 42.5.502c-4.71 0-9.102 1.29-12.927 3.475l5.277 5.34c2.373-1.04 4.923-1.649 7.65-1.649 10.767 0 19.48 8.815 19.48 19.708v1.792h5.312c5.879 0 10.625 4.801 10.625 10.75 0 3.547-1.7 6.628-4.286 8.6l4.994 5.051C82.485 50.273 85 45.435 85 39.917ZM7.083 36.334c0 7.919 6.34 14.333 14.167 14.333h34.46L27.377 22.001H21.25c-7.827 0-14.167 6.414-14.167 14.333Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default CloudOffIcon;
