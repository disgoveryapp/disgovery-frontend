import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const PlaceIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={27} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 2.25a7.87 7.87 0 0 0-7.875 7.875c0 5.906 7.875 14.625 7.875 14.625s7.875-8.719 7.875-14.625A7.87 7.87 0 0 0 13.5 2.25Zm-5.625 7.875A5.627 5.627 0 0 1 13.5 4.5a5.627 5.627 0 0 1 5.625 5.625c0 3.24-3.24 8.089-5.625 11.115-2.34-3.004-5.625-7.909-5.625-11.115Zm2.813 0a2.813 2.813 0 1 1 5.625 0 2.813 2.813 0 0 1-5.625 0Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default PlaceIcon;
