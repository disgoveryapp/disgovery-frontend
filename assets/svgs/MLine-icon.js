import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';

const MLineIcon = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={26}
    viewBox="0 0 30 26"
  >
    <Path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        // fill: "#1e4f6f",
        fillOpacity: 1,
      }}
      d="M14.5 0C6.492 0 0 6.59 0 14.727c0 4.496 1.984 8.523 5.113 11.226h18.774a14.793 14.793 0 0 0 5.117-11.226C29.004 6.594 22.512 0 14.504 0Zm0 0"
    />
    <Path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#fff",
        fillOpacity: 1,
      }}
      d="M4.883 22.934V6.004h5.969l3.644 7.312 3.688-7.312h5.918v16.93H18.75v-9.059l-2.543 5.32h-3.633l-2.562-5.32v9.059Zm0 0"
    />
  </Svg>
)

export default MLineIcon;