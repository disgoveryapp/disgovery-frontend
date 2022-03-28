import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const TramIcon10 = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m5.417 2.083.312-.625h1.354V.833H2.917v.625h1.979l-.313.625c-1.304.038-2.5.305-2.5 1.459v3.541c0 .625.463 1.138 1.063 1.23l-.646.645v.209h.833l.834-.834h1.666l.834.834H7.5v-.209l-.646-.645a1.247 1.247 0 0 0 1.063-1.23V3.542c0-1.154-1.196-1.421-2.5-1.459Zm-.821.834h.808c1.146.033 1.509.241 1.625.416H2.971c.117-.175.479-.383 1.625-.416ZM3.225 7.479h1.296a.61.61 0 0 1 .017-.812H2.917v.416c0 .188.125.35.308.396Zm3.858-.396c0 .188-.125.35-.308.396H5.479a.61.61 0 0 0-.016-.812h1.62v.416Zm-4.166-1.25h4.166V4.167H2.917v1.666Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default TramIcon10;
