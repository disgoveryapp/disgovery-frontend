import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.19 4.508a1.12 1.12 0 0 0-1.065-.758H11.25v-1.5h-4.5v1.5H4.875c-.495 0-.908.315-1.065.758L2.25 9v6c0 .412.337.75.75.75h.75c.412 0 .75-.338.75-.75v-.75h9V15c0 .412.338.75.75.75H15c.412 0 .75-.338.75-.75V9l-1.56-4.492Zm-9.052.742h7.717l.78 2.25H4.358l.78-2.25Zm-1.388 7.5h10.5V9.255L14.168 9H3.84l-.09.255v3.495Zm1.875-3a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm5.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent
