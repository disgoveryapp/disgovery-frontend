import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "@react-navigation/native";

const SearchIcon = (props) => {
    const { colors } = useTheme();
  
    return (
        <Svg width={17} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6 10.097h.56l3.534 3.542-1.055 1.055-3.542-3.534v-.56l-.191-.198a4.584 4.584 0 0 1-2.996 1.112 4.604 4.604 0 1 1 4.604-4.604c0 1.14-.418 2.189-1.112 2.996l.198.191ZM3.722 6.91a3.183 3.183 0 0 0 3.188 3.187 3.183 3.183 0 0 0 3.187-3.187A3.183 3.183 0 0 0 6.91 3.722 3.183 3.183 0 0 0 3.722 6.91Z"
                fill={colors.text}
            />
        </Svg>
    );
};

export default SearchIcon;