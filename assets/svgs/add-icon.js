import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const AddIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                d="M14.25 9.75h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5h1.5v4.5h4.5v1.5Z"
                fill={props.fill || colors.subtitle}
            />
        </Svg>
    );
};

export default AddIcon;
