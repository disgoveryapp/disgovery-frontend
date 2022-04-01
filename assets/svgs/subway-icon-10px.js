import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const SubwayIcon10 = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 1.042c-1.667 0-3.333.208-3.333 1.666v3.959a1.46 1.46 0 0 0 1.458 1.458L2.5 8.75v.208h5V8.75l-.625-.625a1.46 1.46 0 0 0 1.458-1.458V2.708C8.333 1.25 6.842 1.042 5 1.042Zm2.358 1.25H2.68c.254-.217.858-.417 2.321-.417 1.546 0 2.133.192 2.358.417ZM4.583 4.375v-1.25H2.5v1.25h2.083Zm.834-1.25H7.5v1.25H5.417v-1.25ZM2.5 6.667c0 .345.28.625.625.625h3.75c.346 0 .625-.28.625-.625V5.208h-5v1.459Zm1.042-1.042a.625.625 0 1 0 0 1.25.625.625 0 0 0 0-1.25Zm2.291.625a.625.625 0 1 1 1.25 0 .625.625 0 0 1-1.25 0Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default SubwayIcon10;
