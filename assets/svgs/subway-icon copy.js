import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const RouteNotFoundIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
            <Path
                d="M20.475 23.3 16 18.8l-2.6 2.6q-.6.6-1.4.6-.8 0-1.4-.6l-8-8Q2 12.8 2 12q0-.8.6-1.4L5.2 8 .675 3.5 2.1 2.075l19.8 19.8ZM14.6 17.4l-1.5-1.5L12 17l-1.4-1.4 1.075-1.1-1.5-1.5H7v-2h1.175L6.6 9.4 4 12l8 8Zm4.25-1.45-1.4-1.4L20 12l-8-8-2.55 2.55-1.4-1.4L10.6 2.6Q11.2 2 12 2q.8 0 1.4.6l8 8q.6.6.6 1.4 0 .8-.6 1.4Zm-2.9-2.9L17 12l-5-5-1.05 1.05Zm-2.5-2.5ZM10.6 13.4Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default RouteNotFoundIcon;
