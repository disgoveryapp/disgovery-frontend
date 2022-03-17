import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const CloudOffIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={31} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.696 0 3.875 1.865 7.453 5.53H6.91C3.022 5.954 0 9.327 0 13.416c0 4.379 3.475 7.938 7.75 7.938h15.151L25.485 24l1.82-1.866L5.697 0ZM31 14.739c0-3.493-2.648-6.324-6.006-6.563-.879-4.564-4.792-7.99-9.494-7.99-1.718 0-3.32.476-4.715 1.283L12.71 3.44a6.83 6.83 0 0 1 2.79-.609c3.927 0 7.104 3.255 7.104 7.277v.662h1.938c2.144 0 3.875 1.773 3.875 3.969a3.99 3.99 0 0 1-1.563 3.175l1.821 1.865C30.083 18.563 31 16.776 31 14.74ZM2.583 13.416c0 2.924 2.312 5.292 5.167 5.292h12.568L9.985 8.124H7.75c-2.855 0-5.167 2.368-5.167 5.292Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default CloudOffIcon;
