import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CollapseIcon = (props) => {
    const { colors } = useTheme();

    return(
    
        <Svg
            {...props}
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
            d="m7.41 15.705 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6 1.41 1.41Z"
            fill={props.fill || colors.text}
            />
        </Svg>
            
      );

    };

export default CollapseIcon;
