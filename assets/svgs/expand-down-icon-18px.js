import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ExpandDownIcon18px = (props) => {
    const { colors } = useTheme();

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            width={18}
            {...props}
        >
            <Path d="M24 24H0V0h24v24z" opacity={0.87} fill="none" />
            <Path
                d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default ExpandDownIcon18px;
