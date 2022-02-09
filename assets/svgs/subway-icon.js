import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const SubwayIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1.865c-2.583 0-5.167.323-5.167 2.583v6.135a2.263 2.263 0 0 0 2.26 2.26l-.968.97v.322h7.75v-.322l-.969-.97a2.263 2.263 0 0 0 2.26-2.26V4.448c0-2.26-2.311-2.583-5.166-2.583Zm3.655 1.937H4.403c.394-.336 1.33-.646 3.597-.646 2.396 0 3.307.297 3.655.646Zm-4.3 3.23V5.093h-3.23V7.03h3.23Zm1.29-1.938h3.23V7.03h-3.23V5.094Zm-4.52 5.49c0 .535.433.968.969.968h5.812a.967.967 0 0 0 .969-.969v-2.26h-7.75v2.26ZM5.74 8.968a.969.969 0 1 0 0 1.937.969.969 0 0 0 0-1.937Zm3.552.969a.969.969 0 1 1 1.937 0 .969.969 0 0 1-1.937 0Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default SubwayIcon;
