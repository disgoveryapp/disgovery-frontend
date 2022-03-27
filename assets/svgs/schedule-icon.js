import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const ScheduleIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={17} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.493 1.417A7.08 7.08 0 0 0 1.417 8.5a7.08 7.08 0 0 0 7.076 7.083 7.087 7.087 0 0 0 7.09-7.083 7.087 7.087 0 0 0-7.09-7.083Zm.007 12.75A5.665 5.665 0 0 1 2.833 8.5 5.665 5.665 0 0 1 8.5 2.833 5.665 5.665 0 0 1 14.167 8.5 5.665 5.665 0 0 1 8.5 14.167Zm-.708-9.209h1.062v3.719l3.188 1.891-.531.872-3.72-2.232v-4.25Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default ScheduleIcon;
