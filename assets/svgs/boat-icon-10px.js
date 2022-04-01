import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const BoatIcon10 = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.75.417h2.5v1.25H7.5c.459 0 .834.375.834.833v1.925l.533.175a.415.415 0 0 1 .275.533l-.787 2.784h-.021c-.667 0-1.259-.367-1.667-.834-.408.467-1 .834-1.667.834-.666 0-1.258-.367-1.666-.834-.409.467-1 .834-1.667.834h-.02L.854 5.133A.42.42 0 0 1 1.13 4.6l.537-.175V2.5c0-.458.375-.833.833-.833h1.25V.417Zm1.667.833v.417h-.833V1.25h.833ZM5 4.212l2.242.738.996.325-.467 1.654a1.836 1.836 0 0 1-.475-.392l-.629-.72-.629.716c-.142.167-.533.55-1.038.55-.504 0-.895-.383-1.037-.55l-.63-.716-.628.716c-.084.096-.25.263-.475.388l-.471-1.65 1-.33L5 4.213Zm-2.5-.058V2.5h5v1.654L5 3.334l-2.5.82ZM5 8.734c.58 0 1.159-.18 1.667-.534.508.354 1.088.55 1.667.55h.833v.833h-.833a3.626 3.626 0 0 1-1.667-.412 3.629 3.629 0 0 1-3.333 0 3.678 3.678 0 0 1-1.667.412H.834V8.75h.833c.58 0 1.158-.196 1.667-.55A2.91 2.91 0 0 0 5 8.733Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default BoatIcon10;