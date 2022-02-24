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
  
  const RedLineIcon = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
      <Path
        style={{
          stroke: "none",
          fillRule: "nonzero",
        //   fill: "#fd5353",
          fillOpacity: 1,
        }}
        d="M27 30H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3Zm0 0"
      />
      <Path
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#fff",
          fillOpacity: 1,
        }}
        d="M13.195 3.934a.773.773 0 1 1 1.548-.001.773.773 0 0 1-1.548 0Zm2.836.773a.773.773 0 1 0 .002-1.545.773.773 0 0 0-.002 1.545ZM23 27.418h-2.324l-2.32-3.871h-6.711l-2.32 3.871H7l3.39-5.57a3.359 3.359 0 0 1-2.359-3.207V8.32a3.358 3.358 0 0 1 3.356-3.356h7.226A3.358 3.358 0 0 1 21.97 8.32v10.32a3.359 3.359 0 0 1-2.36 3.208Zm-3.098-8.258a1.289 1.289 0 1 0-2.578 0 1.288 1.288 0 1 0 2.578 0ZM12.934 7.031c0 .285.234.516.52.516h3.093c.285 0 .52-.23.52-.516V5.996a.518.518 0 0 0-.52-.516h-3.094c-.285 0-.52.23-.52.516ZM9.84 11.676c0 .855.691 1.547 1.547 1.547h7.226c.856 0 1.547-.692 1.547-1.547V9.609c0-.855-.691-1.546-1.547-1.546h-7.226c-.856 0-1.547.69-1.547 1.546Zm.258 7.484a1.288 1.288 0 1 0 2.578 0 1.289 1.289 0 1 0-2.578 0Zm0 0"
      />
    </Svg>
  )
  

export default RedLineIcon;