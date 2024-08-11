import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowUpSvg = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19.4862 1.51479C19.4862 0.962504 19.0385 0.514789 18.4862 0.514789L9.48619 0.514789C8.9339 0.514789 8.48619 0.962505 8.48619 1.51479C8.48619 2.06707 8.9339 2.51479 9.48619 2.51479L17.4862 2.51479L17.4862 10.5148C17.4862 11.0671 17.9339 11.5148 18.4862 11.5148C19.0385 11.5148 19.4862 11.0671 19.4862 10.5148L19.4862 1.51479ZM2.22273 19.1925L19.1933 2.2219L17.7791 0.807682L0.808518 17.7782L2.22273 19.1925Z"
      fill="#2463EB"
    />
  </Svg>
);
export default ArrowUpSvg;
