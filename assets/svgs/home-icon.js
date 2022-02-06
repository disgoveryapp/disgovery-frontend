import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const HomeIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={23} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 11.2 11.458 0l11.459 11.2h-3.438v9.954h-6.875v-7.466h-2.291v7.466H3.436v-9.955H0Zm17.188-2.253-5.73-5.6-5.729 5.6v9.718h2.292V11.2h6.875v7.466h2.291V8.947Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default HomeIcon;
