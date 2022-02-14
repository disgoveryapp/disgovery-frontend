import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const HomeIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={27} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 14.64 13.5.875 27 14.64h-4.05v12.235h-8.1v-9.177h-2.7v9.177h-8.1V14.64H0Zm20.25-2.769L13.5 4.99l-6.75 6.882v11.945h2.7V14.64h8.1v9.176h2.7V11.872Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default HomeIcon;
