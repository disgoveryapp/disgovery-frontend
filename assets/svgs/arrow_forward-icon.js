import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";


const ArrowIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width="25" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8.50001 3L7.50126 4.0575L11.4538 8.25H2.83334V9.75H11.4538L7.50126 13.9425L8.50001 15L14.1667 9L8.50001 3Z" 
            fill="#ACACAC"/>
        </Svg>

    );
};

export default ArrowIcon;