import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const WorkIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={27} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.3 6.349h-5.4V3.612c0-1.52-1.201-2.737-2.7-2.737h-5.4c-1.498 0-2.7 1.218-2.7 2.737v2.737H2.7C1.201 6.349.013 7.567.013 9.086L0 24.138c0 1.52 1.202 2.737 2.7 2.737h21.6c1.498 0 2.7-1.218 2.7-2.737V9.086c0-1.52-1.201-2.737-2.7-2.737Zm-8.1.469h-5.4V3.847h5.4v2.97ZM4.219 11.089H22.78V9.232H4.22v1.857Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default WorkIcon;
