import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const NavigationIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
            <Path
                d="m5 21-1-1 8-18 8 18-1 1-7-3Zm2.1-3.1 4.9-2.1 4.9 2.1-4.9-11Zm4.9-2.1Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default NavigationIcon;
