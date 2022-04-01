import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const BusIcon10 = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.667 2.708C1.667 1.25 3.158 1.042 5 1.042s3.333.208 3.333 1.666v4.167c0 .367-.162.696-.416.925v.742c0 .229-.188.416-.417.416h-.417a.418.418 0 0 1-.416-.416v-.417H3.333v.417c0 .229-.187.416-.416.416H2.5a.418.418 0 0 1-.417-.416V7.8a1.244 1.244 0 0 1-.416-.925V2.708ZM5 1.875c-1.538 0-2.13.192-2.358.412h4.716c-.229-.22-.82-.412-2.358-.412Zm2.5 1.246v1.254h-5V3.121h5Zm-.263 4.17.121-.112a.403.403 0 0 0 .142-.304V5.208h-5v1.667c0 .154.087.258.142.304l.12.113h4.475ZM3.542 5.626a.625.625 0 1 0 0 1.25.625.625 0 0 0 0-1.25Zm2.291.625a.625.625 0 1 1 1.25 0 .625.625 0 0 1-1.25 0Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default BusIcon10;
