import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "@react-navigation/native";

const StarBorderIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m14.81 9.12 7.19.62-5.45 4.73 1.63 7.03L12 17.77 5.82 21.5l1.64-7.03L2 9.74l7.19-.61L12 2.5l2.81 6.62Zm-6.57 9.05L12 15.9l3.77 2.28-1-4.28 3.32-2.88-4.38-.38L12 6.6l-1.7 4.03-4.38.38 3.32 2.88-1 4.28Z"
                fill={colors.text}
            />
        </Svg>
    );
};

export default StarBorderIcon;