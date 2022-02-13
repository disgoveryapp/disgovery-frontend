import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const SubwayIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2.083c-3.333 0-6.667.417-6.667 3.334v7.916A2.92 2.92 0 0 0 6.25 16.25L5 17.5v.417h10V17.5l-1.25-1.25a2.92 2.92 0 0 0 2.917-2.917V5.417c0-2.917-2.984-3.334-6.667-3.334Zm4.717 2.5H5.358C5.867 4.15 7.075 3.75 10 3.75c3.092 0 4.267.383 4.717.833ZM9.167 8.75v-2.5H5v2.5h4.167Zm1.666-2.5H15v2.5h-4.167v-2.5ZM5 13.333c0 .692.558 1.25 1.25 1.25h7.5c.692 0 1.25-.558 1.25-1.25v-2.916H5v2.916Zm2.083-2.083a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.584 1.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default SubwayIcon;
