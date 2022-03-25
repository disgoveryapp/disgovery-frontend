import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CircleIcon = (props) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 11c-2.767 0-5-2.233-5-5s2.233-5 5-5 5 2.233 5 5-2.233 5-5 5Z"
      fill="#fff"
      stroke="#7B7B7B"
      strokeWidth={1.5}
    />
  </Svg>
)

export default CircleIcon
