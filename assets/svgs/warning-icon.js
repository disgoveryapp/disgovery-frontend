import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const WarningIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.918 19.707 11 2.293l10.082 17.414Zm16.984-1.832L11 5.949 4.098 17.875Zm-7.82-2.75v1.832h1.836v-1.832Zm0-5.5h1.836v3.668h-1.836Zm0 0"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default WarningIcon;
