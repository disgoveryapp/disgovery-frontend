import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const InfoIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 5v2h2V7h-2Zm0 4v6h2v-6h-2Zm-7 1c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8-8 3.59-8 8Z"
                fill={props.fill || colors.subtitle}
            />
        </Svg>
    );
};

export default InfoIcon;
