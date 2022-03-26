import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const NavigationIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.75 17.325 10 2.083l6.25 15.242-.592.592-5.658-2.5-5.658 2.5-.592-.592Zm9.817-2.158L10 6.475l-3.567 8.692 2.892-1.275.675-.3.675.3 2.892 1.275Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default NavigationIcon;
