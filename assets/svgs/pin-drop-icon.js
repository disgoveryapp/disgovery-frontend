import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const PinDropIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2c3.31 0 6 2.69 6 6 0 4.5-6 11-6 11S6 12.5 6 8c0-3.31 2.69-6 6-6Zm7 20v-2H5v2h14ZM8 8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.13-2.08 5.46-4 7.91-1.92-2.44-4-5.78-4-7.91Zm2 0c0-1.1.9-2 2-2s2 .9 2 2a2 2 0 1 1-4 0Z"
                fill={props.fill || colors.subtitle}
            />
        </Svg>
    );
};

export default PinDropIcon;
