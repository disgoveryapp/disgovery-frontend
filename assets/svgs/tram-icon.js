import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const TramIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m10.833 4.167.625-1.25h2.709v-1.25H5.833v1.25h3.959l-.625 1.25c-2.609.075-5 .608-5 2.916v7.084c0 1.25.925 2.275 2.125 2.458L5 17.917v.416h1.667l1.666-1.666h3.334l1.666 1.666H15v-.416l-1.292-1.292a2.493 2.493 0 0 0 2.125-2.458V7.083c0-2.308-2.391-2.841-5-2.916ZM9.192 5.833h1.616c2.292.067 3.017.484 3.25.834H5.942c.233-.35.958-.767 3.25-.834ZM6.45 14.958h2.592a1.219 1.219 0 0 1-.292-.791c0-.325.125-.609.325-.834H5.833v.834c0 .375.25.7.617.791Zm7.717-.791c0 .375-.25.7-.617.791h-2.592c.184-.216.292-.491.292-.791a1.24 1.24 0 0 0-.325-.834h3.242v.834Zm-8.334-2.5h8.334V8.333H5.833v3.334Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default TramIcon;
