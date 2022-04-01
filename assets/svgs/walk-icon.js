import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "@react-navigation/native";

const WalkIcon = (props) => (
  const { colors } = useTheme();
  return(<Svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.875 2.573c0 .87-.712 1.583-1.583 1.583s-1.584-.712-1.584-1.583c0-.87.713-1.583 1.584-1.583.87 0 1.583.712 1.583 1.583Zm-6.73 15.438L7.364 6.848l-1.425.554v2.692H4.354V6.373l3.998-1.694a1.698 1.698 0 0 1 2.098.665l.792 1.266c.633 1.109 1.9 1.9 3.404 1.9v1.584a5.797 5.797 0 0 1-4.354-1.98l-.475 2.376 1.662 1.583v5.938H9.896v-4.75l-1.663-1.584-1.425 6.334H5.146Z"
      fill={props.fill || colors.background}
    />
  </Svg>);
  
)

export default WalkIcon
