import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const CloudOffIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41 0 3 1.865 5.77 5.53h-.42C2.34 5.954 0 9.327 0 13.416c0 4.379 2.69 7.938 6 7.938h11.73l2 2.646 1.41-1.866L4.41 0ZM24 14.739c0-3.493-2.05-6.324-4.65-6.563-.68-4.564-3.71-7.99-7.35-7.99-1.33 0-2.57.476-3.65 1.283l1.49 1.97c.67-.383 1.39-.608 2.16-.608 3.04 0 5.5 3.255 5.5 7.277v.662H19c1.66 0 3 1.773 3 3.969 0 1.31-.48 2.447-1.21 3.175l1.41 1.865c1.09-1.217 1.8-3.003 1.8-5.04ZM2 13.416c0 2.924 1.79 5.292 4 5.292h9.73l-8-10.585H6c-2.21 0-4 2.369-4 5.293Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default CloudOffIcon;
