import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const RailIcon10 = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 .833c-1.842 0-3.333.209-3.333 1.667v4.375a1.46 1.46 0 0 0 1.458 1.458l-.625.625v.209h5v-.209l-.625-.625a1.46 1.46 0 0 0 1.458-1.458V2.5C8.333 1.042 6.842.833 5 .833Zm0 .834c2.5 0 2.5.5 2.5.833h-5c0-.333 0-.833 2.5-.833Zm2.5 2.916v-1.25h-5v1.25h5ZM3.125 7.5a.624.624 0 0 1-.625-.625V5.417h5v1.458c0 .346-.28.625-.625.625h-3.75Zm1.042-1.042c0-.458.375-.833.833-.833.458 0 .833.375.833.833A.836.836 0 0 1 5 7.292a.836.836 0 0 1-.833-.834Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default RailIcon10;
