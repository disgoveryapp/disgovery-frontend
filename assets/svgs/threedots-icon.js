import * as React from "react"
import Svg, { Rect } from "react-native-svg"

const ThreedotsIcon = (props) => (
  <Svg
    {...props}
    width={4}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width={4} height={4} rx={2} fill="#fff" />
    <Rect y={7} width={4} height={4} rx={2} fill="#fff" />
    <Rect y={14} width={4} height={4} rx={2} fill="#fff" />
  </Svg>
)

export default ThreedotsIcon
