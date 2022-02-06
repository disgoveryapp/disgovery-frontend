import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const WorkIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={23} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.571 4.21H16V2.106C16 .937 14.983 0 13.714 0H9.143C7.874 0 6.857.937 6.857 2.105v2.106H2.286C1.017 4.21.01 5.147.01 6.316L0 17.895C0 19.063 1.017 20 2.286 20H20.57c1.269 0 2.286-.937 2.286-2.105V6.315c0-1.168-1.017-2.104-2.286-2.104Zm-6.857.361H9.143V2.286h4.571V4.57ZM3.571 7.857h15.715V6.43H3.57v1.428Z"
                fill={props.fill || colors.text}
            />
        </Svg>
    );
};

export default WorkIcon;
