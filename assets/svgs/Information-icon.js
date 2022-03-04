import * as React from "react"
import Svg, { Path } from "react-native-svg"

const InformationIcon = (props) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M11 7h2v2h-2V7ZM11 11h2v6h-2v-6Z" fill="#000" fillOpacity={0.54} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12Zm2 0c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8-8 3.59-8 8Z"
      fill="#000"
      fillOpacity={0.54}
    />
  </Svg>
)

export default InformationIcon;
