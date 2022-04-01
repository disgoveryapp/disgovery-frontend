import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const PlaceIcon19 = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={19} height={19} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 1.583a5.538 5.538 0 0 0-5.542 5.542c0 4.156 5.542 10.292 5.542 10.292s5.542-6.136 5.542-10.292A5.538 5.538 0 0 0 9.5 1.583ZM5.542 7.125A3.96 3.96 0 0 1 9.5 3.167a3.96 3.96 0 0 1 3.958 3.958c0 2.28-2.28 5.692-3.958 7.822-1.647-2.114-3.958-5.566-3.958-7.822Zm1.979 0a1.98 1.98 0 1 1 3.958 0 1.98 1.98 0 0 1-3.958 0Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default PlaceIcon19;
