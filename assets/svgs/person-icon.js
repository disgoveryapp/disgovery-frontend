import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const PersonIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            height="100%"
            width="100%"
            preserveAspectRatio="xMinYMin slice"
            {...props}
        >
            <Path d="M0 0h24v24H0V0z" fill="none" />
            <Path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </Svg>
    );
};

export default PersonIcon;
