import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const BusIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.583 4.198c0-2.26 2.312-2.583 5.167-2.583s5.167.323 5.167 2.583v6.458c0 .569-.252 1.079-.646 1.434v1.15c0 .355-.29.646-.646.646h-.646a.648.648 0 0 1-.646-.646v-.646H5.167v.646c0 .355-.29.646-.646.646h-.646a.648.648 0 0 1-.646-.646v-1.15a1.928 1.928 0 0 1-.646-1.434V4.198ZM7.75 2.906c-2.383 0-3.3.297-3.655.64h7.31c-.355-.343-1.272-.64-3.655-.64Zm3.875 1.931v1.944h-7.75V4.837h7.75Zm-.407 6.465.187-.174a.625.625 0 0 0 .22-.472V8.073h-7.75v2.583c0 .24.136.4.22.472l.187.174h6.936ZM5.49 8.72a.969.969 0 1 0 0 1.937.969.969 0 0 0 0-1.937Zm3.552.969a.969.969 0 1 1 1.937 0 .969.969 0 0 1-1.937 0Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default BusIcon;
